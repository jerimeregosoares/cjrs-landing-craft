
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";
import { CarouselMedia } from "@/context/AdminContext";
import HeroImageUpload from "@/components/admin/images/HeroImageUpload";
import CarouselMediaUpload from "@/components/admin/images/CarouselMediaUpload";
import CarouselMediaList from "@/components/admin/images/CarouselMediaList";

const ImageManager = () => {
  const { toast } = useToast();
  const { carouselMedia, addMedia, deleteMedia, reorderMedia } = useAdmin();
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Filter media by type
  const imageMedia = carouselMedia.filter(media => media.file_type === 'image');
  const videoMedia = carouselMedia.filter(media => media.file_type === 'video');
  
  const processFilesSequentially = async (files: File[], fileType: 'image' | 'video') => {
    setUploading(true);
    setUploadProgress(0);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Simulate video duration check (would be done with createObjectURL and video element in a real implementation)
      if (fileType === 'video') {
        // In a real implementation, we would check video duration here
      }
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      
      try {
        // In a real implementation with Supabase, we would upload the file here
        // For now, we'll just add it to our local state
        addMedia({
          file_path: objectUrl,
          file_type: fileType,
          file_name: file.name,
          created_at: new Date(),
          order: carouselMedia.length,
          active: true
        });
        
        // Update progress
        setUploadProgress(Math.round((i + 1) / files.length * 100));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao adicionar mídia",
          description: error instanceof Error ? error.message : "Erro desconhecido"
        });
      }
    }
    
    toast({
      title: "Envio concluído",
      description: `${files.length} ${fileType === 'image' ? 'imagens' : 'vídeos'} adicionados com sucesso ao carrossel.`
    });
    
    setUploading(false);
    setUploadProgress(0);
  };
  
  const handleCarouselImageUpload = (files: File[]) => {
    // Check if we're exceeding the limit of 15 images
    if (imageMedia.length + files.length > 15) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 15 imagens no carrossel. Você já tem ${imageMedia.length} imagens.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'image');
  };
  
  const handleCarouselVideoUpload = (files: File[]) => {
    // Check if we're exceeding the limit of 10 videos
    if (videoMedia.length + files.length > 10) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 10 vídeos no carrossel. Você já tem ${videoMedia.length} vídeos.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'video');
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
        <h1 className="text-3xl font-bold mb-6">Gerenciar Imagens</h1>
        
        <div className="mb-6 space-y-6">
          <h2 className="text-xl font-semibold">Carrossel de Mídia</h2>
          <p className="text-gray-600">
            Gerenciar imagens e vídeos que aparecem no carrossel da página inicial
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload Section */}
            <CarouselMediaUpload 
              type="image"
              count={imageMedia.length}
              maxCount={15}
              onUpload={handleCarouselImageUpload}
              uploading={uploading}
              progress={uploadProgress}
            />
            
            {/* Video Upload Section */}
            <CarouselMediaUpload 
              type="video"
              count={videoMedia.length}
              maxCount={10}
              onUpload={handleCarouselVideoUpload}
              uploading={uploading}
              progress={uploadProgress}
            />
          </div>
          
          {/* Media List */}
          <CarouselMediaList 
            media={carouselMedia} 
            onMove={handleMoveMedia}
            onDelete={handleDeleteMedia}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section Image */}
          <HeroImageUpload 
            title="Imagem Principal (Hero)" 
            description="Esta imagem aparece na seção principal do site. Recomendamos uma imagem de alta qualidade com proporção adequada."
          />
          
          {/* About Section Image */}
          <HeroImageUpload 
            title="Imagem do Profissional" 
            description="Esta imagem aparece na seção 'Sobre o Profissional' do site. Recomendamos usar uma foto profissional."
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-4">
            Nota: Este é um exemplo de interface para gerenciamento de imagens. Para implementar o upload real de imagens, é necessário conectar ao Supabase Storage para armazenamento persistente.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImageManager;
