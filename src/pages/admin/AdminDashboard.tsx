
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { FileText, MessageSquare, Link, Image, Palette } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { siteContent } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = () => {
    try {
      setIsLoading(true);
      
      // Collect all site data
      const testimonials = localStorage.getItem('testimonials') || '[]';
      const exportData = {
        siteContent,
        testimonials: JSON.parse(testimonials)
      };
      
      // Create a JSON file and download it
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `site-backup-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setIsLoading(false);
    } catch (error) {
      console.error('Export failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conteúdo</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Textos</div>
              <p className="text-xs text-muted-foreground mt-1">Gerencie os textos do site</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => navigate("/admin/content")}
              >
                Editar
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Depoimentos</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Feedback</div>
              <p className="text-xs text-muted-foreground mt-1">Gerencie os depoimentos dos clientes</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => navigate("/admin/testimonials")}
              >
                Gerenciar
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Links</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">URLs</div>
              <p className="text-xs text-muted-foreground mt-1">Altere os links de agendamento</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => navigate("/admin/links")}
              >
                Configurar
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Imagens</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Mídia</div>
              <p className="text-xs text-muted-foreground mt-1">Atualize as imagens do site</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => navigate("/admin/images")}
              >
                Gerenciar
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>
              Personalize a aparência do seu site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Cores do Site</h3>
                  <p className="text-sm text-muted-foreground">
                    Personalize as cores do site e do painel administrativo
                  </p>
                </div>
                <Button onClick={() => navigate("/admin/colors")}>
                  <Palette className="mr-2 h-4 w-4" />
                  Gerenciar Cores
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Backup do Site</CardTitle>
            <CardDescription>
              Exporte os dados do site para backup ou transfira para outro ambiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={handleExport} 
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                {isLoading ? "Exportando..." : "Exportar Dados do Site"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Button variant="outline" onClick={() => navigate("/")} className="w-full md:w-auto">
            Visualizar Site
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
