# AGENTS.md — twenty-one

Static blackjack card-counting trainer (vanilla HTML/CSS/JS) hosted as an Azure Static Web App. No backend, no database, no auth. This is the execution brief for the GitHub Copilot coding agent and other [agents.md](https://agents.md)-convention agents.

> Humans in VS Code: see `.github/copilot-instructions.md` for orientation.

## Layout

- `src/` — the site: `index.html`, `styles.css`, `script.js` (game logic), `sw.js` (service worker cache), `staticwebapp.config.json` (SPA routing + MIME types)
- `terraform/` — Azure Static Web App + custom domain (CNAME) via `azurerm`/`time` providers, per-env `backends/` and `tfvars/`
- `docs/development-workflows.md` — CI/CD branch strategy and trigger reference (don't duplicate it here)

## Commands (evidenced only)

```pwsh
# Local preview (optional, not required to edit static files)
cd src
npm install          # only needed for npm start / npm run deploy
npm run dev          # python -m http.server 8080
npm start            # npx serve .

# Terraform validation
terraform -chdir=terraform fmt -check -recursive
terraform -chdir=terraform init -backend-config=backends/dev.backend.hcl
terraform -chdir=terraform validate
terraform -chdir=terraform plan -var-file=tfvars/dev.tfvars
```

`npm run build` is a no-op placeholder (`echo`) kept for CI shape only — there is no lint or test script in `src/package.json`. Don't claim a build/test gate that doesn't exist, and don't add a build toolchain, linter, or test framework without evidence it's needed.

## Maintenance rules

- Bump `CACHE_NAME` in `src/sw.js` whenever cached assets (`index.html`, `styles.css`, `script.js`, the Google Fonts URL) change, so the service worker doesn't serve stale content.
- Keep `src/staticwebapp.config.json` `mimeTypes` aligned with any new served file extensions.
- `terraform/static_web_app.tf` owns the `azurerm_static_web_app`, its CNAME record, and custom domain binding. This repo resolves its resource group and DNS zone directly via data sources — it does not consume `platform-hosting`/`platform-monitoring` remote state.
- `.terraform.lock.hcl` and `package-lock.json` are intentionally gitignored — don't commit them.

## Do not

- Don't modify `.github/workflows/`, `.github/dependabot.yml`, release/deploy config, or repository settings unless that is the explicit task.
- Don't touch Terraform provider/version pins or resource naming/tagging conventions.
- Don't introduce client secrets, connection strings, or hard-coded subscription IDs/GUIDs — auth is OIDC + managed identity only.
