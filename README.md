# SD. — Personal Portfolio

A portfolio website built with React, TypeScript, and Vite. Features an interactive globe, bilingual content (EN/PT), dark/light theming, and a built-in blog.

**Live:** [folio-sil.vercel.app](https://folio-sil.vercel.app/)

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — bundler with code splitting
- **Tailwind CSS 4** — styling with semantic color tokens
- **Framer Motion** — animations
- **cobe** — interactive globe visualization
- **React Router 7** — routing
- **@vercel/analytics** — usage tracking

## Features

- Dark/light theme with system-aware defaults
- English/Portuguese language toggle
- Interactive globe with location markers and arc connections
- Photo gallery with hover animations
- Blog system with markdown editor (admin panel)
- Responsive layout with mobile-optimized navigation
- Custom cursor (desktop only)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (Vitest) |
| `npm run lint` | Lint with ESLint |

## Project Structure

```
src/
├── components/    # UI components (Nav, Hero, Projects, etc.)
├── context/       # Theme and language providers
├── pages/         # Route pages (Home, Blog, Admin)
├── translations/  # EN/PT translation strings
├── assets/        # Images and documents
├── data/          # Blog post store
└── utils/         # Utility functions
```
