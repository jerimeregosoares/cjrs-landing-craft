import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { UserPlus, Trash2, Shield, Loader2, Copy, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

const UserManager = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchAdminUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');

      if (error) throw error;

      setAdminUsers(data || []);
    } catch (error) {
      console.error('Erro ao buscar usuários admin:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários administradores.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const handleCreateAdmin = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Erro",
        description: "Preencha o email e a senha.",
        variant: "destructive",
      });
      return;
    }

    if (newUserPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      // Create user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Usuário não foi criado');
      }

      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin'
        });

      if (roleError) throw roleError;

      toast({
        title: "Sucesso",
        description: `Administrador ${newUserEmail} criado com sucesso! Verifique o email para confirmar a conta.`,
      });

      setNewUserEmail("");
      setNewUserPassword("");
      fetchAdminUsers();
    } catch (error: any) {
      console.error('Erro ao criar admin:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o administrador.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Permissão de administrador removida.",
      });

      fetchAdminUsers();
    } catch (error) {
      console.error('Erro ao remover admin:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o administrador.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-gray-50 uppercase italic">Acesso & Segurança</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Controle de privilégios e operadores do sistema.</p>
          </div>
        </div>

        {/* Create New Admin */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-emerald-500" />
          <CardHeader className="p-8 border-b border-border">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <UserPlus className="h-6 w-6" />
              </div>
              Provisionar Operador
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="technical-label">Email de Acesso</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="h-12 rounded-xl technical-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="technical-label">Senha Criptografada</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="h-12 rounded-xl technical-input"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleCreateAdmin}
                className="h-12 px-8 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                disabled={creating}
              >
                {creating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Provisionando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Gerar Acesso Admin
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Users List */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50" />
          <CardHeader className="p-8 border-b border-border">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                <Shield className="h-6 w-6" />
              </div>
              Operadores Ativos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
              </div>
            ) : adminUsers.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-white/5">
                <p className="text-slate-500 font-medium">Nenhum administrador encontrado no banco de dados.</p>
              </div>
            ) : (
              <div className="overflow-hidden border border-border/50 rounded-2xl">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="hover:bg-transparent border-b border-border/50">
                      <TableHead className="technical-label py-4 px-6">Identificador do Operador</TableHead>
                      <TableHead className="technical-label py-4">Nível</TableHead>
                      <TableHead className="technical-label py-4">Registro do Sistema</TableHead>
                      <TableHead className="text-right technical-label py-4 px-6">Comandos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[200px]" title={user.user_id}>
                              {user.user_id}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(user.user_id)}
                            >
                              {copiedId === user.user_id ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remover Administrador?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação removerá as permissões de administrador deste usuário.
                                  O usuário ainda existirá no sistema, mas não terá mais acesso ao painel admin.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveAdmin(user.user_id)}>
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
              </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instruções</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Use o formulário acima para criar um novo administrador com email e senha.</li>
              <li>O novo usuário receberá um email de confirmação (se ativado no Supabase).</li>
              <li>Após confirmar o email, o usuário poderá fazer login no painel admin.</li>
              <li>Para remover um administrador, clique no botão vermelho na lista.</li>
              <li>Remover permissões não exclui a conta, apenas remove o acesso admin.</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManager;
