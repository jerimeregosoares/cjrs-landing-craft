
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";
import { supabase } from "@/integrations/supabase/client";

const useMediaUploadHandler = () => {
  const { toast } = useToast();
  const { addMedia } = useAdmin();
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
          order: 0, // Will be calculated in addMedia function
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

  const handleCarouselImageUpload = (files: File[], section: 'hero' | 'about', imageCount: number) => {
    // Check if we're exceeding the limit of 15 images
    if (imageCount + files.length > 15) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 15 imagens no ${section === 'hero' ? 'carrossel principal' : 'carrossel da seção sobre'}. Você já tem ${imageCount} imagens.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'image', section);
  };
  
  const handleCarouselVideoUpload = (files: File[], section: 'hero' | 'about', videoCount: number) => {
    // Check if we're exceeding the limit of 10 videos
    if (videoCount + files.length > 10) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: `Você só pode ter 10 vídeos no ${section === 'hero' ? 'carrossel principal' : 'carrossel da seção sobre'}. Você já tem ${videoCount} vídeos.`
      });
      return;
    }
    
    // Process each file
    processFilesSequentially(files, 'video', section);
  };

  return {
    uploading,
    uploadProgress,
    handleCarouselImageUpload,
    handleCarouselVideoUpload
  };
};

export default useMediaUploadHandler;
