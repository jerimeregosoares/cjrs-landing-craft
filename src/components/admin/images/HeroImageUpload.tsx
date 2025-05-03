
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/context/AdminContext";

interface HeroImageUploadProps {
  title: string;
  description: string;
  section: 'hero' | 'about';
}

const HeroImageUpload = ({ title, description, section }: HeroImageUploadProps) => {
  const { toast } = useToast();
  const { addMedia } = useAdmin();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setPreview(null);
      return;
    }
    
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.type.startsWith('video/') ? 'video' : 'image';
    setMediaType(fileType);
    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um arquivo para carregar."
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // Determine storage bucket based on media type
      const bucketId = mediaType === 'image' ? 'carousel-images' : 'carousel-videos';
      
      // Create a unique filename
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${section}_${timestamp}.${fileExt}`;
      const storagePath = `${section}/${fileName}`;
      
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
        
      // Add media record
      await addMedia({
        file_path: publicUrl,
        file_type: mediaType,
        file_name: fileName,
        storage_path: storagePath,
        created_at: new Date(),
        order: 0, // Will be first in the section
        active: true,
        section: section // Identify where this media should be displayed
      });
      
      toast({
        title: `${mediaType === 'image' ? 'Imagem' : 'Vídeo'} enviado`,
        description: `O arquivo foi carregado com sucesso para a seção "${section === 'hero' ? 'Principal' : 'Sobre'}".`
      });
      
      // Clear form after successful upload
      setFile(null);
      setPreview(null);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no upload",
        description: error instanceof Error ? error.message : "Erro desconhecido"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-muted/20">
            <div className="flex items-center justify-center mb-4">
              {preview ? (
                mediaType === 'image' ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 object-cover rounded-md" 
                  />
                ) : (
                  <video 
                    src={preview} 
                    controls 
                    className="max-h-64 object-cover rounded-md"
                  />
                )
              ) : (
                <div className="h-64 w-full flex items-center justify-center bg-muted/10 rounded-md">
                  <div className="flex flex-col items-center">
                    <Image className="h-12 w-12 text-muted-foreground/40 mb-2" />
                    <Video className="h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-2 text-muted-foreground">Imagem ou Vídeo</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input
                  type="file"
                  id={`upload-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  accept="image/*,video/mp4"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <label
                  htmlFor={`upload-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium"
                >
                  Escolher arquivo
                </label>
                {file && (
                  <span className="ml-3 text-sm text-gray-500">
                    {file.name} ({Math.round(file.size / 1024)} KB) - {mediaType === 'image' ? 'Imagem' : 'Vídeo'}
                  </span>
                )}
              </div>
              
              <Button 
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full md:w-auto"
              >
                {uploading ? "Enviando..." : "Enviar arquivo"}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroImageUpload;
