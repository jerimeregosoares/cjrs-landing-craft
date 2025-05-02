
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

interface HeroImageUploadProps {
  title: string;
  description: string;
}

const HeroImageUpload = ({ title, description }: HeroImageUploadProps) => {
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      setPreview(null);
      return;
    }
    
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  
  const handleUpload = () => {
    if (!image) {
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
      description: `A imagem foi enviada com sucesso. Este é apenas um exemplo, a imagem não será atualizada no site sem integração com um servidor.`
    });
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
                <img 
                  src={preview} 
                  alt="Image preview" 
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
                  id={`upload-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <label
                  htmlFor={`upload-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium"
                >
                  Escolher imagem
                </label>
                {image && (
                  <span className="ml-3 text-sm text-gray-500">
                    {image.name} ({Math.round(image.size / 1024)} KB)
                  </span>
                )}
              </div>
              
              <Button 
                onClick={handleUpload}
                disabled={!image}
                className="w-full md:w-auto"
              >
                Enviar imagem
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
