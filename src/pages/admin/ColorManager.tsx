
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
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Cores</h1>
        
        <Tabs defaultValue="site">
          <TabsList className="mb-6">
            <TabsTrigger value="site">Cores do Site</TabsTrigger>
            <TabsTrigger value="admin">Cores do Painel Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="site">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cores do Site Principal</CardTitle>
                <CardDescription>
                  Personalize as cores do seu site para combinar com sua marca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="primaryColor" 
                        value={colors.primaryColor} 
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.primaryColor} 
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Usada em botões, links e elementos de destaque
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="secondaryColor" 
                        value={colors.secondaryColor} 
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.secondaryColor} 
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Usada em elementos secundários e detalhes
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="accentColor" 
                        value={colors.accentColor} 
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.accentColor} 
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Usada para chamar atenção para elementos específicos
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="textColor">Cor do Texto</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="textColor" 
                        value={colors.textColor} 
                        onChange={(e) => handleColorChange('textColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.textColor} 
                        onChange={(e) => handleColorChange('textColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cor principal para textos do site
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="backgroundColor" 
                        value={colors.backgroundColor} 
                        onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.backgroundColor} 
                        onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cor de fundo principal do site
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cores do Painel Administrativo</CardTitle>
                <CardDescription>
                  Personalize as cores do painel administrativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="adminPrimaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="adminPrimaryColor" 
                        value={colors.adminPrimaryColor} 
                        onChange={(e) => handleColorChange('adminPrimaryColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.adminPrimaryColor} 
                        onChange={(e) => handleColorChange('adminPrimaryColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cor principal do painel administrativo
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="adminBackgroundColor">Cor de Fundo</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="color" 
                        id="adminBackgroundColor" 
                        value={colors.adminBackgroundColor} 
                        onChange={(e) => handleColorChange('adminBackgroundColor', e.target.value)}
                        className="w-16 h-10" 
                      />
                      <Input 
                        type="text" 
                        value={colors.adminBackgroundColor} 
                        onChange={(e) => handleColorChange('adminBackgroundColor', e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cor de fundo do painel administrativo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button onClick={saveColors}>Salvar Cores</Button>
        </div>
        
        <div className="mt-8 border p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Prévia das Cores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div style={{backgroundColor: colors.primaryColor}} className="h-24 rounded flex items-center justify-center text-white">
              Cor Primária
            </div>
            <div style={{backgroundColor: colors.secondaryColor}} className="h-24 rounded flex items-center justify-center text-black">
              Cor Secundária
            </div>
            <div style={{backgroundColor: colors.accentColor}} className="h-24 rounded flex items-center justify-center text-white">
              Cor de Destaque
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ColorManager;
