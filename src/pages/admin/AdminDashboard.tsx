
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
          <Card className="group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-blue-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="technical-label">Conteúdo</CardTitle>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-xl font-black uppercase tracking-tight mb-1">Textos</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Configuração de cópias</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500"
                onClick={() => navigate("/admin/content")}
              >
                Acessar Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-emerald-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="technical-label">Social</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-xl font-black uppercase tracking-tight mb-1">Feedback</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gestão de depoimentos</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500"
                onClick={() => navigate("/admin/testimonials")}
              >
                Acessar Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-amber-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="technical-label">Contatos</CardTitle>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                <Link className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-xl font-black uppercase tracking-tight mb-1">Canais</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Links e agendamentos</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/10 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500"
                onClick={() => navigate("/admin/links")}
              >
                Acessar Módulo
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-purple-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500 opacity-20 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="technical-label">Mídia</CardTitle>
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                <Image className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-xl font-black uppercase tracking-tight mb-1">Imagens</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Biblioteca de assets</p>
              <Button
                variant="ghost"
                className="w-full mt-6 rounded-lg text-[10px] font-black uppercase tracking-widest border border-purple-500/10 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500"
                onClick={() => navigate("/admin/images")}
              >
                Acessar Módulo
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
