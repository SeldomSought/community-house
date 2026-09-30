# CLAUDE.md — Instructions for Claude AI

This file contains instructions for Claude (Anthropic's AI assistant) when working with this repository.

## Repository Overview

This is a community coliving/coworking website built with:
- **Framework**: Docusaurus 3.x (React-based static site generator)
- **Styling**: Tailwind CSS 3.x
- **Language**: TypeScript
- **Deployment**: GitHub Pages via GitHub Actions

## How to Make Changes

### 1. Creating a PR

Always create changes via pull requests, never push directly to `main`:

```bash
# Create a descriptive branch
git checkout -b claude/descriptive-change-name

# Make your changes
# ... edit files ...

# Commit with clear message
git add -A
git commit -m "feat: add new community event

- Added February workshop to events.json
- Updated event descriptions"

# Push and create PR
git push -u origin claude/descriptive-change-name
gh pr create --title "Add February workshop event" --body "Description of changes"
```

### 2. Commit Message Format

Use conventional commits:
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `style:` — Formatting, no code change
- `refactor:` — Code restructuring
- `chore:` — Maintenance tasks

### 3. File Locations

| Task | File(s) to Edit |
|------|-----------------|
| Add/edit events | `src/data/events.json` |
| Add/edit features | `src/data/features.json` |
| Edit homepage | `src/pages/index.tsx` |
| Edit about page | `src/pages/about.mdx` |
| Edit membership/pricing | `src/pages/membership.mdx` |
| Edit location info | `src/pages/location.mdx` |
| Add blog post | `blog/YYYY-MM-DD-title.mdx` |
| Add room documentation | `docs/spaces/room-name.mdx` |
| Change colors/theme | `tailwind.config.js` |
| Change site metadata | `docusaurus.config.ts` |
| Edit CSS animations | `src/css/custom.css` |
| Edit property tour rooms | `src/data/rooms.ts` |
| Add property tour images | `static/property-tour/` |

## Data Formats

### Events (src/data/events.json)

```json
{
  "id": "unique-id",
  "title": "Event Title",
  "date": "YYYY-MM-DD",
  "time": "7:00 PM",
  "location": "Location Name",
  "description": "Brief description of the event.",
  "category": "workshop|social|networking",
  "rsvpLink": "https://example.com/rsvp"
}
```

### Features (src/data/features.json)

```json
{
  "title": "Feature Title",
  "description": "Description of the feature or amenity.",
  "icon": "/images/icons/icon-name.svg"
}
```

### Blog Post Frontmatter

```yaml
---
title: Post Title
authors: [author-id]
tags: [tag1, tag2]
image: /images/blog/cover.jpg  # optional
---
```

## Component Guidelines

### Hero Component
- Location: `src/components/Hero/`
- Props: `title`, `subtitle`, `primaryCta`, `secondaryCta`, `backgroundImage`
- Keep titles concise (under 10 words)

### FeatureCard Component
- Location: `src/components/FeatureCard/`
- Automatically creates grid layout
- Icons should be SVG, placed in `static/images/icons/`

### EventsList Component
- Location: `src/components/EventsList/`
- Reads from `events.json`
- Categories: `workshop` (green), `social` (purple), `networking` (blue)

## Testing Changes Locally

Before creating a PR, always verify changes build successfully:

```bash
npm run build
```

If you can't run this, at minimum ensure:
- JSON files are valid (no trailing commas, proper quotes)
- MDX files have valid frontmatter (--- delimiters)
- TSX files have balanced tags and valid JSX

## Do Not Modify

These files should rarely be changed without explicit request:
- `.github/workflows/deploy.yml` — Deployment configuration
- `package.json` — Dependencies (unless adding new ones)
- `tsconfig.json` — TypeScript configuration
- `docusaurus.config.ts` — Only for site-wide settings

## Common Requests & Responses

### "Add a new event"
→ Edit `src/data/events.json`, add new event object to array

### "Update the about page"
→ Edit `src/pages/about.mdx`

### "Change the accent color"
→ Edit `tailwind.config.js`, update `colors.accent`

### "Add a new page"
→ Create new file in `src/pages/` (`.tsx` for React, `.mdx` for Markdown)

### "Add to navigation"
→ Edit `docusaurus.config.ts`, update `navbar.items` array

## PR Description Template

When creating PRs, use this format:

```markdown
## Summary
Brief description of what changed.

## Changes
- Bullet point list of specific changes
- Include file names where relevant

## Testing
- [ ] Verified JSON is valid
- [ ] Verified MDX frontmatter is valid
- [ ] Changes align with design system
```

## Dollhouse Viewer (Property Tour)

The interactive 3D property tour is available at `/property-tour`. It uses Three.js to render a dollhouse-style view of the property.

### Adding/Editing Room Photos

1. **Add images** to `/static/property-tour/`
   - Supported formats: JPG, PNG, SVG, WebP
   - Recommended size: 800x600px or larger

2. **Update room configuration** in `src/data/rooms.ts`:
   ```typescript
   {
     id: 'unique-room-id',
     name: 'Room Display Name',
     floor: 1 | 2,  // Which floor the room is on
     position: { x: 0, z: 0 },  // Grid position
     size: { w: 4, d: 5 },  // Width and depth
     primaryImage: '/property-tour/filename.jpg',  // Thumbnail/top texture
     images: [  // All photos for this room
       '/property-tour/photo1.jpg',
       '/property-tour/photo2.jpg',
     ],
     color: '#38a169',  // Room color in 3D view (hex)
   }
   ```

### Room Layout Grid

The dollhouse uses a simple grid system:
- `position.x` and `position.z` are grid coordinates
- `size.w` (width) and `size.d` (depth) define room dimensions
- Floor 1 is at ground level, Floor 2 floats above

Current layout:
```
Floor 1:                    Floor 2:
┌─────────┬───────┐        ┌─────────┬────┐
│ Living/ │       │        │Bedroom A│Hall│
│ Dining  │Kitchen│        ├─────────┴────┤
│         │       │        │   Bedroom B  │
├─────────┴───────┤        │   / Flex     │
│ Entry / Stairs  │        └──────────────┘
└─────────────────┘
```

### Embedding Elsewhere

The viewer can be embedded on other pages:

```tsx
import BrowserOnly from '@docusaurus/BrowserOnly';

function MyPage() {
  return (
    <BrowserOnly>
      {() => {
        const DollhouseViewer = require('@site/src/components/DollhouseViewer').default;
        return <DollhouseViewer />;
      }}
    </BrowserOnly>
  );
}
```

### Component Files

| File | Purpose |
|------|---------|
| `src/components/DollhouseViewer/index.tsx` | Main Three.js viewer |
| `src/components/DollhouseViewer/RoomModal.tsx` | Photo lightbox/carousel |
| `src/components/DollhouseViewer/styles.module.css` | Component styles |
| `src/data/rooms.ts` | Room configuration |
| `static/property-tour/` | Room images |
| `src/pages/property-tour.tsx` | Page route |
