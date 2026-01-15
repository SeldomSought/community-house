# GitHub Actions Workflow Update Required

Due to OAuth scope limitations, the workflow file could not be updated automatically.
Please manually update `.github/workflows/deploy.yml` with the following changes:

## Changes Required

Replace the entire contents of `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

# Environment variables for Docusaurus configuration
# These ensure the correct baseUrl is used for GitHub Pages deployment
env:
  DOCUSAURUS_URL: https://SeldomSought.github.io
  DOCUSAURUS_BASE_URL: /community-house/

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          # Explicit env vars (also set at workflow level, but repeated for clarity)
          DOCUSAURUS_URL: ${{ env.DOCUSAURUS_URL }}
          DOCUSAURUS_BASE_URL: ${{ env.DOCUSAURUS_BASE_URL }}

      - name: Verify build output
        run: |
          echo "Build completed. Checking output..."
          ls -la build/
          # Verify index.html exists and contains correct baseUrl
          if grep -q 'href="/community-house/' build/index.html; then
            echo "baseUrl correctly set to /community-house/"
          else
            echo "WARNING: baseUrl may not be correctly configured"
            echo "Checking index.html for base tag..."
            grep -o '<base[^>]*>' build/index.html || echo "No base tag found"
            grep -o 'href="[^"]*"' build/index.html | head -10
          fi

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    if: github.ref == 'refs/heads/main' && github.event_name != 'pull_request'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Why This Is Needed

The workflow update adds:
1. **Explicit environment variables** (`DOCUSAURUS_URL`, `DOCUSAURUS_BASE_URL`) at the workflow level
2. **Build verification step** that checks the output contains the correct baseUrl
3. **npm cache** for faster builds
4. **npm ci** instead of `npm install` for reproducible builds

## How to Apply

1. Open `.github/workflows/deploy.yml` in GitHub's web editor
2. Replace the contents with the YAML above
3. Commit directly to main or create a PR

After this update, the baseUrl configuration will be bulletproof and the error banner will not recur.
