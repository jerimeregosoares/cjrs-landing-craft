
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { useThemeManager } from "@/hooks/useThemeManager";

const ColorManager = () => {
  const { siteContent, updateContent } = useAdmin();
  const { toast } = useToast();
  const { applyThemeColors } = useThemeManager();

  const [colors, setColors] = useState({
    primaryColor: "#4CAF50",
    secondaryColor: "#A5D6A7",
    accentColor: "#1A1A1A",
    textColor: "#333333",
    backgroundColor: "#FFFFFF",
    adminPrimaryColor: "#4CAF50",
    adminBackgroundColor: "#F1F5F9"
  });

  // Load current colors when component mounts or siteContent changes
  useEffect(() => {
    if (siteContent && siteContent.theme) {
      console.log("Loading colors from siteContent.theme:", siteContent.theme);
      setColors({
        primaryColor: siteContent.theme.primaryColor || "#4CAF50",
        secondaryColor: siteContent.theme.secondaryColor || "#A5D6A7",
        accentColor: siteContent.theme.accentColor || "#1A1A1A",
        textColor: siteContent.theme.textColor || "#333333",
        backgroundColor: siteContent.theme.backgroundColor || "#FFFFFF",
        adminPrimaryColor: siteContent.theme.adminPrimaryColor || "#4CAF50",
        adminBackgroundColor: siteContent.theme.adminBackgroundColor || "#F1F5F9"
      });
    }
  }, [siteContent]);

  const handleColorChange = (colorName: string, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorName]: value
    }));
  };

  const saveColors = () => {
    // Update each color property in the theme
    updateContent('theme', 'primaryColor', colors.primaryColor);
    updateContent('theme', 'secondaryColor', colors.secondaryColor);
    updateContent('theme', 'accentColor', colors.accentColor);
    updateContent('theme', 'textColor', colors.textColor);
    updateContent('theme', 'backgroundColor', colors.backgroundColor);
    updateContent('theme', 'adminPrimaryColor', colors.adminPrimaryColor);
    updateContent('theme', 'adminBackgroundColor', colors.adminBackgroundColor);

    // Apply colors immediately using the centralized theme manager
    applyThemeColors(colors);

    toast({
      title: "Cores atualizadas",
      description: "As cores do site foram atualizadas com sucesso."
    });

    console.log("Colors saved and applied:", colors);
  };

  // Apply colors immediately when component loads
  useEffect(() => {
    if (siteContent && siteContent.theme) {
      applyThemeColors(siteContent.theme);
    }
  }, [siteContent, applyThemeColors]);

  return (
    <AdminLayout>
      <div className="p-8 space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-gray-50">Identidade Visual</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Defina a paleta de cores que representa sua marca.</p>
          </div>
          <Button
            className="rounded-xl h-11 px-8 bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all font-bold"
            onClick={saveColors}
          >
            Salvar Paleta
          </Button>
        </div>

        <Tabs defaultValue="site" className="w-full">
          <TabsList className="h-14 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
            <TabsTrigger value="site" className="rounded-xl px-8 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">Cores do Site</TabsTrigger>
            <TabsTrigger value="admin" className="rounded-xl px-8 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">Cores do Painel</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border">
                  <CardTitle className="text-xl font-bold">Cores Principais</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {[
                    { id: 'primaryColor', label: 'Cor Primária', desc: 'Botões, links e destaques principais.', color: colors.primaryColor },
                    { id: 'secondaryColor', label: 'Cor Secundária', desc: 'Elementos de fundo e detalhes sutis.', color: colors.secondaryColor },
                    { id: 'accentColor', label: 'Cor de Destaque', desc: 'Alertas e chamadas de ação críticas.', color: colors.accentColor }
                  ].map((field) => (
                    <div key={field.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={field.id} className="font-bold text-slate-700 dark:text-slate-300">{field.label}</Label>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{field.color}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <Input
                            type="color"
                            id={field.id}
                            value={field.color}
                            onChange={(e) => handleColorChange(field.id, e.target.value)}
                            className="w-14 h-14 rounded-xl cursor-pointer border-none p-0 overflow-hidden shadow-inner grayscale-[0.2] hover:grayscale-0 transition-all"
                          />
                        </div>
                        <Input
                          type="text"
                          value={field.color}
                          onChange={(e) => handleColorChange(field.id, e.target.value)}
                          className="h-12 rounded-xl border-slate-200 dark:border-white/10 font-mono text-sm"
                        />
                      </div>
                      <p className="text-xs text-slate-400 italic">{field.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
                  <CardHeader className="p-8 border-b border-border">
                    <CardTitle className="text-xl font-bold">Tipografia e Fundo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <Label className="font-bold text-slate-700 dark:text-slate-300">Cores de Interface</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/5">
                          <Label htmlFor="textColor" className="text-xs font-bold uppercase tracking-widest text-slate-400">Texto</Label>
                          <div className="flex items-center gap-3">
                            <Input type="color" value={colors.textColor} onChange={(e) => handleColorChange('textColor', e.target.value)} className="w-10 h-10 rounded-lg p-0 border-none inline-block overflow-hidden" />
                            <Input value={colors.textColor} onChange={(e) => handleColorChange('textColor', e.target.value)} className="h-9 rounded-lg border-slate-200 dark:border-white/5 text-xs font-mono" />
                          </div>
                        </div>
                        <div className="space-y-3 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/5">
                          <Label htmlFor="backgroundColor" className="text-xs font-bold uppercase tracking-widest text-slate-400">Fundo</Label>
                          <div className="flex items-center gap-3">
                            <Input type="color" value={colors.backgroundColor} onChange={(e) => handleColorChange('backgroundColor', e.target.value)} className="w-10 h-10 rounded-lg p-0 border-none inline-block overflow-hidden" />
                            <Input value={colors.backgroundColor} onChange={(e) => handleColorChange('backgroundColor', e.target.value)} className="h-9 rounded-lg border-slate-200 dark:border-white/5 text-xs font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none bg-primary/5 dark:bg-primary/5 rounded-[2rem] p-8">
                  <h3 className="text-lg font-bold mb-6 text-primary">Prévia em Tempo Real</h3>
                  <div className="space-y-4">
                    <div className="p-6 rounded-[2rem] space-y-4 shadow-xl border border-white dark:border-white/5" style={{ backgroundColor: colors.backgroundColor }}>
                      <h4 className="text-xl font-bold" style={{ color: colors.textColor }}>Título de Exemplo</h4>
                      <p className="text-sm" style={{ color: colors.textColor + '99' }}>Assim os usuários verão o contraste do texto sobre o fundo.</p>
                      <div className="flex gap-4">
                        <div className="h-10 px-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg" style={{ backgroundColor: colors.primaryColor }}>Botão Principal</div>
                        <div className="h-10 px-6 rounded-full flex items-center justify-center text-xs font-bold border" style={{ color: colors.primaryColor, borderColor: colors.primaryColor }}>Outline</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden max-w-4xl">
              <CardHeader className="p-8 border-b border-border">
                <CardTitle className="text-xl font-bold">Cores Internas do Painel</CardTitle>
              </CardHeader>
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/20">
                  <Label htmlFor="adminPrimaryColor" className="text-sm font-bold block mb-4">Cor de Ação (Primary)</Label>
                  <div className="flex items-center gap-4">
                    <Input type="color" id="adminPrimaryColor" value={colors.adminPrimaryColor} onChange={(e) => handleColorChange('adminPrimaryColor', e.target.value)} className="w-16 h-16 rounded-2xl border-none p-0 cursor-pointer overflow-hidden shadow-lg" />
                    <Input value={colors.adminPrimaryColor} onChange={(e) => handleColorChange('adminPrimaryColor', e.target.value)} className="h-12 rounded-xl font-mono text-sm" />
                  </div>
                </div>

                <div className="space-y-3 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/20">
                  <Label htmlFor="adminBackgroundColor" className="text-sm font-bold block mb-4">Cor de Fundo Estrutural</Label>
                  <div className="flex items-center gap-4">
                    <Input type="color" id="adminBackgroundColor" value={colors.adminBackgroundColor} onChange={(e) => handleColorChange('adminBackgroundColor', e.target.value)} className="w-16 h-16 rounded-2xl border-none p-0 cursor-pointer overflow-hidden shadow-lg" />
                    <Input value={colors.adminBackgroundColor} onChange={(e) => handleColorChange('adminBackgroundColor', e.target.value)} className="h-12 rounded-xl font-mono text-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </AdminLayout>
  );
};

export default ColorManager;
