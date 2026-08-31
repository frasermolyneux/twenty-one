# Copilot Instructions

Twenty One is a framework-free blackjack practice site hosted as an Azure Static Web App, with Terraform-managed infrastructure.

## Layout and boundaries

- Maintained application files are [`../src/index.html`](../src/index.html), [`../src/styles.css`](../src/styles.css), and [`../src/script.js`](../src/script.js).
- [`../src/sw.js`](../src/sw.js) owns offline caching. Bump `CACHE_NAME` when cached assets change so clients receive the new files.
- Keep MIME mappings and the SPA fallback in [`../src/staticwebapp.config.json`](../src/staticwebapp.config.json) aligned with added asset types.
- The site has no application build pipeline: `npm run build` is intentionally a no-op. Do not introduce a framework or bundler without an explicit requirement.
- Terraform under [`../terraform`](../terraform) owns the Static Web App and DNS integration. Preserve provider constraints, state boundaries, naming, and OIDC authentication.
- `.terraform.lock.hcl` is ignored; committed provider constraints define Terraform compatibility.

## Validation

- Preview from `src/` with `npm run dev` or `npm start`.
- For maintained JavaScript changes, use the browser-focused checks documented by the repository; no unit-test runner is configured.
- Terraform formatting: `terraform -chdir=terraform fmt -check -recursive`.
- Use state-backed Terraform plans only for infrastructure changes with the required environment access.

See [`../docs/development-workflows.md`](../docs/development-workflows.md) for deployment behavior and [`../AGENTS.md`](../AGENTS.md) for the portable execution brief.
