# Unbehind

Landing page for [unbehind.ai](https://unbehind.ai) — a small studio helping seed-stage founders figure out AI properly.

## Stack

Static HTML. No build step. Hosted on Vercel.

## Local preview

Open `index.html` in any browser, or:

```sh
python3 -m http.server 8000
```

## Deploy

```sh
vercel --prod
```

## Assets

- `index.html` — the page
- `favicon.svg` — navy + gold italic "u"
- `apple-touch-icon.png` — 180×180
- `og.png` — 1200×630 social preview
- `og-generator.html` — template used to render `og.png` via Playwright

## Regenerating the OG image

```sh
node scripts/generate-og.mjs
```
