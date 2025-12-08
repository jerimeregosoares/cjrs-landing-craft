-- 1. Fix admin_users table: Restrict access to admins only (or consider dropping this legacy table)
DROP POLICY IF EXISTS "Admin users can view all admin data" ON admin_users;

CREATE POLICY "Only admins can access admin_users"
ON admin_users FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 2. Fix testimonials table: Add moderation workflow
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS status text DEFAULT 'approved';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS approved_by uuid;

-- 3. Clean up duplicate and overly permissive testimonials policies
DROP POLICY IF EXISTS "Anyone can add testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated can manage all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Only authenticated users can delete testimonials" ON testimonials;
DROP POLICY IF EXISTS "Only authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Testimonials are viewable by everyone" ON testimonials;

-- 4. Create proper testimonials policies
-- Public can only see approved testimonials
CREATE POLICY "Public sees approved testimonials"
ON testimonials FOR SELECT
TO public
USING (status = 'approved');

-- Public can submit testimonials (will need admin approval for new ones)
CREATE POLICY "Public can submit testimonials"
ON testimonials FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can update/delete testimonials
CREATE POLICY "Admins can manage all testimonials"
ON testimonials FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));