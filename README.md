![Logo](/public/logo.png)

# URL Shortener

A small, production-ready React application built with Vite that provides a URL shortening service and analytics dashboard. The app uses Supabase as the backend for authentication, URL records and click tracking, and includes responsive UI components built with Tailwind CSS and Radix primitives.

## Features

- Shorten long URLs with a custom or generated short code
- Redirect endpoint that counts clicks and collects device/location stats
- Dashboard with analytics (locations, devices, click history)
- Authentication (Sign up / Log in) via Supabase
- QR code generation for shortened links

## Live Deployment

[LINKZAP](https://linkzapurl.vercel.app/)

## Tech stack

- Frontend: React 19 + Vite
- Styling: Tailwind CSS (+ tailwind-merge, tailwindcss-animate)
- UI : Shadcn UI
- Charts: Recharts
- Authentication & DB: Supabase (via @supabase/supabase-js)
- Routing: react-router-dom

## Notes for contributors

- Follow existing code style (JSX + Tailwind + Radix patterns).
- Keep components small and focused. Reuse `src/ui/` primitives when possible.

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/adeeburrahman11/URL-Shortener.git
```

2. Go to the project directory

```bash
  cd URL-Shortener
```

3. Create a Supabase project and copy your project URL and anon key into environment variables (see "Environment variables" below).

4. Install dependencies

```bash
  npm install
```

5. Start the server

```bash
  npm run dev
```

## Environment variables

Create a `.env` file in the project root (or set OS-level environment variables) with the following values:

- VITE_SUPABASE_URL: your Supabase project URL
- VITE_SUPABASE_ANON_KEY: your Supabase anon/public key
- VERCEL_URL: your frontend link

### For example (.env):

`VITE_SUPABASE_URL=https://your-project.supabase.co`
`VITE_SUPABASE_ANON_KEY=eyJhbGciO...your_anon_key`
`VERCEL_URL=https://localhost:5173/`

## Project structure (important files)

- `src/` — application source
  - `App.jsx` — root app component
  - `main.jsx` — React entry
  - `Context.jsx` — app context/provider
  - `pages/` — route pages (Landing, Dashboard, Auth, Link, Redirect)
  - `components/` — reusable UI and feature components (CreateLink, LinkCard, DeviceStats, LocationStats, etc.)
  - `db/` — small API wrappers for Supabase (`supabase.js`, `apiUrls.js`, `apiClicks.js`, `apiAuth.js`)
  - `hooks/UseFetch.jsx` — custom fetch hook
  - `layouts/AppLayout.jsx` — app shell
  - `lib/utils.js` — utility helpers

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Testing & verification

- The repo currently doesn't include automated tests. To verify local changes:
  1. Start dev server: `npm run dev`
  2. Open the app in your browser (Vite will show the URL, typically `http://localhost:5173`).
  3. Sign up or sign in using Supabase credentials, create a short link, then visit the short URL to confirm redirect and click tracking.

## Deployment

- The project is currently configured for Vercel (`vercel.json`) but can be deployed anywhere that serves static files (Netlify, Vercel, Cloudflare Pages). For server-side redirect counting you may prefer to host the redirect route as a serverless function that increments click counters.

## Useful links

- Supabase docs: https://supabase.com/docs
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/

<!-- License

- Check repository root for a `LICENSE` file or add one. If none exists, add an appropriate OSS license (MIT is common for small projects). -->

## Contact

- Repo owner: Adeebur Rahman
  - GitHub: [adeebrahman11](https://github.com/adeeburrahman11/)
  - LinkedIn: [Adeebur Rahman](https://www.linkedin.com/in/adeebur-rahman)
  - X: [adeebur_rahman](https://x.com/adeebur_rahman)
  - Innstagram: [just.adeeb_11](https://www.instagram.com/just.adeeb_11/)
