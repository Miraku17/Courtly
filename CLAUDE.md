# CLAUDE.md

This file provides guidance to Claude when working in this repository.

---

## Project Overview

**CourtifyReach** — A platform for sports venue owners to list their venues, reach more players, manage bookings effortlessly, and grow their business. Free to use for venue owners.

**Target users**: Sports venue owners and players looking to discover and book courts.

---

## Tech Stack

- **Framework**: Next.js (latest — App Router)
- **UI Components**: shadcn/ui
- **3D & Animations**: Three.js
- **Styling**: Tailwind CSS (comes with shadcn/ui setup)
- **Language**: TypeScript
- **Testing**: Vitest + React Testing Library
- **Package Manager**: npm

---

## Project Structure

```
app/
  layout.tsx          # Root layout
  page.tsx            # Home route
  (routes)/           # Route groups

components/
  ui/                 # shadcn/ui generated components (do not edit manually)
  common/             # Shared custom components
  three/              # Three.js scene components and canvas wrappers

lib/
  utils.ts            # shadcn utility (cn helper)
  three/              # Three.js helpers, loaders, scene setup

hooks/                # Custom React hooks
types/                # TypeScript type definitions
public/
  models/             # 3D assets (.glb, .gltf)
  textures/           # Texture maps
```

---

## Common Commands

```bash
# Development
npm run dev              # Start local dev server
npm run build            # Production build
npm run preview          # Preview production build

# shadcn/ui
npx shadcn@latest add <component>   # Add a new shadcn component

# Testing
npm run test             # Run all tests
npm run test:watch       # Watch mode

# Code Quality
npm run lint             # Run linter
npm run typecheck        # TypeScript type checking
npm run format           # Format with Prettier
```

---

## Code Style & Conventions

- Use **TypeScript** for all new files; avoid `any` types
- Prefer **named exports** over default exports
- Use **functional components** with hooks (no class components)
- File naming: `kebab-case` for files, `PascalCase` for components
- Keep components small and focused — extract logic into custom hooks
- Co-locate tests next to the code they test (e.g. `Button.test.tsx`)
- Mark any component using Three.js or browser APIs with `"use client"` at the top

---

## Architecture Decisions

- **Routing**: Next.js App Router — use Server Components by default, opt into Client Components only when needed (interactivity, Three.js, browser APIs)
- **UI Components**: shadcn/ui — always add via CLI, never copy-paste or hand-write components that shadcn provides
- **3D Rendering**: Three.js — wrap all canvas/scene logic in a Client Component; initialize renderer inside `useEffect`; store renderer/scene/camera in `useRef` (not state)
- **Animations**: Use Three.js `requestAnimationFrame` loop for 3D animations; use Tailwind + CSS transitions for UI animations
- **State management**: React `useState` / `useReducer` for local state; Zustand if global state is needed
- **Data fetching**: Next.js Server Components + `fetch` for server-side data; React Query for client-side/dynamic fetching

---

## Three.js Guidelines

- Always clean up in `useEffect` return: dispose geometries, materials, textures, and call `renderer.dispose()`
- Use `ResizeObserver` or a resize hook to handle canvas resizing responsively
- Load 3D models with `GLTFLoader` — place assets in `/public/models/`
- Avoid blocking the main thread — use `DRACOLoader` for compressed models
- Keep scene logic in `/lib/three/` and expose it via clean hooks like `useScene`, `useAnimationLoop`

---

## shadcn/ui Guidelines

- **Always use shadcn/ui components first** — before building any UI element (selects, dropdowns, dialogs, buttons, inputs, etc.), check if a shadcn component exists for it. Install via CLI if not yet added (`npx shadcn@latest add <component>`). Only fall back to native HTML elements when no shadcn equivalent exists.
- Never manually edit files inside `components/ui/` — they are managed by the shadcn CLI
- Customize appearance via Tailwind utility classes at the usage site or via `tailwind.config.ts` theme tokens
- Use the `cn()` utility from `lib/utils.ts` for conditional class merging

---

## UI & Responsive Design

- **Mobile-first always** — write base styles for mobile, then layer up with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- Never write desktop styles first and try to scale down
- Default layout is single-column; use grid/flex with breakpoints to expand on larger screens
- Touch targets must be at least `44x44px` — use `min-h-11 min-w-11` as a baseline for interactive elements
- Avoid hover-only interactions — always ensure tap/click works as the primary interaction
- Test all UI at 375px width (iPhone SE) as the minimum baseline
- Use `clamp()` or Tailwind's responsive text utilities for fluid typography (`text-sm md:text-base lg:text-lg`)
- Prefer `svh`/`dvh` over `vh` for full-height layouts on mobile to account for browser chrome

```tsx
// Good — mobile first
<div className="flex flex-col gap-4 md:flex-row md:gap-8">

// Bad — desktop first
<div className="flex flex-row gap-8 sm:flex-col sm:gap-4">
```

---

## Environment Variables

```bash
# Required — copy .env.example to .env.local
DATABASE_URL=
NEXT_PUBLIC_API_URL=
```

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env` files — all secrets go in `.env.local`

---

## Testing Guidelines

- Write tests for all utility functions and hooks
- Use **React Testing Library** — test behavior, not implementation
- Mock Three.js and external APIs in tests
- Minimum coverage target: **80%**

---

## What to Avoid

- Don't install new dependencies without discussing first
- Don't use `console.log` in production code
- Don't manually edit `components/ui/` shadcn files
- Don't initialize Three.js outside of `useEffect` — causes SSR errors
- Don't use inline styles — use Tailwind classes
- Don't commit directly to `main` — always use a feature branch

---

## Git Workflow

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/`
- Commit style: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`)
- PRs require at least 1 reviewer before merging

---

## Notes for Claude

- When in doubt, ask before making large refactors
- Prefer editing existing patterns over introducing new ones
- Always run `npm run typecheck` and `npm run lint` after changes
- Any component touching Three.js must be a Client Component
- Flag any security concerns (exposed secrets, XSS, etc.) immediately

---
