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

### One-time repository setup

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`gh-pages`** and folder **`/ (root)`**.
4. Save.

The `gh-pages` branch is created automatically on the first workflow run.  
After that, every push triggers a deployment.

### How deployment works

- Push to **`main`** (or **`master`**) → site files are published to the **root** of GitHub Pages. Existing branch previews are preserved.
- Push to **any other branch** → site files are published to **`preview/<branch-name>/`**, so you can compare experiments with production without affecting the live site.
- **Delete a branch** → its preview folder is removed automatically.

Workflows:

- `.github/workflows/deploy-pages.yml` — build and deploy on push
- `.github/workflows/cleanup-preview.yml` — remove preview when a branch is deleted

### Deploy a change

```bash
git add .
git commit -m "Describe your change"
git push origin main          # production
# or
git push origin my-feature    # preview at /preview/my-feature/
```

Wait 1–2 minutes, then open the URL from the table above.  
Deployment status: **Actions** tab in the repository.

### Compare branch vs production

1. Open the production site (`main`).
2. Open the preview URL for your branch.
3. Compare layout, content, or design side by side.

No build step is required — the workflow publishes static HTML, CSS, JS, and images as-is.
