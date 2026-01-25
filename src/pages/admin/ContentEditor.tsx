
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
      <div className="p-8 space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-gray-50">Editor de Conteúdo</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Gerencie cada detalhe dos textos e informações do seu site.</p>
          </div>
          <Button
            className="rounded-xl h-11 px-8 bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all font-bold"
            onClick={() => {
              toast({
                title: "Conteúdo sincronizado",
                description: "Todas as alterações pendentes foram verificadas."
              });
            }}
          >
            Salvar Tudo
          </Button>
        </div>

        <div className="space-y-12">
          {/* Hero Section */}
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <CardHeader className="p-8 border-b border-border">
              <CardTitle className="text-2xl font-bold">Seção Principal (Hero)</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hero-title" className="technical-label">Título de Impacto</Label>
                <Input
                  id="hero-title"
                  value={siteContent.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="h-14 rounded-2xl border-slate-200 dark:border-white/10 text-lg font-medium technical-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description" className="technical-label">Descrição Detalhada</Label>
                <Textarea
                  id="hero-description"
                  value={siteContent.hero.description}
                  onChange={(e) => handleChange('hero', 'description', e.target.value)}
                  rows={4}
                  className="rounded-2xl border-slate-200 dark:border-white/10 text-base resize-none technical-input"
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader className="p-8 border-b border-border">
              <CardTitle className="text-2xl font-bold">Catálogo de Serviços</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2 max-w-xl">
                <Label htmlFor="services-title" className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Título da Seção</Label>
                <Input
                  id="services-title"
                  value={siteContent.services.title}
                  onChange={(e) => handleChange('services', 'title', e.target.value)}
                  className="h-12 rounded-xl border-slate-200 dark:border-white/10"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Serviços Ativos</h3>
                  <p className="text-sm text-slate-500">Arraste para reordenar (use as setas)</p>
                </div>

                <div className="grid gap-6">
                  {siteContent.services.items.map((service, index) => (
                    <div key={service.id} className="group relative p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 transition-all hover:shadow-lg">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-row md:flex-col gap-2 shrink-0">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-xl h-10 w-10 shadow-sm"
                            onClick={() => handleMoveService(index, 'up')}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-xl h-10 w-10 shadow-sm"
                            onClick={() => handleMoveService(index, 'down')}
                            disabled={index === siteContent.services.items.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-xl h-10 w-10 shadow-sm md:mt-auto"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="technical-label">Título do Serviço</Label>
                            <Input
                              value={service.title}
                              onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                              className="rounded-xl italic font-semibold border-none bg-white dark:bg-slate-900 shadow-sm technical-input"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="technical-label">Investimento/Preço</Label>
                            <Input
                              value={service.price || ''}
                              onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                              className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm text-primary font-bold dark:text-emerald-400 technical-input"
                              placeholder="Ex: R$ 150,00"
                            />
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <Label className="technical-label">Descrição</Label>
                            <Textarea
                              value={service.description}
                              onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                              rows={2}
                              className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm resize-none technical-input"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="technical-label">Ícone Visual</Label>
                            <Select
                              value={service.icon}
                              onValueChange={(value) => handleServiceChange(service.id, 'icon', value)}
                            >
                              <SelectTrigger className="rounded-xl border-none bg-white dark:bg-slate-900 shadow-sm px-4 technical-input">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-none dark:bg-slate-900 shadow-2xl">
                                {availableIcons.map((icon) => (
                                  <SelectItem key={icon} value={icon} className="rounded-lg capitalize">{icon}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Service UI */}
                <div className="mt-12 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/20">
                  <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                      <Plus className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold">Novo Serviço</h4>
                    <p className="text-slate-500">Adicione uma nova especialidade ao seu catálogo</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold ml-1">Nome do Serviço</Label>
                      <Input
                        value={newService.title}
                        onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                        className="h-12 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                        placeholder="Ex: POCUS Geriátrico"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold ml-1">Valor Sugerido</Label>
                      <Input
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                        className="h-12 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                        placeholder="R$ 0,00"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-bold ml-1">Descrição do Serviço</Label>
                      <Textarea
                        value={newService.description}
                        onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm resize-none"
                        placeholder="Descreva o que está incluído..."
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-center pt-4">
                      <Button onClick={handleAddService} className="h-14 px-12 rounded-2xl font-bold bg-primary hover:bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Criar Novo Serviço
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardHeader className="p-8 border-b border-border">
              <CardTitle className="text-2xl font-bold">Perfil Profissional (Sobre)</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="about-title" className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Título da Seção</Label>
                  <Input
                    id="about-title"
                    value={siteContent.about.title}
                    onChange={(e) => handleChange('about', 'title', e.target.value)}
                    className="h-12 rounded-xl border-slate-200 dark:border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about-subtitle" className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Nome de Exibição</Label>
                  <Input
                    id="about-subtitle"
                    value={siteContent.about.subtitle}
                    onChange={(e) => handleChange('about', 'subtitle', e.target.value)}
                    className="h-12 rounded-xl border-slate-200 dark:border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1 block border-b pb-2">Biografia & Experiência</Label>
                <div className="grid gap-6">
                  {siteContent.about.description.map((paragraph, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor={`about-description-${index}`} className="text-xs font-bold text-slate-400">Parágrafo {index + 1}</Label>
                      </div>
                      <Textarea
                        id={`about-description-${index}`}
                        value={paragraph}
                        onChange={(e) => handleArrayChange('about', 'description', index, e.target.value)}
                        rows={3}
                        className="rounded-2xl border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 resize-none hover:bg-white dark:hover:bg-slate-800 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
            <CardHeader className="p-8 border-b border-border">
              <CardTitle className="text-2xl font-bold">Feedback Social</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-2 max-w-xl">
                <Label htmlFor="testimonials-title" className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Título da Seção de Depoimentos</Label>
                <Input
                  id="testimonials-title"
                  value={siteContent.testimonials.title}
                  onChange={(e) => handleChange('testimonials', 'title', e.target.value)}
                  className="h-12 rounded-xl border-slate-200 dark:border-white/10"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </AdminLayout>
  );
};

export default ContentEditor;
