# AuraCare — authentic Silk DS build

Live: https://izabelakrol-ng.github.io/auracare-prototype/

An interactive, responsive booking prototype for the boutique HealthTech
platform **AuraCare**, built on the **real** Silk Design System
(`@silk/components` — Radix UI + Tailwind v4 + Phosphor icons). AuraCare is a
Silk **token mode** (Deep Emerald / Mint / Gold) applied on `<html>`.

This repository hosts the **prebuilt static site** in [`site/`](site/) (the
authentic build needs the full Silk workspace to compile, so the compiled
output is committed and served as-is). `.github/workflows/deploy.yml` publishes
`site/` to GitHub Pages on every push to `main`.

The source of the app lives in the Silk monorepo under `auracare-silk/`.
