
import { useState } from 'react';
import { CarouselMedia } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export const useMediaManagement = () => {
  // These functions handle carousel media operations
  const [carouselMedia, setCarouselMedia] = useState<CarouselMedia[]>([]);
  
  // Fetch all carousel media from Supabase
  const fetchCarouselMedia = async () => {
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
    }
  };
  
  // Add new carousel media to Supabase
  const addCarouselMedia = async (media: Omit<CarouselMedia, 'id'>) => {
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
    }
  };
  
  // Delete carousel media from Supabase
  const deleteCarouselMedia = async (id: string) => {
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
    }
  };
  
  // Update the order of carousel media
  const updateCarouselMediaOrder = async (id: string, direction: 'up' | 'down') => {
    try {
      // Find the current item and its order
      const currentItem = carouselMedia.find(item => item.id === id);
      if (!currentItem) {
        throw new Error('Mídia não encontrada');
      }
      
      // Find the item to swap with
      const swapWithIndex = direction === 'up' 
        ? carouselMedia.findIndex(item => item.order === currentItem.order - 1)
        : carouselMedia.findIndex(item => item.order === currentItem.order + 1);
        
      if (swapWithIndex === -1) {
        console.warn('Nenhum item para trocar');
        return;
      }
      
      // Swap the orders
      const newOrder = [...carouselMedia];
      const temp = newOrder[swapWithIndex].order;
      newOrder[swapWithIndex].order = currentItem.order;
      newOrder[carouselMedia.findIndex(item => item.id === id)].order = temp;
      
      // Update the state
      setCarouselMedia(newOrder);
      
      // Prepare updates for Supabase
      const orderedMedia = [...newOrder].sort((a, b) => a.order - b.order);
      
      // Update all media items with new order
      const updates = orderedMedia.map(media => ({
        id: media.id,
        order: media.order
      }));
      
      const { error } = await supabase
        .from('carousel_media')
        .upsert(updates);
        
      if (error) {
        console.error('Error updating carousel media order:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating carousel media order:', error);
      throw error;
    }
  };

  return {
    carouselMedia,
    fetchCarouselMedia,
    addCarouselMedia,
    deleteCarouselMedia,
    updateCarouselMediaOrder
  };
};
