
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Service } from "@/types/admin";
import { Trash2, MoveUp, MoveDown, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContentEditor = () => {
  const { siteContent, updateContent, addService, updateService, deleteService, reorderServices } = useAdmin();
  const { toast } = useToast();
  const [newService, setNewService] = useState<Service>({
    id: "",
    title: "",
    description: "",
    icon: "search",
    price: ""
  });

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
    updateContent(section, field, newArray);
    
    toast({
      title: "Conteúdo atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string) => {
    updateService(id, { [field]: value });
    
    toast({
      title: "Serviço atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  };

  const handleAddService = () => {
    if (!newService.title || !newService.description) {
      toast({
        title: "Erro ao adicionar serviço",
        description: "Título e descrição são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const id = `service-${Date.now()}`;
    addService({ ...newService, id });
    
    setNewService({
      id: "",
      title: "",
      description: "",
      icon: "search",
      price: ""
    });
    
    toast({
      title: "Serviço adicionado",
      description: "O novo serviço foi adicionado com sucesso."
    });
  };

  const handleDeleteService = (id: string) => {
    deleteService(id);
    
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso."
    });
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === siteContent.services.items.length - 1)
    ) {
      return;
    }
    
    const newOrder = [...siteContent.services.items];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    
    reorderServices(newOrder);
    
    toast({
      title: "Ordem atualizada",
      description: "A ordem dos serviços foi atualizada com sucesso."
    });
  };

  // Available icon options
  const availableIcons = ['search', 'clipboard', 'syringe', 'heart', 'activity'];

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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="services-title">Título da Seção</Label>
                <Input
                  id="services-title"
                  value={siteContent.services.title}
                  onChange={(e) => handleChange('services', 'title', e.target.value)}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Lista de Serviços</h3>
                
                {siteContent.services.items.map((service, index) => (
                  <div key={service.id} className="mb-8 p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Serviço {index + 1}</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleMoveService(index, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleMoveService(index, 'down')}
                          disabled={index === siteContent.services.items.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`service-title-${service.id}`}>Título</Label>
                        <Input
                          id={`service-title-${service.id}`}
                          value={service.title}
                          onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`service-description-${service.id}`}>Descrição</Label>
                        <Textarea
                          id={`service-description-${service.id}`}
                          value={service.description}
                          onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`service-icon-${service.id}`}>Ícone</Label>
                        <Select 
                          value={service.icon} 
                          onValueChange={(value) => handleServiceChange(service.id, 'icon', value)}
                        >
                          <SelectTrigger id={`service-icon-${service.id}`}>
                            <SelectValue placeholder="Selecione um ícone" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableIcons.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                {icon.charAt(0).toUpperCase() + icon.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`service-price-${service.id}`}>Preço/Valor</Label>
                        <Input
                          id={`service-price-${service.id}`}
                          value={service.price || ''}
                          onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                          placeholder="Ex: R$150 ou A partir de R$100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 border border-dashed rounded-md bg-gray-50">
                  <h4 className="font-medium mb-4">Adicionar Novo Serviço</h4>
                  
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="new-service-title">Título</Label>
                      <Input
                        id="new-service-title"
                        value={newService.title}
                        onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Nome do serviço"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="new-service-description">Descrição</Label>
                      <Textarea
                        id="new-service-description"
                        value={newService.description}
                        onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        placeholder="Descrição detalhada do serviço"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="new-service-icon">Ícone</Label>
                      <Select 
                        value={newService.icon} 
                        onValueChange={(value) => setNewService(prev => ({ ...prev, icon: value }))}
                      >
                        <SelectTrigger id="new-service-icon">
                          <SelectValue placeholder="Selecione um ícone" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIcons.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              {icon.charAt(0).toUpperCase() + icon.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="new-service-price">Preço/Valor</Label>
                      <Input
                        id="new-service-price"
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="Ex: R$150 ou A partir de R$100"
                      />
                    </div>
                    
                    <Button onClick={handleAddService} className="mt-2 w-full">
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Serviço
                    </Button>
                  </div>
                </div>
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
