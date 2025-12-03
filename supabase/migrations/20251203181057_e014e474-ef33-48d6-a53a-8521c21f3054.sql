-- Drop all existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view site content" ON site_content;
DROP POLICY IF EXISTS "Anyone can insert site content" ON site_content;
DROP POLICY IF EXISTS "Anyone can update site content" ON site_content;
DROP POLICY IF EXISTS "Anyone can delete site content" ON site_content;

-- Create PERMISSIVE policies (not restrictive)
CREATE POLICY "Public can read site content" 
ON site_content 
FOR SELECT 
TO public
USING (true);

CREATE POLICY "Public can insert site content" 
ON site_content 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Public can update site content" 
ON site_content 
FOR UPDATE 
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Public can delete site content" 
ON site_content 
FOR DELETE 
TO public
USING (true);