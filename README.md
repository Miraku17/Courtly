# Courtly

A sports venue booking platform that connects players with venue owners. Players discover courts, check real-time availability, and book instantly. Venue owners list their facilities for free, manage bookings, and grow their business.

---

## Tech Stack

### Frontend

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | Next.js 16 (App Router)           |
| Language         | TypeScript                        |
| Styling          | Tailwind CSS 4                    |
| UI Components    | shadcn/ui                         |
| State Management | Zustand (auth), React Query (API) |
| Animations       | Framer Motion                     |
| 3D               | Three.js                          |
| HTTP Client      | Axios                             |
| Icons            | Lucide React                      |

### Backend

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Framework      | NestJS 11                  |
| Language       | TypeScript                 |
| Database       | Supabase (PostgreSQL)      |
| Authentication | Supabase Auth              |
| Validation     | class-validator             |
| Testing        | Jest                       |
| Container      | Docker (node:22-alpine)    |

---

## Project Structure

```
courtly/
├── courtly-frontend/         # Next.js frontend
│   └── src/
│       ├── app/              # Pages & routes (App Router)
│       │   ├── layout.tsx
│       │   ├── page.tsx             # Landing page
│       │   ├── signin/              # Sign in
│       │   ├── signup/              # Sign up (Player / Venue Owner)
│       │   ├── list-venue/          # Venue listing page
│       │   └── onboarding/
│       │       └── venue-owner/     # 4-step venue onboarding wizard
│       ├── components/
│       │   ├── common/       # Landing sections (hero, navbar, footer, etc.)
│       │   ├── three/        # 3D tennis ball scene
│       │   └── ui/           # shadcn/ui components
│       ├── lib/
│       │   ├── api.ts        # Axios instance (withCredentials)
│       │   └── utils.ts      # cn() class merge utility
│       └── store/
│           └── auth-store.ts # Zustand auth state
│
├── courtly-backend/          # NestJS backend
│   └── src/
│       ├── main.ts           # Bootstrap (CORS, ValidationPipe)
│       ├── app.module.ts     # Root module
│       ├── auth/
│       │   ├── auth.controller.ts   # POST signup, signin, signout
│       │   ├── auth.service.ts      # Supabase auth logic
│       │   └── dto/                 # SignUpDto, SignInDto
│       └── supabase/
│           ├── supabase.module.ts   # Global Supabase provider
│           └── supabase.service.ts  # Supabase client init
│
└── docker-compose.yml        # Orchestrates frontend + backend
```

---

## API Endpoints

| Method | Route           | Description                        |
| ------ | --------------- | ---------------------------------- |
| POST   | /auth/signup    | Register (Player or Venue Owner)   |
| POST   | /auth/signin    | Login, sets httpOnly access_token  |
| POST   | /auth/signout   | Logout, clears access_token cookie |

---

## Database Models

| Table                  | Purpose                        |
| ---------------------- | ------------------------------ |
| profiles               | User profiles with role        |
| venues                 | Venue details                  |
| courts                 | Court details per venue        |
| schedules              | Weekly availability            |
| bookings               | Reservations                   |
| payments               | Payment records                |
| venue_payment_methods  | Accepted payment methods       |
| reviews                | Ratings and reviews            |
| blocked_dates          | Maintenance windows            |

---

## User Roles

- **PLAYER** — Browse venues, book courts, leave reviews
- **VENUE_OWNER** — List venues, manage courts, set pricing, track earnings
- **ADMIN** — Platform administration, dispute resolution, payouts

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm
- Supabase CLI (for local development)

### 1. Start Local Supabase

```bash
cd courtly-backend
npx supabase start
```

### 2. Backend

```bash
cd courtly-backend
npm install
# Configure .env with your Supabase keys
npm run start:dev          # Runs on http://localhost:3000
```

### 3. Frontend

```bash
cd courtly-frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:3000
npm run dev                # Runs on http://localhost:3001
```

### Docker (Production)

```bash
# From project root
docker compose up --build
```

Backend runs on port 3000, frontend on port 3001.

---

## Environment Variables

### Backend (`.env`)

```
PORT=3000
NODE_ENV=development
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## Available Scripts

### Frontend

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm run start:dev    # Dev server (watch mode)
npm run start:debug  # Debug mode
npm run build        # Compile
npm run test         # Unit tests
npm run test:e2e     # E2E tests
npm run test:cov     # Coverage report
npm run lint         # Lint and fix
```

---

## Authentication Flow

1. **Sign Up** — `POST /auth/signup` creates user in Supabase Auth + updates `profiles` table with role
2. **Sign In** — `POST /auth/signin` returns user data and sets `access_token` as an httpOnly cookie (1 hour TTL)
3. **Sign Out** — `POST /auth/signout` invalidates session server-side and clears the cookie
4. **Route Protection** — Frontend middleware decodes JWT and redirects unauthenticated users away from protected routes (`/dashboard/*`, `/onboarding/*`)

---

## Frontend Pages

| Route                     | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `/`                       | Landing page with 3D hero, features, testimonials |
| `/signin`                 | Email/password login                             |
| `/signup`                 | Registration with role toggle (Player/Venue Owner)|
| `/list-venue`             | Venue listing promo page                         |
| `/onboarding/venue-owner` | 4-step venue setup wizard                        |

---

## Design System

### Color Palette

| Token              | Value     | Usage                    |
| ------------------ | --------- | ------------------------ |
| `--color-primary`  | `#d9f170` | CTAs, accents            |
| `--color-bg-dark`  | `#102b0f` | Main dark background     |
| `--color-bg-light` | `#eaf6df` | Light sections           |
| `--color-text-main`| `#ffffff` | Primary text on dark     |
| `--color-text-dark`| `#1a1a1a` | Text on light background |

### Responsive Approach

Mobile-first with Tailwind breakpoints (`sm:` `md:` `lg:` `xl:`). Minimum touch target: 44x44px.

---

## Planned Modules

- Users (profile CRUD)
- Venues (search, CRUD, image uploads)
- Courts & Schedules
- Bookings
- Payments (Stripe Connect)
- Reviews
- Admin dashboard
- Email notifications (SendGrid)
- Slot locking (Redis)

---

## Git Workflow

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/`
- Commit style: [Conventional Commits](https://www.conventionalcommits.org/)
- PRs require at least 1 reviewer before merging
