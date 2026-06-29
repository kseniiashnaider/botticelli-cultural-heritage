# Sandro Botticelli in the ArCo Knowledge Graph

Academic website about Sandro Botticelli and the [ArCo](https://dati.cultura.gov.it/) knowledge graph.

## GitHub Pages

The site is deployed automatically with GitHub Actions on every push.

| Branch | URL |
|--------|-----|
| `main` (production) | `https://kseniiashnaider.github.io/botticelli-cultural-heritage/` |
| Any other branch | `https://kseniiashnaider.github.io/botticelli-cultural-heritage/preview/<branch-name>/` |
| All previews | `https://kseniiashnaider.github.io/botticelli-cultural-heritage/preview/` |

Branch names in preview URLs are sanitized (`/` → `_`, special characters removed).  
Example: branch `rework` → `/preview/rework/`

> **Note:** this repository uses **`main`** as the production branch (there is no `master` branch).

### One-time repository setup

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`gh-pages`** and folder **`/ (root)`**.
4. Save.

The `gh-pages` branch is created automatically on the first workflow run.  
After that, every push to `main` updates the production site.

**Important:** the source must be **`gh-pages`**, not `main`.  
If Pages is set to deploy from `main`, the custom workflow output in `gh-pages` will be ignored.

### How deployment works

- Push to **`main`** → site files are published to the **root** of `gh-pages` (production URL).
- Push to **any other branch** → files go to **`preview/<branch-name>/`** for side-by-side comparison.
- **Delete a branch** → its preview folder is removed automatically.

Workflows:

- `.github/workflows/deploy-pages.yml` — deploy on push (and manual trigger)
- `.github/workflows/cleanup-preview.yml` — remove preview when a branch is deleted

Manual redeploy: **Actions → Deploy GitHub Pages → Run workflow** (branch `main`).

### Deploy a change

```bash
git checkout main
git merge rework          # if changes are on a feature branch
git push origin main      # production
```

```bash
git push origin my-feature    # preview at /preview/my-feature/
```

Wait 1–2 minutes, then open the URL from the table above.  
Deployment status: **Actions** tab → workflow **Deploy GitHub Pages**.

### Troubleshooting

| Problem | Cause | Fix |
|---------|--------|-----|
| Root URL shows 404 or old site | `gh-pages` has no `index.html` at root | Push to **`main`** (workflows must be on `main`) |
| Workflow does not run on `main` | `.github/workflows/` only on a feature branch | Merge into `main` and push |
| Preview works, production does not | Only a feature branch was pushed | `git push origin main` |
| Nothing updates | Pages source set to `main` instead of `gh-pages` | **Settings → Pages → branch `gh-pages` / (root)** |

No build step is required — the workflow publishes static HTML, CSS, JS, and images as-is.
