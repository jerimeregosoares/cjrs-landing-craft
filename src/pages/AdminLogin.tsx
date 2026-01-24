import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao painel administrativo.",
      });
      navigate("/admin");
    } else {
      setError(result.error || "Erro ao fazer login.");
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: result.error || "Erro ao fazer login.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 transition-colors duration-500">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-10 relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white dark:border-white/5 p-10">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
              <AlertCircle className="text-white h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-gray-50">Portal Admin</h1>
            <p className="text-slate-500 dark:text-slate-400">Entre para gerenciar seu conteúdo digital</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                E-mail Profissional
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 focus:ring-primary focus:border-primary transition-all"
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Senha de Acesso
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all duration-300 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Entrar no Painel'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Button variant="link" onClick={() => navigate("/")} className="text-slate-400 hover:text-primary transition-colors">
              ← Voltar para o Site
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 dark:text-slate-600 text-sm">
          © {new Date().getFullYear()} Enfermeiro Jérime Rêgo Soares
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
