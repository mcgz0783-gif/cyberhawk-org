
-- Fix search_path on update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix permissive INSERT policy on purchases: restrict to authenticated users inserting their own
DROP POLICY "Service can insert purchases" ON public.purchases;

CREATE POLICY "Users can insert own purchases" ON public.purchases
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
