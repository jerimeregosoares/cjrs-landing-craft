
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import CarouselMediaUpload from "@/components/admin/images/CarouselMediaUpload";
import CarouselMediaList from "@/components/admin/images/CarouselMediaList";
import HeroImageUpload from "@/components/admin/images/HeroImageUpload";

const ImageManager = () => {
  const { toast } = useToast();
  const { carouselMedia, addMedia, deleteMedia, reorderMedia, loading } = useAdmin();
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Filter media by type and section
  const heroMedia = carouselMedia.filter(media => media.section === 'hero' || !media.section);
  const aboutMedia = carouselMedia.filter(media => media.section === 'about');
  
  const heroImages = heroMedia.filter(media => media.file_type === 'image');
  const heroVideos = heroMedia.filter(media => media.file_type === 'video');
  const aboutImages = aboutMedia.filter(media => media.file_type === 'image');
  const aboutVideos = aboutMedia.filter(media => media.file_type === 'video');
  
  const processFilesSequentially = async (files: File[], fileType: 'image' | 'video', section: 'hero' | 'about') => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create unique filename
        const timestamp = new Date().getTime();
        const fileExt = file.name.split('.').pop();
        const fileName = `${section}_${timestamp}.${fileExt}`;
        const storagePath = `${section}/${fileName}`;
        
        // Determine bucket based on file type
        const bucketId = fileType === 'image' ? 'carousel-images' : 'carousel-videos';
        
        // Upload to Supabase Storage
        const { error: uploadError, data } = await supabase.storage
          .from(bucketId)
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: true
          });
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucketId)
          .getPublicUrl(storagePath);
        
        // Add media record to database
        await addMedia({
          file_path: publicUrl,
          file_type: fileType,
          file_name: fileName,
          storage_path: storagePath,
          created_at: new Date(),
          order: section === 'hero' ? heroMedia.length : aboutMedia.length,
          active: true,
          section: section
        });
        
        // Update progress
        setUploadProgress(Math.round((i + 1) / files.length * 100));
      }
      
      toast({
        title: "Envio concluído",
        description: `${files.length} ${fileType === 'image' ? 'imagens' : 'vídeos'} adicionados com sucesso ao ${section === 'hero' ? 'carrossel principal' : 'carrossel da seção sobre'}.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar mídia",
        description: error instanceof Error ? error.message : "Erro desconhecido"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  const handleCarouselImageUpload = (files: File[], section: 'hero' | 'about') => {
    // Check if we're exceeding the limit of 15 images
    const currentImages = section === 'hero' ? heroImages.length : aboutImages.length;
    if (currentImages + files.length > 15) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 15 imagens no ${section === 'hero' ? 'carrossel principal' : 'carrossel da seção sobre'}. Você já tem ${currentImages} imagens.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'image', section);
  };
  
  const handleCarouselVideoUpload = (files: File[], section: 'hero' | 'about') => {
    // Check if we're exceeding the limit of 10 videos
    const currentVideos = section === 'hero' ? heroVideos.length : aboutVideos.length;
    if (currentVideos + files.length > 10) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 10 vídeos no ${section === 'hero' ? 'carrossel principal' : 'carrossel da seção sobre'}. Você já tem ${currentVideos} vídeos.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'video', section);
  };
  
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
        
        <div className="mb-6 space-y-6">
          <h2 className="text-xl font-semibold">Carrossel Principal (Hero)</h2>
          <p className="text-gray-600">
            Gerenciar imagens e vídeos que aparecem no carrossel da seção principal da página inicial
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Media Upload */}
            <CarouselMediaUpload 
              type="image"
              count={heroImages.length}
              maxCount={15}
              onUpload={(files) => handleCarouselImageUpload(files, 'hero')}
              uploading={uploading}
              progress={uploadProgress}
              title="Imagens do Carrossel Principal"
            />
            
            <CarouselMediaUpload 
              type="video"
              count={heroVideos.length}
              maxCount={10}
              onUpload={(files) => handleCarouselVideoUpload(files, 'hero')}
              uploading={uploading}
              progress={uploadProgress}
              title="Vídeos do Carrossel Principal"
            />
          </div>
          
          <h2 className="text-xl font-semibold mt-8">Carrossel da Seção "Sobre o Profissional"</h2>
          <p className="text-gray-600">
            Gerenciar imagens e vídeos que aparecem no carrossel da seção "Sobre o Profissional"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Media Upload */}
            <CarouselMediaUpload 
              type="image"
              count={aboutImages.length}
              maxCount={15}
              onUpload={(files) => handleCarouselImageUpload(files, 'about')}
              uploading={uploading}
              progress={uploadProgress}
              title="Imagens da Seção Sobre"
            />
            
            <CarouselMediaUpload 
              type="video"
              count={aboutVideos.length}
              maxCount={10}
              onUpload={(files) => handleCarouselVideoUpload(files, 'about')}
              uploading={uploading}
              progress={uploadProgress}
              title="Vídeos da Seção Sobre"
            />
          </div>
          
          {/* Hero Media List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Mídia da Seção Principal</h3>
            <CarouselMediaList 
              media={heroMedia} 
              onMove={handleMoveMedia}
              onDelete={handleDeleteMedia}
              loading={loading}
            />
          </div>
          
          {/* About Media List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Mídia da Seção "Sobre o Profissional"</h3>
            <CarouselMediaList 
              media={aboutMedia} 
              onMove={handleMoveMedia}
              onDelete={handleDeleteMedia}
              loading={loading}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section Image */}
          <HeroImageUpload 
            title="Imagem Principal (Hero)" 
            description="Esta imagem será mostrada diretamente na seção principal do site. Recomendamos uma imagem ou vídeo de alta qualidade."
            section="hero"
          />
          
          {/* About Section Image */}
          <HeroImageUpload 
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
