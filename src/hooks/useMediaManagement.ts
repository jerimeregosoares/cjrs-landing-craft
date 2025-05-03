
import { useState, useEffect } from 'react';
import { CarouselMedia } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useMediaManagement = (initialMedia: CarouselMedia[] = []) => {
  const [carouselMedia, setCarouselMedia] = useState<CarouselMedia[]>(initialMedia);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch media from Supabase on mount
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel_media')
          .select('*')
          .order('order');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setCarouselMedia(data);
        }
      } catch (error) {
        console.error('Error fetching carousel media:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar mídia",
          description: error instanceof Error ? error.message : "Erro desconhecido"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMedia();
  }, []);

  // Add new media to Supabase
  const addMedia = async (media: Omit<CarouselMedia, 'id'>) => {
    try {
      // Check limits (15 images, 10 videos per section)
      const sectionMedia = carouselMedia.filter(m => m.section === media.section);
      const sectionImages = sectionMedia.filter(m => m.file_type === 'image').length;
      const sectionVideos = sectionMedia.filter(m => m.file_type === 'video').length;
      
      if (media.file_type === 'image' && sectionImages >= 15) {
        throw new Error(`Limite de 15 imagens atingido para ${media.section === 'hero' ? 'carrossel principal' : 'seção sobre'}`);
      }
      
      if (media.file_type === 'video' && sectionVideos >= 10) {
        throw new Error(`Limite de 10 vídeos atingido para ${media.section === 'hero' ? 'carrossel principal' : 'seção sobre'}`);
      }
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('carousel_media')
        .insert(media)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setCarouselMedia(prev => [...prev, data]);
        return data;
      }
      
      throw new Error('Falha ao adicionar mídia');
    } catch (error) {
      console.error('Error adding media:', error);
      throw error;
    }
  };
  
  // Delete media from Supabase
  const deleteMedia = async (id: string) => {
    try {
      // First, find the media to get storage path
      const mediaToDelete = carouselMedia.find(media => media.id === id);
      if (!mediaToDelete) return;
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('carousel_media')
        .delete()
        .eq('id', id);
      
      if (dbError) {
        throw dbError;
      }
      
      // Delete from storage
      const bucketId = mediaToDelete.file_type === 'image' ? 'carousel-images' : 'carousel-videos';
      const { error: storageError } = await supabase
        .storage
        .from(bucketId)
        .remove([mediaToDelete.storage_path]);
      
      if (storageError) {
        console.error('Error removing file from storage:', storageError);
        // Continue even if storage deletion fails
      }
      
      // Update state
      setCarouselMedia(prev => prev.filter(media => media.id !== id));
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  };
  
  // Reorder media in Supabase
  const reorderMedia = async (id: string, newOrder: number) => {
    try {
      const mediaToMove = carouselMedia.find(media => media.id === id);
      if (!mediaToMove) return;
      
      const updatedMedia = carouselMedia.filter(media => media.id !== id);
      const newMedia = [...updatedMedia.slice(0, newOrder), mediaToMove, ...updatedMedia.slice(newOrder)];
      
      const orderedMedia = newMedia.map((media, index) => ({
        ...media,
        order: index
      }));
      
      // Update all media items with new order
      const updates = orderedMedia.map(media => ({
        id: media.id,
        order: media.order
      }));
      
      const { error } = await supabase
        .from('carousel_media')
        .upsert(updates);
      
      if (error) {
        throw error;
      }
      
      setCarouselMedia(orderedMedia);
    } catch (error) {
      console.error('Error reordering media:', error);
      throw error;
    }
  };

  return {
    carouselMedia,
    setCarouselMedia,
    addMedia,
    deleteMedia,
    reorderMedia,
    loading
  };
};
