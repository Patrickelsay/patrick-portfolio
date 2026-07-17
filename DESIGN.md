# Design

Visual system for patrick-portfolio. Tokens live in `src/styles/tokens.css`; this file explains intent.

## Theme

**Light shell, dark media rooms.** The shell (home, work index, about, case-study reading surfaces) sits on pure white with near-black ink — big expressive type does the talking. Media-immersive surfaces (`/content`, `/ventures`, case-study heroes, lightboxes) scope into a pure-neutral near-black "screening room" via `[data-room="dark"]`. The two worlds share one brand hue and one type system.

## Color (OKLCH, strategy: Committed — one brand color across both worlds)

| Role | Light shell | Dark room |
|---|---|---|
| bg | `oklch(1 0 0)` | `oklch(0.12 0 0)` |
| surface | `oklch(0.96 0.003 205)` | `oklch(0.17 0.004 205)` |
| ink | `oklch(0.17 0 0)` | `oklch(0.96 0 0)` |
| muted | `oklch(0.44 0.008 205)` | `oklch(0.76 0.006 205)` |
| primary (sky) | `oklch(0.52 0.10 205)` | `oklch(0.78 0.11 200)` |
| accent (coral) | `oklch(0.62 0.16 35)` | `oklch(0.72 0.15 35)` |

Rules: body text ≥4.5:1, headline ink ≥7:1. White text on any saturated fill. Accent is a spice — availability dot, marks, hover flourishes — never a second theme. No warm-neutral (cream/beige) surfaces anywhere.

## Typography

Single family: **Archivo Variable** (wght 100–900 × wdth 62–125), self-hosted.

- **Display** — width 125, weight 800–900, tight leading (0.92–1.0), tracking −0.02em to −0.035em (never below −0.04em). Hero clamp caps at 6rem.
- **Body** — width 100, weight 400–500, line-height 1.6, measure 65–75ch.
- **Meta/captions** — width 78 (semi-condensed), weight 500–600, small sizes, normal-to-wide tracking. Used for years, roles, tags, stat labels. This is the one "label voice"; no uppercase-tracked eyebrows as section grammar.
- Fluid modular scale (≥1.25 ratio) via clamp(); `text-wrap: balance` on headings, `pretty` on prose.

## Space & Layout

- Fluid space scale (`--space-*` via clamp). Sections breathe unevenly on purpose: generous around statements, tight inside groupings.
- Container: max 1400px, fluid gutter. Prose measure capped separately.
- Grids vary by medium: tall 9:16 reel cells, wide 16:9 render cells, square logo cells — never one identical card repeated.
- Semantic z-scale: `--z-nav`, `--z-lightbox-backdrop`, `--z-lightbox`, `--z-toast`.

## Motion

Library: `motion` + Lenis smooth scroll. Easing: exponential outs (`cubic-bezier(0.16, 1, 0.3, 1)` and quart). Durations: micro 150–250ms, reveals 500–700ms, room transitions 600–900ms.

- One orchestrated hero entrance per visit (type choreography).
- Cards: poster→video on hover, slight scale on media only (not the card).
- Nav links: slide/roll hover detail.
- Reveals enhance already-visible content; never gate visibility on animation.
- Full `prefers-reduced-motion` alternates: crossfade or none; autoplay suppressed.

## Components

Shell: `SiteHeader`, `ClosingCTA` (footer), `RoomScope`, `Seo`. Media: `SmartImage` (srcset, lazy, aspect-ratio locked), `VideoPlayer` (poster-first), `LazyEmbed` (click-to-load socials). Case studies render through `BlockRenderer` (Text, Media, MediaGrid, Memo, SequenceStrip, MetaList, StatRow) + `ProcessStrip` for WIP material.
