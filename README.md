# Community House

A modern coliving & coworking community website built with Docusaurus 3 and Tailwind CSS, deployed on GitHub Pages.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Docusaurus](https://img.shields.io/badge/Docusaurus-3.x-brightgreen)
![Deploy](https://img.shields.io/github/actions/workflow/status/YOUR_ORG/community-house/deploy.yml?label=deploy)

## ✨ Features

- 🎨 **Modern Design** — Dark mode, gradient accents, animated components
- 📱 **Fully Responsive** — Mobile-first design with 4 breakpoints
- ⚡ **Fast** — Static site generation, optimized builds
- 🔍 **SEO Ready** — Open Graph, Twitter Cards, sitemap
- 🤖 **Claude-Ready** — Easy PR workflow for AI-assisted updates

## 🚀 Quick Start

### Option 1: One-Command Setup (Recommended)

```bash
# Clone this repo
git clone https://github.com/YOUR_ORG/community-house.git
cd community-house

# Run the setup script
chmod +x setup.sh
./setup.sh
```

The script will:
1. Check requirements (git, gh CLI)
2. Create the GitHub repository
3. Configure GitHub Pages
4. Push and deploy automatically

### Option 2: Manual Setup

```bash
# 1. Clone and enter directory
git clone https://github.com/YOUR_ORG/community-house.git
cd community-house

# 2. Install dependencies
npm install

# 3. Start development server
npm run start

# 4. Build for production
npm run build

# 5. Push to GitHub (triggers auto-deploy)
git add -A
git commit -m "Initial commit"
git push origin main
```

### GitHub Pages Configuration

1. Go to **Settings → Pages**
2. Under "Build and deployment", select **GitHub Actions**
3. The workflow will automatically deploy on push to `main`

## 🤖 Claude Integration

This repository is designed for seamless updates via Claude AI.

### For Claude Code Users

```bash
# Claude can directly create PRs using the helper script
./scripts/claude-pr.sh "feature/new-events" "Add January events" "Updated events.json with new community events"
```

### For Claude API / Chat Integration

Claude can submit PRs by:

1. **Creating a branch**: `git checkout -b claude/update-YYYYMMDD`
2. **Making changes**: Edit files as needed
3. **Committing**: `git add -A && git commit -m "Description"`
4. **Pushing**: `git push -u origin claude/update-YYYYMMDD`
5. **Creating PR**: `gh pr create --title "Title" --body "Description"`

### Setting Up Claude Access

1. **Create a Fine-Grained PAT**:
   - Go to [GitHub Settings → Tokens](https://github.com/settings/tokens?type=beta)
   - Click "Generate new token"
   - Name: `claude-community-house`
   - Repository access: Select `community-house`
   - Permissions:
     - Contents: Read and write
     - Pull requests: Read and write
     - Metadata: Read-only

2. **Use with Claude Code**:
   ```bash
   gh auth login --with-token < token.txt
   ```

3. **Use with Claude API**:
   Store the token securely and use it for authenticated GitHub API calls.

## 📁 Project Structure

```
community-house/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── blog/                        # Blog posts (MDX)
├── docs/
│   └── spaces/                  # Room documentation
├── scripts/
│   └── claude-pr.sh            # PR helper script
├── src/
│   ├── components/
│   │   ├── Hero/               # Animated hero section
│   │   ├── FeatureCard/        # Feature grid cards
│   │   ├── EventsList/         # Filterable events
│   │   └── FloorPlan/          # Tabbed floor plans
│   ├── css/
│   │   └── custom.css          # Design tokens, animations
│   ├── data/
│   │   ├── events.json         # Event listings
│   │   └── features.json       # Feature cards data
│   └── pages/
│       ├── index.tsx           # Homepage
│       ├── about.mdx           # About page
│       ├── events.tsx          # Events page
│       ├── location.mdx        # Location page
│       ├── membership.mdx      # Pricing page
│       └── apply.tsx           # Application form
├── static/                      # Static assets (images, fonts)
├── docusaurus.config.ts        # Site configuration
├── tailwind.config.js          # Tailwind theme
└── package.json
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#0A0A0A',      // Background
  accent: '#E85D04',       // Orange accent
  surface: '#141414',      // Cards
}
```

### Content

- **Events**: Edit `src/data/events.json`
- **Features**: Edit `src/data/features.json`
- **Pages**: Edit files in `src/pages/`
- **Blog**: Add MDX files to `blog/`

### Site Config

Edit `docusaurus.config.ts`:
```typescript
const config = {
  title: 'Your Community Name',
  url: 'https://your-domain.com',
  baseUrl: '/',
  // ...
};
```

## 📝 Common Tasks

### Add a New Event

```json
// src/data/events.json
{
  "id": "event-001",
  "title": "Community Dinner",
  "date": "2025-02-15",
  "time": "7:00 PM",
  "location": "Main Kitchen",
  "description": "Monthly community dinner.",
  "category": "social",
  "rsvpLink": "https://lu.ma/your-event"
}
```

### Add a Blog Post

Create `blog/YYYY-MM-DD-title.mdx`:
```markdown
---
title: Your Post Title
authors: [your-name]
tags: [community, updates]
---

Your content here...

<!--truncate-->

More content after the fold...
```

### Add a New Room

Create `docs/spaces/room-name.mdx`:
```markdown
---
sidebar_position: 2
title: Room Name
---

# Room Name

Description and details...
```

## 🔧 Development

```bash
# Start dev server
npm run start

# Build production
npm run build

# Serve production build locally
npm run serve

# Type check
npm run typecheck
```

## 🚀 Deployment

Deployment is automatic via GitHub Actions:

1. **Push to `main`** → Triggers build & deploy
2. **Create a PR** → Triggers build (preview)
3. **Merge PR** → Triggers deploy to production

### Avoiding baseUrl Issues

This site uses a bulletproof configuration to prevent the dreaded "Your Docusaurus site did not load properly" error.

**How it works:**

The `docusaurus.config.ts` computes `url` and `baseUrl` from environment variables:

| Environment | baseUrl | How it's set |
|-------------|---------|--------------|
| Local dev (`npm start`) | `/` | Default for local |
| GitHub Actions | `/community-house/` | Auto-inferred from `GITHUB_REPOSITORY` |
| Explicit override | Any value | Set `DOCUSAURUS_BASE_URL` env var |

**Available npm scripts:**

```bash
npm run start        # Local dev (baseUrl="/")
npm run build        # Respects environment (local="/", CI="/repo-name/")
npm run build:gh     # Explicit GitHub Pages build (baseUrl="/community-house/")
npm run serve:gh     # Serve with GitHub Pages baseUrl locally
```

**If you see the baseUrl error:**

1. Check the GitHub Actions logs for the computed `url` and `baseUrl`
2. Ensure no merge conflict has reverted the config
3. The config auto-infers baseUrl from `GITHUB_REPOSITORY` in CI

**Environment variables:**

| Variable | Description | Default |
|----------|-------------|---------|
| `DOCUSAURUS_URL` | Full site URL | `https://SeldomSought.github.io` |
| `DOCUSAURUS_BASE_URL` | Path prefix | `/` (local) or `/<repo>/` (CI) |

### Custom Domain

1. Add your domain in `static/CNAME`:
   ```
   your-domain.com
   ```

2. Update environment variables in your workflow:
   ```yaml
   env:
     DOCUSAURUS_URL: https://your-domain.com
     DOCUSAURUS_BASE_URL: /
   ```

3. Configure DNS:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  YOUR_ORG.github.io
   ```

4. Enable HTTPS in GitHub Pages settings

## 📄 License

MIT License — feel free to use this for your own community!

---

Built with ❤️ using [Docusaurus](https://docusaurus.io/) and [Tailwind CSS](https://tailwindcss.com/)
