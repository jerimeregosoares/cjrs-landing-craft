
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";
import MediaSection from "@/components/admin/images/MediaSection";
import HeroSectionImage from "@/components/admin/images/HeroSectionImage";
import useMediaUploadHandler from "@/components/admin/images/MediaUploadHandler";

const ImageManager = () => {
  const { toast } = useToast();
  const { carouselMedia, deleteMedia, reorderMedia, loading } = useAdmin();
  const { uploading, uploadProgress, handleCarouselImageUpload, handleCarouselVideoUpload } = useMediaUploadHandler();
  
  // Filter media by section
  const heroMedia = carouselMedia.filter(media => media.section === 'hero' || !media.section);
  const aboutMedia = carouselMedia.filter(media => media.section === 'about');
  
  const heroImages = heroMedia.filter(media => media.file_type === 'image');
  const heroVideos = heroMedia.filter(media => media.file_type === 'video');
  const aboutImages = aboutMedia.filter(media => media.file_type === 'image');
  const aboutVideos = aboutMedia.filter(media => media.file_type === 'video');
  
  const handleDeleteMedia = (id: string, type: string) => {
    deleteMedia(id);
    toast({
      title: "Mídia excluída",
      description: `${type === 'image' ? 'Imagem' : 'Vídeo'} removido do carrossel.`
    });
  };
  
  const handleMoveMedia = (id: string, direction: 'up' | 'down') => {
    const mediaIndex = carouselMedia.findIndex(m => m.id === id);
    if (mediaIndex === -1) return;
    
    const newIndex = direction === 'up' 
      ? Math.max(0, mediaIndex - 1) 
      : Math.min(carouselMedia.length - 1, mediaIndex + 1);
      
    if (newIndex !== mediaIndex) {
      reorderMedia(id, newIndex);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Imagens e Vídeos</h1>
        
        {/* Hero Section Media */}
        <MediaSection 
          title="Carrossel Principal (Hero)"
          description="Gerenciar imagens e vídeos que aparecem no carrossel da seção principal da página inicial"
          section="hero"
          media={heroMedia}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onImageUpload={(files, section) => handleCarouselImageUpload(files, section, heroImages.length)}
          onVideoUpload={(files, section) => handleCarouselVideoUpload(files, section, heroVideos.length)}
          onDeleteMedia={handleDeleteMedia}
          onMoveMedia={handleMoveMedia}
          loading={loading}
        />
        
        {/* About Section Media */}
        <MediaSection 
          title="Carrossel da Seção &quot;Sobre o Profissional&quot;"
          description="Gerenciar imagens e vídeos que aparecem no carrossel da seção &quot;Sobre o Profissional&quot;"
          section="about"
          media={aboutMedia}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onImageUpload={(files, section) => handleCarouselImageUpload(files, section, aboutImages.length)}
          onVideoUpload={(files, section) => handleCarouselVideoUpload(files, section, aboutVideos.length)}
          onDeleteMedia={handleDeleteMedia}
          onMoveMedia={handleMoveMedia}
          loading={loading}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section Feature Image */}
          <HeroSectionImage 
            title="Imagem Principal (Hero)" 
            description="Esta imagem será mostrada diretamente na seção principal do site. Recomendamos uma imagem ou vídeo de alta qualidade."
            section="hero"
          />
          
          {/* About Section Feature Image */}
          <HeroSectionImage 
            title="Imagem do Profissional" 
            description="Esta imagem será mostrada diretamente na seção 'Sobre o Profissional' do site. Recomendamos usar uma foto ou vídeo profissional."
            section="about"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImageManager;
