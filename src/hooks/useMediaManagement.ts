
import { useState } from 'react';
import { CarouselMedia } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export const useMediaManagement = (initialMedia: CarouselMedia[] = []) => {
  // These functions handle carousel media operations
  const [carouselMedia, setCarouselMedia] = useState<CarouselMedia[]>(initialMedia);
  const [loading, setLoading] = useState(false);
  
  // Fetch all carousel media from Supabase
  const fetchCarouselMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('carousel_media')
        .select('*')
        .order('order', { ascending: true });
        
      if (error) {
        console.error('Error fetching carousel media:', error);
        throw error;
      }
      
      if (data) {
        // Ensure the data is properly typed
        const typedData: CarouselMedia[] = data.map(item => ({
          ...item,
          file_type: item.file_type as 'image' | 'video',
          created_at: new Date(item.created_at || Date.now()),
          section: item.section as 'hero' | 'about' | undefined
        }));
        
        setCarouselMedia(typedData);
      }
    } catch (error) {
      console.error('Error fetching carousel media:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Add new carousel media to Supabase
  const addMedia = async (media: Omit<CarouselMedia, 'id'>) => {
    setLoading(true);
    try {
      // Check if we reached the limit for this type
      const existingByType = carouselMedia.filter(
        item => 
          item.file_type === media.file_type && 
          item.active &&
          ((!media.section && !item.section) || (media.section === item.section))
      );
      
      if (media.file_type === 'image' && existingByType.length >= 10) {
        throw new Error(`Limite de 10 imagens atingido para ${media.section === 'hero' ? 'carrossel principal' : 'seção sobre'}`);
      }
      
      if (media.file_type === 'video' && existingByType.length >= 3) {
        throw new Error(`Limite de 10 vídeos atingido para ${media.section === 'hero' ? 'carrossel principal' : 'seção sobre'}`);
      }
      
      // Format the data for Supabase
      const mediaToInsert = {
        ...media,
        created_at: media.created_at.toISOString(),
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('carousel_media')
        .insert(mediaToInsert)
        .select()
        .single();
        
      if (error) {
        console.error('Error adding carousel media:', error);
        throw error;
      }
      
      if (data) {
        // Convert the response to match our type
        const newMedia: CarouselMedia = {
          ...data,
          file_type: data.file_type as 'image' | 'video',
          created_at: new Date(data.created_at || Date.now()),
          section: data.section as 'hero' | 'about' | undefined
        };
        
        setCarouselMedia(prev => [...prev, newMedia]);
        return newMedia;
      }
      
      throw new Error('Falha ao adicionar mídia');
    } catch (error) {
      console.error('Error adding carousel media:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete carousel media from Supabase
  const deleteMedia = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('carousel_media')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting carousel media:', error);
        throw error;
      }
      
      setCarouselMedia(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting carousel media:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update the order of carousel media
  const reorderMedia = async (id: string, newIndex: number) => {
    setLoading(true);
    try {
      // Find the current item
      const currentIndex = carouselMedia.findIndex(item => item.id === id);
      if (currentIndex === -1) {
        throw new Error('Mídia não encontrada');
      }
      
      // Create new array with reordered items
      const newOrder = [...carouselMedia];
      const [movedItem] = newOrder.splice(currentIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);
      
      // Update all items with new order indices
      const updatedMedia = newOrder.map((media, index) => ({
        ...media,
        order: index
      }));
      
      // Update local state
      setCarouselMedia(updatedMedia);
      
      // Prepare updates for each item
      for (const media of updatedMedia) {
        const { error } = await supabase
          .from('carousel_media')
          .update({ order: media.order })
          .eq('id', media.id);
          
        if (error) {
          console.error('Error updating carousel media order:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error reordering carousel media:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    carouselMedia,
    loading,
    fetchCarouselMedia,
    addMedia,
    deleteMedia,
    reorderMedia
  };
};
