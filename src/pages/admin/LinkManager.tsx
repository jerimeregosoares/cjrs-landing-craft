
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";

const LinkManager = () => {
  const { siteContent, updateLink, updateContent } = useAdmin();
  const { toast } = useToast();
  const [links, setLinks] = useState({
    scheduleAppointment: "",
    whatsapp: "",
    bookConsultation: "",
    testimonialForm: "",
    heroSecondary: "",
    heroTertiary: "",
  });
  
  const [labels, setLabels] = useState({
    scheduleAppointment: "",
    whatsapp: "",
    bookConsultation: "",
    heroSecondary: "",
    heroTertiary: "",
  });

  // Load current links when component mounts or siteContent changes
  useEffect(() => {
    if (siteContent && siteContent.links) {
      console.log("Loading links from siteContent:", siteContent.links);
      setLinks({
        scheduleAppointment: siteContent.links.scheduleAppointment || "",
        whatsapp: siteContent.links.whatsapp || "",
        bookConsultation: siteContent.links.bookConsultation || "",
        testimonialForm: siteContent.links.testimonialForm || "",
        heroSecondary: siteContent.links.heroSecondary || "#about",
        heroTertiary: siteContent.links.heroTertiary || "https://pronto-jr-digital.lovable.app/public/agendamento",
      });
    }
    
    if (siteContent && siteContent.buttonLabels) {
      setLabels({
        scheduleAppointment: siteContent.buttonLabels.scheduleAppointment || "Agendar Atendimento",
        whatsapp: siteContent.buttonLabels.whatsapp || "Agendar WhatsApp",
        bookConsultation: siteContent.buttonLabels.bookConsultation || "Agende sua Consulta",
        heroSecondary: siteContent.buttonLabels.heroSecondary || "Sobre o Profissional",
        heroTertiary: siteContent.buttonLabels.heroTertiary || "Cadastro Único",
      });
    }
  }, [siteContent]);

  const handleSave = (linkId: string, value: string) => {
    // Simple URL validation
    try {
      if (!value.trim()) {
        throw new Error("URL não pode estar vazia");
      }
      
      // Allow anchor links (starting with #) and external URLs
      if (!value.startsWith('#')) {
        // Check if URL starts with http:// or https://
        if (!/^https?:\/\//i.test(value)) {
          value = 'https://' + value;
        }
        new URL(value); // Will throw error if not valid URL
      }
      
      // Update link in context
      updateLink(linkId, value);
      
      // Update local state to reflect changes
      setLinks(prev => ({
        ...prev,
        [linkId]: value
      }));
      
      toast({
        title: "Link atualizado",
        description: "A URL foi atualizada com sucesso.",
      });
      
      console.log(`Link ${linkId} updated to: ${value}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "URL inválida",
        description: "Por favor, insira uma URL válida (incluindo http:// ou https://).",
      });
    }
  };

  const handleChange = (linkId: string, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [linkId]: value,
    }));
  };
  
  const handleLabelChange = (labelId: string, value: string) => {
    setLabels((prev) => ({
      ...prev,
      [labelId]: value,
    }));
  };
  
  const handleSaveLabel = (labelId: string, value: string) => {
    if (!value.trim()) {
      toast({
        title: "Erro",
        description: "O título do botão não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      updateContent("buttonLabels", labelId, value.trim());
      
      toast({
        title: "Sucesso!",
        description: "Título do botão atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o título do botão.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Links</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agendar Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleAppointmentLabel">Título do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    id="scheduleAppointmentLabel"
                    value={labels.scheduleAppointment}
                    onChange={(e) => handleLabelChange('scheduleAppointment', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSaveLabel('scheduleAppointment', labels.scheduleAppointment)}>
                    Salvar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduleAppointment">URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="scheduleAppointment"
                    value={links.scheduleAppointment}
                    onChange={(e) => handleChange('scheduleAppointment', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSave('scheduleAppointment', links.scheduleAppointment)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este link é usado nos botões "Agendar Atendimento" ao longo do site.
                </p>
              </div>
              
                <Button
                  variant="outline"
                  onClick={() => {
                    if (links.scheduleAppointment) {
                      window.open(links.scheduleAppointment, '_blank', 'noopener,noreferrer');
                    } else {
                      toast({
                        variant: "destructive", 
                        title: "Link não definido", 
                        description: "Por favor, salve um link válido primeiro."
                      });
                    }
                  }}
                >
                  Testar Link
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappLabel">Título do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsappLabel"
                    value={labels.whatsapp}
                    onChange={(e) => handleLabelChange('whatsapp', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSaveLabel('whatsapp', labels.whatsapp)}>
                    Salvar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsapp"
                    value={links.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSave('whatsapp', links.whatsapp)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este link é usado nos botões de "Agendar WhatsApp" no site.
                </p>
              </div>
              
                <Button
                  variant="outline"
                  onClick={() => {
                    if (links.whatsapp) {
                      window.open(links.whatsapp, '_blank', 'noopener,noreferrer');
                    } else {
                      toast({
                        variant: "destructive", 
                        title: "Link não definido", 
                        description: "Por favor, salve um link válido primeiro."
                      });
                    }
                  }}
                >
                  Testar Link
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agende sua Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookConsultationLabel">Título do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    id="bookConsultationLabel"
                    value={labels.bookConsultation}
                    onChange={(e) => handleLabelChange('bookConsultation', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSaveLabel('bookConsultation', labels.bookConsultation)}>
                    Salvar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bookConsultation">URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="bookConsultation"
                    value={links.bookConsultation}
                    onChange={(e) => handleChange('bookConsultation', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSave('bookConsultation', links.bookConsultation)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este link é usado no botão "Agende sua Consulta" na seção Sobre.
                </p>
              </div>
              
                <Button
                  variant="outline"
                  onClick={() => {
                    if (links.bookConsultation) {
                      window.open(links.bookConsultation, '_blank', 'noopener,noreferrer');
                    } else {
                      toast({
                        variant: "destructive", 
                        title: "Link não definido", 
                        description: "Por favor, salve um link válido primeiro."
                      });
                    }
                  }}
                >
                  Testar Link
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Formulário Público de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testimonialForm">URL Pública</Label>
                <div className="flex gap-2">
                  <Input
                    id="testimonialForm"
                    value={`${window.location.origin}/avaliacoes`}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/avaliacoes`);
                      toast({
                        title: "Link copiado!",
                        description: "O link foi copiado para a área de transferência.",
                      });
                    }}
                  >
                    Copiar Link
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este é o link público para pacientes enviarem avaliações. Compartilhe este link em redes sociais, WhatsApp ou e-mail.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`${window.location.origin}/avaliacoes`, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Testar Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const message = `Deixe sua avaliação sobre nosso atendimento: ${window.location.origin}/avaliacoes`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Compartilhar no WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Botões da Seção Hero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroSecondaryLabel">Título do Botão Secundário</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroSecondaryLabel"
                    value={labels.heroSecondary}
                    onChange={(e) => handleLabelChange('heroSecondary', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSaveLabel('heroSecondary', labels.heroSecondary)}>
                    Salvar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroSecondary">URL do Botão Secundário</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroSecondary"
                    value={links.heroSecondary}
                    onChange={(e) => handleChange('heroSecondary', e.target.value)}
                    className="flex-1"
                    placeholder="#about ou https://exemplo.com"
                  />
                  <Button onClick={() => handleSave('heroSecondary', links.heroSecondary)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Use # para âncoras internas (ex: #about) ou URLs completas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroTertiaryLabel">Título do Botão Terciário</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroTertiaryLabel"
                    value={labels.heroTertiary}
                    onChange={(e) => handleLabelChange('heroTertiary', e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSaveLabel('heroTertiary', labels.heroTertiary)}>
                    Salvar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroTertiary">URL do Botão Terciário</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroTertiary"
                    value={links.heroTertiary}
                    onChange={(e) => handleChange('heroTertiary', e.target.value)}
                    className="flex-1"
                    placeholder="https://exemplo.com"
                  />
                  <Button onClick={() => handleSave('heroTertiary', links.heroTertiary)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  URL externa para o botão terciário
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LinkManager;
