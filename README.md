# FITGURU — Personal Trainer Booking Website (Ahmedabad)

A high-converting, dark-themed single-page application for a Ahmedabad-based personal trainer. Generates leads, schedules trial sessions, restricts bookings to Ahmedabad areas, and includes a secure admin dashboard with analytics.

## Features

### Public Website
- **Hero Section** — Bold value proposition with CTAs and scarcity badge
- **About Section** — Trainer profile and credentials
- **Services Section** — Training programs with descriptions
- **Pricing Section** — 3 subscription plans (Monthly / Quarterly / Annual)
- **Transformation Gallery** — Before/after showcase
- **Testimonials** — Client success stories
- **Blog & Tips** — SEO-friendly fitness content
- **FAQ Section** — Common questions with accordion
- **BMI Calculator** — Interactive tool with personalized recommendations
- **Referral System** — Unique referral code generation (FIT-XXXXX)
- **Exit-Intent Popup** — Lead capture on mouse-leave
- **Countdown Timer** — Daily FOMO timer for limited slots
- **WhatsApp Button** — Floating quick-chat button
- **Google Maps** — Service area visualization
- **Booking Form** — Session booking with Ahmedabad area dropdown
- **Callback Request** — Lead capture form saved to database

### Admin Dashboard (`/admin`)
- **Secure Login** — Email/password authentication with role-based access control
- **Dashboard** — KPI cards, area-wise analytics (Recharts bar/pie charts), revenue estimates
- **Bookings** — Searchable/filterable table with status management and CSV export
- **Callbacks** — Lead list with click-to-call functionality

### Security
- Row-Level Security (RLS) on all database tables
- `has_role()` security-definer function for admin access checks
- No client-side role checks — all authorization is server-side
- No anonymous sign-ups

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Framer Motion
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Icons:** Lucide React

## Prerequisites
- Node.js 18+ (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- npm

## Getting Started

```sh
# 1. Clone the repository
git clone https://github.com/ayush-barot/AayushBarot15.git
cd AayushBarot15

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key (client-safe) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project identifier |

All values in `.env.example` are public client-side keys (not the service role key). Copy `.env.example` to `.env` before running.

## Admin Access

The admin dashboard is at `/admin/login`. Access requires:
1. A Supabase Auth account with email/password
2. An `admin` role assigned in the `user_roles` table

To set up admin access, create a user in Supabase Auth, then insert a row into `user_roles`:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user-uuid>', 'admin');
```

## Database Schema

The project uses three Supabase migrations (in `supabase/migrations/`):
- `bookings` — Session booking requests
- `callback_requests` — Lead callback requests
- `user_roles` — Role-based access control with `has_role()` function
- `referrals` — Referral code tracking

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |

## Project Structure

```
├── public/                  # Static assets (favicon, robots.txt)
├── src/
│   ├── components/          # UI components
│   │   ├── ui/              # shadcn/ui primitives
│   │   └── admin/          # Admin-specific components
│   ├── pages/               # Route pages
│   │   ├── admin/           # Admin dashboard pages
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── integrations/        # Supabase client & types
├── supabase/
│   ├── config.toml          # Supabase configuration
│   └── migrations/          # SQL migration files
├── .env.example             # Environment variable template
└── package.json
```

## Deployment

This project is deployed via [Lovable](https://lovable.dev). To publish:
1. Open the project in Lovable
2. Click **Share → Publish**

For custom domains, navigate to **Project > Settings > Domains**.
