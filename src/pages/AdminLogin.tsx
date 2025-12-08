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
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="mt-2 text-gray-600">Entre com suas credenciais para gerenciar o site</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
