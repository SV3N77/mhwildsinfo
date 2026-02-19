# AGENTS.md - Monster Hunter Wilds Info

## Project Overview
Monster Hunter Wilds information website built with modern web technologies to display game data including monsters, weapons, armour, items, and decorations.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with Turbopack
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Package Manager**: Yarn
- **Path Alias**: `@/*` maps to `./src/*`

## CRITICAL INSTRUCTIONS

### NEVER RUN BUILD
⚠️ **IMPORTANT**: The dev server is already running. Do NOT run `yarn build` or any build commands. The dev server handles hot-reloading automatically.

### DO NOT RUN ESLINT AUTOMATICALLY
⚠️ **IMPORTANT**: Do NOT run `yarn lint` automatically after every change. Only run linting when explicitly requested or before committing. The dev server handles hot-reloading without lint checks.

## Available Commands

```bash
# Development (with Turbopack - fastest)
yarn dev

# Production build (DO NOT RUN - dev server is active)
yarn build

# Start production server (DO NOT RUN)
yarn start

# Lint code
yarn lint
```

## Project Structure

```
mhwildsinfo/
├── src/
│   ├── api/                         # API layer and data fetching
│   │
│   ├── app/                         # Next.js App Router (src/app)
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Homepage (/)
│   │   ├── globals.css              # Global Tailwind styles
│   │   │
│   │   ├── armour/                  # Armour section (/armour)
│   │   │   ├── page.tsx             # Armour listing page
│   │   │   ├── armours.tsx          # Client-side armour list
│   │   │   └── [id]/                # Dynamic route for individual armour
│   │   │       ├── page.tsx         # Armour detail page
│   │   │       └── armourSet.tsx    # Armour set display component
│   │   │
│   │   ├── decorations/             # Decorations section (/decorations)
│   │   │   ├── page.tsx             # Decorations listing page
│   │   │   └── decorations.tsx      # Client-side decorations list
│   │   │
│   │   ├── items/                   # Items section (/items)
│   │   │   ├── page.tsx             # Items listing page
│   │   │   └── items.tsx            # Client-side items list
│   │   │
│   │   ├── monsters/                # Monsters section (/monsters)
│   │   │   ├── page.tsx             # Monsters listing page
│   │   │   ├── monsters.tsx         # Client-side monsters list
│   │   │   └── [id]/                # Dynamic route for individual monsters
│   │   │       ├── page.tsx         # Monster detail page
│   │   │       └── monster.tsx      # Monster detail component
│   │   │
│   │   ├── weapons/                 # Weapons section (/weapons)
│   │   │   ├── page.tsx             # Weapons listing page
│   │   │   └── weapons.tsx          # Client-side weapons list
│   │   │
│   │   └── search/                  # Search page (/search)
│   │       └── page.tsx             # Search interface
│   │
│   ├── components/                  # React components
│   │   ├── topBar.tsx               # Main navigation bar
│   │   │
│   │   ├── armour/                  # Armour-specific components
│   │   │   ├── clientArmorList.tsx  # Client-side armour grid/list
│   │   │   ├── defense.tsx          # Defense stats display
│   │   │   ├── pieces.tsx           # Individual armour pieces
│   │   │   └── resistances.tsx      # Elemental resistances
│   │   │
│   │   ├── decoration/              # Decoration components
│   │   │   └── decorationTable.tsx  # Decorations data table
│   │   │
│   │   └── ui/                      # shadcn/ui components
│   │       ├── accordion.tsx        # Collapsible content
│   │       ├── button.tsx           # Button variants
│   │       ├── card.tsx             # Card container
│   │       ├── input.tsx            # Input field
│   │       ├── sheet.tsx            # Side panel/sheet
│   │       ├── skeleton.tsx         # Loading skeleton
│   │       └── table.tsx            # Data table
│   │
│   └── lib/                         # Utilities and types
│       ├── types/                   # TypeScript interfaces
│       │   ├── armour.ts            # Armour type definitions
│       │   ├── decoration.ts        # Decoration type definitions
│       │   ├── items.ts             # Item type definitions
│       │   ├── monsters.ts          # Monster type definitions
│       │   └── weapon.ts            # Weapon type definitions
│       │
│       └── utils/                   # Helper functions
│           ├── armourUtils.ts       # Armour data utilities
│           ├── itemsUtils.ts        # Item data utilities
│           ├── util.ts              # General helpers
│           └── weaponUtils.ts       # Weapon data utilities
│
├── public/                          # Static assets
│   ├── images/
│   │   └── placeholder.png          # Placeholder images
│   └── *.svg                        # Icons and graphics
│
├── components.json                  # shadcn/ui configuration
├── eslint.config.mjs               # ESLint flat config
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS + Tailwind config
├── tsconfig.json                   # TypeScript config with path aliases
└── yarn.lock                       # Yarn dependency lockfile
```

## Component Patterns

### shadcn/ui Components
All UI components are from shadcn/ui and use Radix UI primitives. To add new components:
```bash
yarn dlx shadcn@latest add [component-name]
```

### Import Path Aliases
Use the `@/*` alias for imports from `src/`:
```typescript
import { Component } from '@/components/ui/component'
import { someUtil } from '@/lib/utils/util'
import { SomeType } from '@/lib/types/types'
```

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` → `./src/*`
- Next.js plugin for App Router support

### Tailwind CSS 4
- Uses PostCSS for processing
- Utility-first CSS classes
- Custom animations via `tailwindcss-animate`

## Key Features by Section

### Monsters
- Monster listing with search/filter
- Individual monster detail pages
- Monster data types and utilities

### Armour
- Armour set listings
- Individual armour piece details
- Defense and resistance displays
- Armour piece composition

### Weapons
- Weapon listings by type
- Weapon statistics and details
- Weapon data utilities

### Decorations
- Decoration listings
- Decoration table with skills
- Rarity and slot information

### Items
- Item listings
- Item categories and details
- Item data management

## Development Workflow

1. Make code changes
2. Dev server automatically hot-reloads (no build or linting needed)
3. Test changes in browser at http://localhost:3000
4. Run `yarn lint` only when explicitly requested or before committing

## Notes

- Always use TypeScript for type safety
- Follow existing component patterns in `src/components/`
- Use shadcn/ui components for UI elements
- Keep types in `src/lib/types/`
- Keep utilities in `src/lib/utils/`
- Never run `yarn build` - dev server is active
