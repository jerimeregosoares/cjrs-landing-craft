
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const LinkManager = () => {
  const { siteContent, updateLink } = useAdmin();
  const { toast } = useToast();
  const [links, setLinks] = useState({
    scheduleAppointment: siteContent.links.scheduleAppointment,
    whatsapp: siteContent.links.whatsapp,
  });

  const handleSave = (linkId: string, value: string) => {
    // Simple URL validation
    try {
      new URL(value); // Will throw error if not valid URL
      updateLink(linkId, value);
      toast({
        title: "Link atualizado",
        description: "A URL foi atualizada com sucesso.",
      });
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
                  window.open(links.scheduleAppointment, '_blank');
                }}
              >
                Testar Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
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
                  Este link é usado nos botões de "Agendar WhatsApp" e "Agende sua Consulta" no site.
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => {
                  window.open(links.whatsapp, '_blank');
                }}
              >
                Testar Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LinkManager;
