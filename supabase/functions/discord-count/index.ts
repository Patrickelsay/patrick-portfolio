// Edge function: refresh the Discord member count into site_content.live_stats.
// Secrets (set via `supabase secrets set` or the dashboard):
//   DISCORD_INVITE_CODE — the code from a non-expiring invite link
//     (discord.gg/<code> → just the <code> part)
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically.
//
// Deploy:  supabase functions deploy discord-count --no-verify-jwt
// Schedule hourly (SQL editor):
//   select cron.schedule('discord-count-hourly', '5 * * * *',
//     $$select net.http_post(
//         url := 'https://<PROJECT-REF>.supabase.co/functions/v1/discord-count',
//         headers := '{"Content-Type": "application/json"}'::jsonb
//     )$$);
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async () => {
  const code = Deno.env.get('DISCORD_INVITE_CODE')
  if (!code) return new Response('DISCORD_INVITE_CODE secret not set', { status: 500 })

  const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`)
  if (!res.ok) return new Response(`discord api ${res.status}`, { status: 502 })
  const invite = await res.json()
  const members = invite.approximate_member_count
  if (typeof members !== 'number') return new Response('no member count in response', { status: 502 })

  const db = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  )
  const { error } = await db.from('site_content').upsert({
    key: 'live_stats',
    data: { discordMembers: members, fetchedAt: new Date().toISOString() },
  })
  if (error) return new Response(error.message, { status: 500 })

  return Response.json({ discordMembers: members })
})
