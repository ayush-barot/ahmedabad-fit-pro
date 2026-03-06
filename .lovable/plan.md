

# Project Status & Remaining Work

## What's Already Built (Complete)
- Full homepage with all sections (Hero, About, Services, Pricing, Testimonials, FAQ, Contact, Booking)
- Booking form saving to database
- Callback request form saving to database
- Admin login with role-based security (RLS + has_role)
- Admin dashboard with analytics charts (Recharts), KPI cards, revenue estimate
- Bookings management with search, filter, status update, CSV export
- Callback requests management with status tracking
- Mobile sticky CTA bar, scarcity badge
- Dark theme with neon accents, animations (Framer Motion)
- SEO meta tags and JSON-LD structured data

## What's Still Remaining

### 1. Phone Number — Placeholder Still Active
All contact buttons use `+91 98765 43210`. Need your real number to update in:
- ContactSection (Call + WhatsApp buttons)
- Footer
- StickyCTA

### 2. Exit-Intent Popup (Lead Capture)
When visitor moves mouse to close/leave tab, show a popup: "Wait! Get a Free Consultation Before You Go" with name + phone fields, saving to `callback_requests`.

### 3. Countdown Timer (Urgency)
Add a countdown timer in hero/scarcity section showing "Limited slots closing in X hours" to drive conversions.

### 4. Admin Account Setup
You need to create your trainer admin account. I'll need your email and password to sign up and assign the admin role in `user_roles`.

### 5. Real Content (Images & Text)
- Trainer photo for About section
- Client transformation photos
- Real testimonials with names
- Actual certification details

---

## Implementation Plan

I'll build items 2 and 3 right now (exit-intent popup + countdown timer), and ask for your phone number and admin credentials to complete items 1 and 4.

### Changes:
1. **Create `ExitIntentPopup.tsx`** — Detects `mouseleave` on document, shows a glass-styled dialog with name/phone form, saves to `callback_requests`, uses localStorage to show only once per session
2. **Create `CountdownTimer.tsx`** — Displays a live countdown timer (resets daily at midnight) with hours/minutes/seconds in neon-styled boxes, placed below the ScarcityBadge
3. **Add both components to `Index.tsx`**
4. **Ask for phone number** to update all placeholder contacts

