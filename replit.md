# WTÖ – Wärme Technik Österreich

Mehrseitige Unternehmenswebsite und Anfrageplattform für Gebäude-, Anlagen- und Energietechnik.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/wto-website run dev` — run the website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm run build:render` — production build for a combined Render Web Service
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/wto-website/src/App.tsx` — shared shell, routes, content and inquiry forms
- `artifacts/wto-website/src/index.css` — WTÖ design tokens and global styling
- `artifacts/api-server/src/routes/contact.ts` — validated contact and project inquiry endpoints
- `lib/api-spec/openapi.yaml` — source of truth for API contracts
- `attached_assets/` — supplied WTÖ brand asset

## Architecture decisions

- The public website is a React/Vite artifact; the shared Express API remains the single backend entry point.
- Contact and project inquiries are contract-first and validated by generated Zod schemas.
- The backend can serve the built frontend from `artifacts/wto-website/dist/public` for a single-service Render deployment.
- Legal and company facts use explicit neutral placeholders until WTÖ provides approved data.

## Product

The site presents WTÖ as a lifecycle partner for planning, construction, commissioning, maintenance, repair and modernization across building, plant and energy technology. Visitors can browse service details, select their customer segment and submit either a general contact request or a detailed project inquiry.

## User preferences

- German language, correct UTF-8 umlauts, professional technical tone.
- Use the uploaded WTÖ logo as the primary visual brand.

## Gotchas

- Vite builds require `PORT` and `BASE_PATH`; the managed workflow injects them automatically.
- After changing `lib/api-spec/openapi.yaml`, run API code generation before touching generated hooks or schemas.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
