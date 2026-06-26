# Restaurant — Saint-Malo

A bilingual (French/English) website for a Franco-Russian restaurant located in Saint-Malo, Brittany, France.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS 3**
- **Lucide React** (icons)

## Features

- **Bilingual FR/EN** — toggle between French and English with one click
- **Menu** — Russian soups (Borchtch, Solianka), French mains (Filet Mignon, Tartare, Côte de Bœuf), Tartines
- **Private Recipes Page** — password-protected area to store personal recipes (stored in browser localStorage)
- **Responsive** — mobile-friendly design
- **Netlify-ready** — includes `netlify.toml` for deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, highlights, and location teaser |
| `/menu` | Full menu with soups, mains, and tartines |
| `/about` | Story, cuisine philosophy, and Saint-Malo location |
| `/contact` | Address, phone, and opening hours |
| `/recipes` | 🔒 Private password-protected recipe notebook |

## Recipes Page

The recipes page is accessible via the lock icon (🔒) in the footer. Default password: `chef2024` (change it in `src/app/recipes/page.tsx`).

## Deployment

Configured for Netlify. Push to GitHub and connect the repo in Netlify, or run:

```bash
npm run build
```

## License

Private project.
