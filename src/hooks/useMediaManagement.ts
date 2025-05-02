
import { useState } from 'react';
import { CarouselMedia } from '@/types/admin';

export const useMediaManagement = (initialMedia: CarouselMedia[] = []) => {
  const [carouselMedia, setCarouselMedia] = useState<CarouselMedia[]>(initialMedia);

  // Media management functions
  const addMedia = (media: Omit<CarouselMedia, 'id'>) => {
    const newMedia = {
      ...media,
      id: Date.now().toString(),
    };
    
    // Check limits (15 images, 10 videos)
    const existingImages = carouselMedia.filter(m => m.file_type === 'image').length;
    const existingVideos = carouselMedia.filter(m => m.file_type === 'video').length;
    
    if (media.file_type === 'image' && existingImages >= 15) {
      throw new Error('Limite de 15 imagens atingido');
    }
    
    if (media.file_type === 'video' && existingVideos >= 10) {
      throw new Error('Limite de 10 vídeos atingido');
    }
    
    setCarouselMedia(prev => [...prev, newMedia]);
    return newMedia;
  };
  
  const deleteMedia = (id: string) => {
    setCarouselMedia(prev => prev.filter(media => media.id !== id));
  };
  
  const reorderMedia = (id: string, newOrder: number) => {
    const mediaToMove = carouselMedia.find(media => media.id === id);
    if (!mediaToMove) return;
    
    const updatedMedia = carouselMedia.filter(media => media.id !== id);
    const newMedia = [...updatedMedia.slice(0, newOrder), mediaToMove, ...updatedMedia.slice(newOrder)];
    
    setCarouselMedia(newMedia.map((media, index) => ({
      ...media,
      order: index
    })));
  };

  return {
    carouselMedia,
    setCarouselMedia,
    addMedia,
    deleteMedia,
    reorderMedia
  };
};
