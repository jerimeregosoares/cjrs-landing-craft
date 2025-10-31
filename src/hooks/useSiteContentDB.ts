import { supabase } from '@/integrations/supabase/client';
import { SiteContent } from '@/types/admin';

export const useSiteContentDB = () => {
  // Load content from database
  const loadContent = async (): Promise<SiteContent | null> => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('content_key', 'main')
        .maybeSingle();
      
      if (error) {
        console.error('Erro ao carregar conteúdo do banco:', error);
        return null;
      }
      
      return data?.data as unknown as SiteContent;
    } catch (error) {
      console.error('Erro inesperado ao carregar conteúdo:', error);
      return null;
    }
  };

  // Save content to database
  const saveContent = async (content: SiteContent): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          content_key: 'main',
          data: content as any,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'content_key'
        });
      
      if (error) {
        console.error('Erro ao salvar conteúdo no banco:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro inesperado ao salvar conteúdo:', error);
      return false;
    }
  };

  return { loadContent, saveContent };
};
