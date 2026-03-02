
# Personal Trainer Booking Website — Ahmedabad

## Overview
A premium, dark-themed personal trainer booking website with full backend (Lovable Cloud) for a certified trainer in Ahmedabad. Mobile-first, conversion-optimized design with neon accents.

---

## Pages

### 1. Homepage (Single-Page with Sections)
- **Hero Section**: Bold headline "Transform Your Body with Certified Personal Trainer in Ahmedabad", dark background with neon green/yellow accents, two CTAs: "Book Free Trial" and "Talk to Trainer", animated entrance
- **About Trainer**: Certification badge, years of experience, photo placeholder, brief bio
- **Services**: Cards for Weight Loss, Muscle Gain, Fat Loss, Strength Training, Couple Fitness, Ladies Special Training — each with icon and short description
- **Pricing Section**: 3 plan cards (Basic ₹8,000–₹10,000, Premium ₹15,000, Couple ₹20,000) with feature lists and CTA buttons. Free trial badge for Ladies & Couples
- **Free Trial CTA Section**: Highlighted section with eligibility info and booking button
- **Testimonials**: Carousel with client quotes and transformation placeholders
- **FAQ Section**: Accordion with common questions
- **Pre-Booking Contact**: "Not Sure Yet?" section with Call button, WhatsApp button, and Request Callback form
- **Conversion elements throughout**: "Limited 10 Clients per Area" scarcity badge, countdown timer for limited slots, certified trainer badge

### 2. Booking Page / Modal
- Form fields: Full Name, Mobile Number, Gender, Area dropdown (Satellite, Prahladnagar, Bodakdev, etc.), Preferred Date & Time, Plan selection, Free Trial eligibility checkbox, Notes
- Area restricted to Ahmedabad — shows message for non-Ahmedabad users
- Stores booking in Supabase database with area info
- Success confirmation screen after submission

### 3. Admin Dashboard (Protected Route)
- Trainer login with email/password auth
- **Dashboard cards**: Total bookings, upcoming sessions, free trial requests, estimated revenue
- **Bookings by area chart** (bar/pie chart using Recharts)
- **Bookings table**: Searchable, filterable list of all bookings with client details
- **Export to CSV** button
- Client database view

---

## Backend (Lovable Cloud)

### Database Tables
- **bookings**: id, full_name, mobile, gender, area, preferred_date, preferred_time, plan, is_free_trial, notes, status, created_at
- **user_roles**: For admin access control

### Auth
- Email/password login for the trainer (admin)
- RLS policies: Admin can read all bookings, public can insert bookings

---

## Design System
- **Dark theme** as default with deep blacks/grays
- **Neon accent color** (electric green or vibrant yellow-green)
- Strong typography, large headings
- Smooth scroll animations
- Mobile-first responsive layout
- Trust-building visual elements (badges, social proof)

---

## Smart Features
- Exit-intent lead capture popup
- Sticky mobile CTA bar
- SEO meta tags for "Personal Trainer in Ahmedabad" keywords
- Smooth scroll navigation
