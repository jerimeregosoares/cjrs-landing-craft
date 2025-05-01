
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

const ImageManager = () => {
  const { toast } = useToast();
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [aboutImage, setAboutImage] = useState<File | null>(null);
  const [aboutPreview, setAboutPreview] = useState<string | null>(null);
  
  // In a real implementation, we would upload these to a server or Supabase storage
  // For now, we'll just create ObjectURLs and provide feedback
  
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
  
  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Imagens</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            Nota: Este é um exemplo de interface para gerenciamento de imagens. Para implementar o upload real de imagens, é necessário conectar a um serviço de armazenamento em nuvem como Supabase Storage, AWS S3, ou similar.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImageManager;
