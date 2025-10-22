
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";

const LinkManager = () => {
  const { siteContent, updateLink } = useAdmin();
  const { toast } = useToast();
  const [links, setLinks] = useState({
    scheduleAppointment: "",
    whatsapp: "",
    bookConsultation: "",
    testimonialForm: "",
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
      });
    }
  }, [siteContent]);

  const handleSave = (linkId: string, value: string) => {
    // Simple URL validation
    try {
      if (!value.trim()) {
        throw new Error("URL não pode estar vazia");
      }
      
      // Check if URL starts with http:// or https://
      if (!/^https?:\/\//i.test(value)) {
        value = 'https://' + value;
      }
      
      new URL(value); // Will throw error if not valid URL
      
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

        <Card>
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
      </div>
    </AdminLayout>
  );
};

export default LinkManager;
