
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { FileText, MessageSquare, Link, Image, Palette, Database } from "lucide-react";

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
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

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
      <div className="p-8 space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-gray-50">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Visão geral do seu consultório digital.</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl h-11 px-6 border-primary/20 hover:bg-primary/5 transition-all">
            Visualizar Site
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Conteúdo</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                <FileText className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold mb-1">Textos</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Edite todas as cópias do site</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors"
                onClick={() => navigate("/admin/content")}
              >
                Editar Agora
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Social</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500">
                <MessageSquare className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold mb-1">Feedback</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie depoimentos reais</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors"
                onClick={() => navigate("/admin/testimonials")}
              >
                Gerenciar
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Contatos</CardTitle>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                <Link className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold mb-1">URLs e Links</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Configure agendamentos</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-xl group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors"
                onClick={() => navigate("/admin/links")}
              >
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Mídia</CardTitle>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-500">
                <Image className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold mb-1">Imagens</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Atualize as imagens do site</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-xl group-hover:bg-purple-50 dark:group-hover:bg-purple-500/10 group-hover:text-purple-500 transition-colors"
                onClick={() => navigate("/admin/images")}
              >
                Biblioteca
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-border p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Aparência & Marca</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Personalize a identidade visual do seu projeto
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex items-center justify-between gap-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Ajuste as cores principais, secundárias e o estilo do painel administrativo para refletir sua marca.
                </p>
                <Button
                  onClick={() => navigate("/admin/colors")}
                  className="rounded-2xl h-14 px-8 font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  Personalizar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-border p-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Segurança e Dados</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Exportação completa e backups locais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Proteja seus dados exportando um arquivo completo de configuração e depoimentos.
                </p>
                <Button
                  onClick={handleExport}
                  disabled={isLoading}
                  variant="outline"
                  className="rounded-2xl h-14 px-8 font-bold border-amber-200 dark:border-amber-500/20 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all shrink-0"
                >
                  {isLoading ? "Exportando..." : "Realizar Backup"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
