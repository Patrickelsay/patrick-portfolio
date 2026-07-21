// Edge function: refresh the Discord member count into site_content.live_stats.
//
// The invite code comes from site_content key 'config' → data.discordInviteCode
// (a public invite code, editable without redeploying), with the
// DISCORD_INVITE_CODE env secret as an optional override.
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.
//
// Deployed via the Supabase MCP. Scheduled hourly with pg_cron (see README).
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async () => {
  const db = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  )

  let code = Deno.env.get('DISCORD_INVITE_CODE')
  if (!code) {
    const { data } = await db.from('site_content').select('data').eq('key', 'config').maybeSingle()
    code = (data?.data as { discordInviteCode?: string } | null)?.discordInviteCode
  }
  if (!code) return new Response('no discord invite code configured', { status: 500 })

  const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`)
  if (!res.ok) return new Response(`discord api ${res.status}`, { status: 502 })
  const invite = await res.json()
  const members = invite.approximate_member_count
  if (typeof members !== 'number') return new Response('no member count in response', { status: 502 })

  const { error } = await db.from('site_content').upsert({
    key: 'live_stats',
    data: { discordMembers: members, fetchedAt: new Date().toISOString() },
  })
  if (error) return new Response(error.message, { status: 500 })

  return Response.json({ discordMembers: members })
})
