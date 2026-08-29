# SVCE Placement Intelligence Hub

Sri Venkteshwara College of Engineering (SVCE) Companies Research & Placement
Analytics Portal — a mobile-first company research and skill-readiness portal for
campus placements.

## Phase 1 — UI only

- **No database.** No Cloud/Supabase project, no tables, no migrations, no edge
  functions, no database client. All content comes from a single hardcoded seed
  file: `src/data/seedCompanies.ts` (one company: Accenture) plus the 10-level
  skill ladders in `src/data/skillTopics.ts`.
- **Fully public.** There is no login, no auth context, no protected routes and
  no logout UI. Every route is reachable directly by any visitor.
- **No college logo asset.** The hero is text only — the SVCE wordmark and the
  `SVCE · INTELLIGENCE PLATFORM` pill. Recruiting-company logos use Logo.dev with
  the seed `logo_url` and an initial-letter circle as fallbacks.
- **Never displayed anywhere:** CTC, stipend, selection ratio.

## Routes

| Path                     | Page                                     |
| ------------------------ | ---------------------------------------- |
| `/`                      | Company grid (search + category filters) |
| `/company`               | redirects to `/company/intelligence`     |
| `/company/intelligence`  | 22-section company dossier               |
| `/company/skills`        | Bloom-mapped skill intelligence          |
| anything else            | Not Found                                |

Routing uses TanStack Router file routes (the router shipped with this stack);
`src/routes/company.tsx` is the app shell layout with sidebar + `<Outlet />`.

Company selection is persisted to `localStorage` under `selected-company`
(`{ companyId, companyName, logoUrl }`) and rehydrated against `SEED_COMPANIES`
on startup, so `/company/intelligence` and `/company/skills` survive a refresh.
If no selection exists, those pages send the visitor back to `/` — Not Found is
only used for genuinely invalid URLs.

## Data layer

`src/lib/companyData.ts` holds pure normalizers that accept the raw JSON shapes:

- `normalizeCompanySummary(short_json)`
- `normalizeCompanyProfile(full_json, short_json)`
- `normalizeDashboardSkills(skill_levels)`

plus helpers (`asString`, `asRecord`, `splitItems`, `titleCaseFromCode`,
`scoreToDifficulty`, `proficiencyToBloom`, `scoreToCriticality`).

## Phase 2 — Supabase

Paste `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into `.env`, then run
`npm install && npm run dev`. Company cards and detail data come from
`public.company_json`; skills and their 10-level topic ladders come from the
four skill tables described in the Phase 2 data contract. Reads are public and
read-only. The seed files remain in the repository as a documented fallback.

## Env vars

- `VITE_LOGO_DEV_PUBLISHABLE_KEY` (optional) — enables Logo.dev company logos.

## Scripts

```bash
bun run dev        # dev server
bun run build      # production build
bunx vitest run    # tests
```
