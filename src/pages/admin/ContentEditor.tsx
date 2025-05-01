
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContentEditor = () => {
  const { siteContent, updateContent } = useAdmin();
  const { toast } = useToast();

  const handleChange = (section: string, field: string, value: string) => {
    updateContent(section, field, value);
    toast({
      title: "Conteúdo atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const handleArrayChange = (section: string, field: string, index: number, value: string) => {
    const newArray = [...(siteContent[section as keyof typeof siteContent][field] as string[])];
    newArray[index] = value;
    updateContent(section, field, newArray as any);
    
    toast({
      title: "Conteúdo atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Editor de Conteúdo</h1>
        
        <div className="space-y-8">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Seção Principal (Hero)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Título</Label>
                <Input
                  id="hero-title"
                  value={siteContent.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Descrição</Label>
                <Textarea
                  id="hero-description"
                  value={siteContent.hero.description}
                  onChange={(e) => handleChange('hero', 'description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card>
            <CardHeader>
              <CardTitle>Seção de Serviços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="services-title">Título</Label>
                <Input
                  id="services-title"
                  value={siteContent.services.title}
                  onChange={(e) => handleChange('services', 'title', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Título da Seção</Label>
                <Input
                  id="about-title"
                  value={siteContent.about.title}
                  onChange={(e) => handleChange('about', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="about-subtitle">Nome do Profissional</Label>
                <Input
                  id="about-subtitle"
                  value={siteContent.about.subtitle}
                  onChange={(e) => handleChange('about', 'subtitle', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Biografia</Label>
                <div className="space-y-3">
                  {siteContent.about.description.map((paragraph, index) => (
                    <div key={index}>
                      <Label htmlFor={`about-description-${index}`}>Parágrafo {index + 1}</Label>
                      <Textarea
                        id={`about-description-${index}`}
                        value={paragraph}
                        onChange={(e) => handleArrayChange('about', 'description', index, e.target.value)}
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card>
            <CardHeader>
              <CardTitle>Seção de Depoimentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testimonials-title">Título</Label>
                <Input
                  id="testimonials-title"
                  value={siteContent.testimonials.title}
                  onChange={(e) => handleChange('testimonials', 'title', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="py-6">
            <Button onClick={() => {
              toast({
                title: "Todas as alterações foram salvas",
                description: "O conteúdo do site foi atualizado com sucesso."
              });
            }}>
              Salvar Todas as Alterações
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentEditor;
