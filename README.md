# OfficeGuard commercial demo

This is an advertising and demonstration website for the proposed OfficeGuard product. It is not an antivirus engine or a deployed endpoint-security application. Product interfaces, customer scenario, plans, business contact details, privacy notice, and terms are marked as demo content.

## Start locally

```powershell
npm install
npm run dev
```

Open `http://localhost:5555`. For a production build, run `npm run build` and `npm run start` (default port 3000, or the `PORT` environment variable).

The demo request form needs a running Node.js server. Deploy this project as a Render **Web Service**, not a Static Site. Use `npm ci && npm run build` for the build command and `npm run start` for the start command. The server listens on Render's `PORT` and all interfaces.

## Demo enquiries

Valid enquiries are saved to `data/demo-requests.jsonl` on the server. On Render's default ephemeral filesystem, these records can disappear when the service restarts or redeploys; use sample details only. There is no automatic email or external sales-system delivery. The `data/` directory is ignored by Git. Review and export requests locally:

```powershell
npm run demo:inbox
npm run demo:inbox -- --full
npm run demo:export -- --output demo-requests.csv
```

The CSV is written to `data/demo-requests.csv`. Treat enquiry files and exports as private contact data. See `DEMO_SETUP.md` for the full demo and launch checklist.

## Site structure

- `content/landing.html`: landing-page content and sections
- `app/light-theme.css`, `app/globals.css`, `app/info.css`: site styles
- `public/script.js`: interactive landing-page preview and form behavior
- `app/about`, `app/updates`, `app/privacy`, `app/terms`: clearly labeled demo pages
- `app/api/demo/route.ts`: local demo enquiry endpoint
- `app/sitemap.ts`, `app/robots.ts`, `public/og-preview.png`: discovery and share assets

Copy `.env.example` to `.env.local` when configuring a deployment. Search indexing is disabled by default while the site contains sample details. Replace the fictional content and verify product claims before public advertising.
