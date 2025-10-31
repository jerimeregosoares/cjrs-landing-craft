-- Create table for site content
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can view site content (to display the public site)
CREATE POLICY "Anyone can view site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Only authenticated users can manage site content
CREATE POLICY "Authenticated users can manage site content"
  ON public.site_content FOR ALL
  USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at column
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();