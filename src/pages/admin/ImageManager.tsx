
import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image, Video, Upload, Trash, Move } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { CarouselMedia } from "@/context/AdminContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const ImageManager = () => {
  const { toast } = useToast();
  const { carouselMedia, addMedia, deleteMedia, reorderMedia } = useAdmin();
  
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [aboutImage, setAboutImage] = useState<File | null>(null);
  const [aboutPreview, setAboutPreview] = useState<string | null>(null);
  const [carouselFiles, setCarouselFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // Filter media by type
  const imageMedia = carouselMedia.filter(media => media.file_type === 'image');
  const videoMedia = carouselMedia.filter(media => media.file_type === 'video');
  
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setHeroImage(null);
      setHeroPreview(null);
      return;
    }
    
    const file = e.target.files[0];
    setHeroImage(file);
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setHeroPreview(objectUrl);
  };
  
  const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAboutImage(null);
      setAboutPreview(null);
      return;
    }
    
    const file = e.target.files[0];
    setAboutImage(file);
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setAboutPreview(objectUrl);
  };
  
  const handleUploadHero = () => {
    if (!heroImage) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione uma imagem para carregar."
      });
      return;
    }
    
    // In a real implementation, we would upload to server/Supabase here
    toast({
      title: "Imagem enviada",
      description: "A imagem do hero foi enviada com sucesso. Este é apenas um exemplo, a imagem não será atualizada no site sem integração com um servidor."
    });
  };
  
  const handleUploadAbout = () => {
    if (!aboutImage) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione uma imagem para carregar."
      });
      return;
    }
    
    // In a real implementation, we would upload to server/Supabase here
    toast({
      title: "Imagem enviada",
      description: "A imagem do sobre foi enviada com sucesso. Este é apenas um exemplo, a imagem não será atualizada no site sem integração com um servidor."
    });
  };
  
  const handleCarouselImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Convert FileList to array and filter for supported formats (png, jpeg)
    const files = Array.from(e.target.files).filter(file => 
      file.type === 'image/png' || 
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    );
    
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
  
  const handleCarouselVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Convert FileList to array and filter for mp4
    const files = Array.from(e.target.files).filter(file => 
      file.type === 'video/mp4'
    );
    
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
    
    // Reset file inputs
    if (fileType === 'image' && imageInputRef.current) {
      imageInputRef.current.value = '';
    } else if (fileType === 'video' && videoInputRef.current) {
      videoInputRef.current.value = '';
    }
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Carrossel de Mídia</CardTitle>
            <CardDescription>
              Gerenciar imagens e vídeos que aparecem no carrossel da página inicial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Imagens do Carrossel</CardTitle>
                    <CardDescription>
                      Adicione até 15 imagens (PNG, JPEG)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          ref={imageInputRef}
                          type="file"
                          id="carousel-images"
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                          onChange={handleCarouselImageUpload}
                          className="sr-only"
                        />
                        <label
                          htmlFor="carousel-images"
                          className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium flex items-center"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Escolher imagens
                        </label>
                        <span className="ml-3 text-sm text-gray-500">
                          {imageMedia.length}/15 imagens
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Video Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vídeos do Carrossel</CardTitle>
                    <CardDescription>
                      Adicione até 10 vídeos (MP4, máx. 10 segundos)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          ref={videoInputRef}
                          type="file"
                          id="carousel-videos"
                          accept="video/mp4"
                          multiple
                          onChange={handleCarouselVideoUpload}
                          className="sr-only"
                        />
                        <label
                          htmlFor="carousel-videos"
                          className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium flex items-center"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Escolher vídeos
                        </label>
                        <span className="ml-3 text-sm text-gray-500">
                          {videoMedia.length}/10 vídeos
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {uploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-center text-sm text-gray-500">Enviando... {uploadProgress}%</p>
                </div>
              )}
              
              {/* Media List */}
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Mídias do Carrossel ({carouselMedia.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {carouselMedia.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Nenhuma mídia adicionada ao carrossel. Adicione imagens ou vídeos acima.
                    </p>
                  ) : (
                    <ScrollArea className="h-[400px] md:h-[500px]">
                      <div className="space-y-2">
                        {carouselMedia.map((media, index) => (
                          <div key={media.id} className="flex items-center space-x-4 p-2 border rounded-md">
                            <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                              {media.file_type === 'image' ? (
                                <img 
                                  src={media.file_path} 
                                  alt={media.file_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video 
                                  src={media.file_path}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="text-sm font-medium truncate">{media.file_name}</p>
                              <p className="text-xs text-gray-500">
                                {media.file_type === 'image' ? 'Imagem' : 'Vídeo'} • 
                                Ordem: {media.order + 1} •
                                {new Date(media.created_at).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={index === 0}
                                onClick={() => handleMoveMedia(media.id, 'up')}
                                title="Mover para cima"
                              >
                                <Move className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={index === carouselMedia.length - 1}
                                onClick={() => handleMoveMedia(media.id, 'down')}
                                title="Mover para baixo"
                              >
                                <Move className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteMedia(media.id, media.file_type)}
                                title="Remover"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section Image */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem Principal (Hero)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/20">
                  <div className="flex items-center justify-center mb-4">
                    {heroPreview ? (
                      <img 
                        src={heroPreview} 
                        alt="Hero preview" 
                        className="max-h-64 object-cover rounded-md" 
                      />
                    ) : (
                      <div className="h-64 w-full flex items-center justify-center bg-muted/10 rounded-md">
                        <Image className="h-16 w-16 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="hero-image"
                        accept="image/*"
                        onChange={handleHeroImageChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="hero-image"
                        className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium"
                      >
                        Escolher imagem
                      </label>
                      {heroImage && (
                        <span className="ml-3 text-sm text-gray-500">
                          {heroImage.name} ({Math.round(heroImage.size / 1024)} KB)
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleUploadHero}
                      disabled={!heroImage}
                      className="w-full md:w-auto"
                    >
                      Enviar imagem
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Esta imagem aparece na seção principal do site. Recomendamos uma imagem de alta qualidade com proporção adequada.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* About Section Image */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem do Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/20">
                  <div className="flex items-center justify-center mb-4">
                    {aboutPreview ? (
                      <img 
                        src={aboutPreview} 
                        alt="About preview" 
                        className="max-h-64 object-cover rounded-md" 
                      />
                    ) : (
                      <div className="h-64 w-full flex items-center justify-center bg-muted/10 rounded-md">
                        <Image className="h-16 w-16 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="about-image"
                        accept="image/*"
                        onChange={handleAboutImageChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="about-image"
                        className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium"
                      >
                        Escolher imagem
                      </label>
                      {aboutImage && (
                        <span className="ml-3 text-sm text-gray-500">
                          {aboutImage.name} ({Math.round(aboutImage.size / 1024)} KB)
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleUploadAbout}
                      disabled={!aboutImage}
                      className="w-full md:w-auto"
                    >
                      Enviar imagem
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Esta imagem aparece na seção "Sobre o Profissional" do site. Recomendamos usar uma foto profissional.</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
