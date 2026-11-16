# Emi OS

Birthday terminal for Emi, with a pink reveal, dimensional ASCII kitten, local birthday video and fictional R$8.000 olive-oil promotion.

Open `dist/index.html` in a browser. Keep all of `dist` together, including `assets/birthday.mp4`. For an HTTP preview, run `node serve.mjs`, then open http://127.0.0.1:4174.

The supplied credentials are a playful client-side puzzle, not secure authentication. No payments, analytics or external font services. Sound requires a click. Reduced-motion preferences are respected.

Run `node verify.mjs` for browser flow checks (requires the df-design Playwright installation and Microsoft Edge on this machine). Run `node motion-review.mjs` for wheel-driven motion evidence. Test credentials are read from the app locally and never logged.

Work is on `feat/emi-birthday`. GitHub PR creation is currently unavailable because the configured GitHub token is invalid; re-authentication is required before a PR can be opened. The Sites source remote is a deployment mirror, not a GitHub PR provider.
