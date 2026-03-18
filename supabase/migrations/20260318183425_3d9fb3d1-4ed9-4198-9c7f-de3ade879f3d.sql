CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_name TEXT NOT NULL,
  referrer_phone TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_name TEXT,
  referred_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on referrals" ON public.referrals
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow admin select on referrals" ON public.referrals
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));