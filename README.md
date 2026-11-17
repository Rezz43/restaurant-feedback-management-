# Meghboroni guest feedback

Mobile web page that guests open from the table QR code. Built from the Claude Design handoff
(Meghboroni Feedback): it's the shorter four-screen flow (welcome with all three
star ratings → dishes & tags → review → thank you) in English and Bangla.

```bash
npm install
npm run dev       # local dev server
npm run build     # static site in dist/ — host anywhere (it uses relative paths)
```

## Configuration (`.env`, see `.env.example`)

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_FEEDBACK_ENDPOINT` | _(empty)_ | URL that receives each submission as a JSON POST (see `src/submit.ts`). If it's empty, the page runs as a demo and saves nothing. |
| `VITE_SHOW_INCENTIVE` | `true` | Show the 10% off / `MEGH10` card on the thank-you screen. |
| `VITE_PRIVATE_NOTE` | `true` | Ask guests for a private note to the manager when any rating is 2 or lower. |
| `VITE_START_LANG` | `en` | Starting language. Links can also use `?lang=bn` or `?lang=en`. |

The Google review link (`https://g.page/r/Cbx5NhGIIr2sEBM/review`) is in `src/content.ts`.
Point the QR table card (its `feedbackUrl` setting) at wherever you deploy `dist/`.

Before launch, have a native speaker proofread the Bangla text in `src/content.ts`.
