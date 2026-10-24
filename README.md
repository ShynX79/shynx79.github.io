# mtoti.dev — Portfolio

Personal portfolio of **Muhammad Toti Kurniawan**, a fullstack / backend software engineer.

Single-page React app with a terminal-inspired dark theme: hero, about, stack, project
coverflow carousel, experience log, and contact.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tooling)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **IBM Plex** fonts (`@fontsource`)
- Images shipped as **AVIF** with **JPEG** fallback (`<picture>`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check only (`tsc --noEmit`) |
| `npm run images` | Convert `public/**/*.{png,jpg,jpeg}` to AVIF |

## Structure

```
public/            static assets (images, og.png, resume.pdf, favicon)
scripts/           one-off tooling (AVIF conversion)
src/
  components/      section + UI components
  hooks/           scroll-spy, reveal, live clock, clipboard
  content.ts       single source of all page content
  index.css        design tokens + component styles
```

All copy lives in `src/content.ts` — edit there to update the site.

## Deploy

Pushes to `main` deploy `dist/` to GitHub Pages via
`.github/workflows/deploy.yml`.
