import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useSiteContentDB } from '@/hooks/useSiteContentDB';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, Upload, RotateCcw, Database } from 'lucide-react';
import { SiteContent } from '@/types/admin';
import { defaultContent } from '@/context/adminDefaults';

const BackupManager = () => {
  const { siteContent, setSiteContent } = useAdmin();
  const { loadContent, saveContent } = useSiteContentDB();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Export current content as JSON file
  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(siteContent, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-site-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Backup Exportado',
        description: 'O arquivo foi baixado com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao exportar backup:', error);
      toast({
        title: 'Erro ao Exportar',
        description: 'Não foi possível criar o arquivo de backup.',
        variant: 'destructive',
      });
    }
  };

  // Import content from JSON file
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      const content = JSON.parse(text) as SiteContent;
      
      // Validate the structure
      if (!content.hero || !content.services || !content.about) {
        throw new Error('Arquivo de backup inválido');
      }

      // Save to database
      const success = await saveContent(content);
      if (!success) {
        throw new Error('Falha ao salvar no banco de dados');
      }

      // Update local state
      setSiteContent(content);
      localStorage.setItem('siteContent', JSON.stringify(content));

      toast({
        title: 'Backup Restaurado',
        description: 'O conteúdo foi importado com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao importar backup:', error);
      toast({
        title: 'Erro ao Importar',
        description: 'Não foi possível restaurar o backup. Verifique se o arquivo é válido.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      // Reset input
      event.target.value = '';
    }
  };

  // Sync from database
  const handleSyncFromDB = async () => {
    setIsLoading(true);
    try {
      const content = await loadContent();
      if (content) {
        setSiteContent(content);
        localStorage.setItem('siteContent', JSON.stringify(content));
        toast({
          title: 'Sincronizado',
          description: 'Conteúdo carregado do banco de dados.',
        });
      } else {
        toast({
          title: 'Nenhum Dado Encontrado',
          description: 'Não há conteúdo salvo no banco de dados.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      toast({
        title: 'Erro ao Sincronizar',
        description: 'Não foi possível carregar do banco de dados.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to default content
  const handleReset = async () => {
    if (!window.confirm('Tem certeza que deseja restaurar as configurações padrão? Todos os dados atuais serão perdidos.')) {
      return;
    }

    setIsLoading(true);
    try {
      // Save default content to database
      const success = await saveContent(defaultContent);
      if (!success) {
        throw new Error('Falha ao salvar no banco de dados');
      }

      // Update local state
      setSiteContent(defaultContent);
      localStorage.setItem('siteContent', JSON.stringify(defaultContent));

      toast({
        title: 'Restaurado',
        description: 'Configurações padrão foram restauradas.',
      });
    } catch (error) {
      console.error('Erro ao restaurar padrões:', error);
      toast({
        title: 'Erro ao Restaurar',
        description: 'Não foi possível restaurar as configurações padrão.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Backup e Restauração</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie backups do conteúdo do site
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Export Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exportar Backup
              </CardTitle>
              <CardDescription>
                Baixe todo o conteúdo do site como arquivo JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Baixar Backup
              </Button>
            </CardContent>
          </Card>

          {/* Import Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Importar Backup
              </CardTitle>
              <CardDescription>
                Restaure o conteúdo a partir de um arquivo JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label htmlFor="import-file">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  onClick={() => document.getElementById('import-file')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isLoading ? 'Importando...' : 'Selecionar Arquivo'}
                </Button>
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>

          {/* Sync from Database */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Sincronizar do Banco
              </CardTitle>
              <CardDescription>
                Recarregue o conteúdo salvo no banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSyncFromDB}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                <Database className="mr-2 h-4 w-4" />
                {isLoading ? 'Sincronizando...' : 'Sincronizar'}
              </Button>
            </CardContent>
          </Card>

          {/* Reset to Default */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Restaurar Padrão
              </CardTitle>
              <CardDescription>
                Restaure todas as configurações para os valores padrão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleReset}
                variant="destructive"
                className="w-full"
                disabled={isLoading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {isLoading ? 'Restaurando...' : 'Restaurar Padrão'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              • <strong>Exportar:</strong> Cria um arquivo JSON com todo o conteúdo atual do site
            </p>
            <p>
              • <strong>Importar:</strong> Restaura o conteúdo a partir de um arquivo de backup
            </p>
            <p>
              • <strong>Sincronizar:</strong> Recarrega o conteúdo salvo no banco de dados do Supabase
            </p>
            <p>
              • <strong>Restaurar Padrão:</strong> Remove todas as personalizações e volta às configurações iniciais
            </p>
            <p className="mt-4 text-amber-600">
              ⚠️ <strong>Atenção:</strong> Todas as alterações são permanentes. Faça backups regulares!
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BackupManager;
