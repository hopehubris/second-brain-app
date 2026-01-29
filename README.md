# Second Brain

> A beautiful, auto-indexing markdown document viewer for your personal knowledge base

![Second Brain](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## Overview

Second Brain is a NextJS-based document viewer that automatically indexes markdown files from a designated folder and presents them in a clean, navigable interface inspired by Obsidian and Linear.

**Key Features:**
- 📂 Auto-indexing of markdown files
- 🎨 Beautiful, responsive UI with dark mode
- 📁 Category-based organization
- 🔍 Clean sidebar navigation
- 📝 Full markdown rendering with GFM support
- ⚡ Fast, lightweight, no database needed

## Quick Start

```bash
# Install dependencies
npm install

# Set up your document folder
mkdir -p ~/second-brain/{daily,concepts,projects}

# Start dev server
npm run dev

# Open browser
open http://localhost:3100
```

## Document Structure

Create markdown files in `~/second-brain/`:

```
~/second-brain/
├── daily/          # Daily journal entries (YYYY-MM-DD.md)
├── concepts/       # Deep dives into important topics
├── projects/       # Project-specific documentation
└── README.md
```

Documents automatically appear in the viewer - no configuration needed!

## Usage

### Adding Documents

Simply create `.md` files in any subdirectory:

```bash
echo "# My First Note\n\nContent here..." > ~/second-brain/concepts/first-note.md
```

Refresh the UI - it's there!

### Daily Journals

Create daily entries:

```bash
echo "# $(date +%Y-%m-%d)\n\n## Today's highlights..." > ~/second-brain/daily/$(date +%Y-%m-%d).md
```

### Organization

Files are automatically organized by their parent folder name:
- Files in `daily/` → "daily" category
- Files in `concepts/` → "concepts" category
- Files in root → "root" category

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Markdown:** react-markdown + remark-gfm
- **Typography:** @tailwindcss/typography

## Configuration

Edit `app/api/documents/route.ts` to change the document folder location:

```typescript
const BRAIN_DIR = path.join(os.homedir(), 'second-brain')
```

Change port in `package.json`:

```json
"dev": "next dev -p 3100"
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Design Philosophy

- **Minimal friction** - No database, no complex setup
- **File-based** - Plain markdown, portable, git-friendly  
- **Auto-everything** - Index, organize, present automatically
- **Beautiful** - Clean UI that feels good to use

## Roadmap

- [ ] Search functionality
- [ ] Tag system
- [ ] Graph view (connections between docs)
- [ ] Quick capture (add notes from UI)
- [ ] Export capabilities
- [ ] Backlinks support
- [ ] Vim keybindings

## License

MIT

---

Built with ❤️ for capturing knowledge effortlessly and reviewing it beautifully.
