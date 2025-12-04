-- Create RLS policy to allow public read access to carousel_media
CREATE POLICY "Allow public read access to carousel_media" 
ON public.carousel_media 
FOR SELECT 
USING (true);

-- Create policy to allow all operations (for admin to manage media)
CREATE POLICY "Allow all operations on carousel_media" 
ON public.carousel_media 
FOR ALL 
USING (true)
WITH CHECK (true);