# Developer OS — Interactive Portfolio

A dashboard/OS-themed developer portfolio built with **Next.js 15 (App Router)**,
**TypeScript**, **Tailwind CSS**, Radix UI primitives (styled in the shadcn/ui
pattern), **Framer Motion**, **Recharts**, and **EmailJS**.

The landing page is a "dashboard" with eight animated app tiles. Each one opens
an original interface *inspired* by the design language of a familiar
platform — no logos, no copied layouts, no copied UI — routed entirely
client-side with the App Router and animated with Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. That's it — the site runs fully on the bundled
sample data in `data/*.json`, no environment variables required.

> If `npm install` reports a peer-dependency conflict (some ecosystem
> packages are still catching up to React 19), run
> `npm install --legacy-peer-deps`.

## Making it yours

1. **`data/profile.json`** — your name, title, tagline, location, email,
   resume link, GitHub, LinkedIn.
2. **`data/projects.json`** — every project shown on the Netflix-style
   showcase, the Projects grid, and search. Each entry drives its own detail
   page at `/netflix/[slug]` automatically.
3. **`data/certificates.json`**, **`data/skills.json`**,
   **`data/experience.json`**, **`data/education.json`**,
   **`data/achievements.json`**, **`data/timeline.json`**,
   **`data/repositories.json`** (GitHub fallback) — same idea.
4. Drop a real photo at `public/images/avatar.jpg` and point
   `profile.avatar` at `/images/avatar.jpg` (it currently points at a
   placeholder Unsplash photo so the app renders out of the box).
5. Add your résumé PDF at `public/resume.pdf` (the download button already
   points there).

## Optional integrations

Copy `.env.example` to `.env.local` and fill in what you want to enable:

- **`NEXT_PUBLIC_SITE_URL`** — used for metadata, the OG image route, and
  the sitemap. Set it to your deployed domain.
- **`GITHUB_USERNAME`** (+ optional `GITHUB_TOKEN`) — when set, the `/github`
  page fetches your real followers, repos, and stars from the GitHub REST
  API instead of `data/repositories.json`. The fetch is wrapped so a missing
  token, rate limit, or network failure always falls back to sample data
  rather than breaking the page.
- **`NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY`** —
  create a free [EmailJS](https://www.emailjs.com) account to make the
  contact form actually deliver mail. Without these, the form still fully
  validates (React Hook Form + Zod) and shows a success toast in a
  simulated "dev mode" so you can demo it before wiring a real inbox.

## What's real vs. intentionally out of scope

Everything above is fully implemented, working code — no `TODO`s, no dead
buttons. A few items from an ambitious wishlist were deliberately **not**
faked, because a non-functional stub is worse than an honest gap:

- **AI chatbot** — needs a real LLM API key and a backend route; wire it to
  `/api/chat` using the Anthropic or OpenAI SDK once you have a key.
- **Offline/PWA mode** — `public/manifest.json` makes the site installable,
  but a service worker for true offline caching isn't included; add
  `next-pwa` or a hand-rolled service worker if you need it.
- **Blog** — no CMS is wired up. The cleanest path is MDX files under
  `app/blog/[slug]` with `next-mdx-remote`, or a headless CMS.
- **Live visitor analytics** — the number on `/youtube` is illustrative.
  Wire up Vercel Analytics, Plausible, or Google Analytics for real numbers.

## Project structure

```
app/                  Routes (App Router). One folder per "app":
  facebook/            Profile / about / timeline
  youtube/              Analytics dashboard + Recharts
  netflix/[slug]/       Project showcase + detail pages
  google/                Local instant search
  github/                 Contribution heatmap, repos (live or sample)
  projects/               Filterable project grid
  certificates/           Grid + preview modal
  contact/                Form (React Hook Form + Zod + EmailJS)
  api/og/                 Dynamic OG image
components/           Reusable UI: window chrome, dock, cards, charts
data/                 Your content, as JSON — edit these, not the components
hooks/                Small client hooks (mouse position, media query)
lib/                  cn() helper, local search, GitHub fetch wrapper
types/                Shared TypeScript interfaces
```

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add any environment variables from `.env.example` you want enabled.
4. Deploy — no build configuration needed.

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Radix UI ·
Framer Motion · Recharts · React Hook Form · Zod · EmailJS · Lucide React ·
next-themes · cmdk (command palette)
