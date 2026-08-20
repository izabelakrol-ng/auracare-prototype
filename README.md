# AuraCare — Silk DS prototype

A fully interactive, responsive single-page React prototype for a boutique
HealthTech booking platform, built on the **Silk Design System** (semantic
tokens, component anatomy and state matrix) with an AuraCare brand theme.

Live: https://izabelakrol-ng.github.io/auracare-prototype/

## Stack
- React 19 + Vite
- Tailwind (utility classes) + Silk design tokens (injected CSS variables)
- lucide-react icons
- Photos: Unsplash

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> dist/
npm run preview
```

Deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.
The whole app lives in [`src/App.jsx`](src/App.jsx).
