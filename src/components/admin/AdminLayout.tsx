
import React, { useState, useEffect } from "react";
import AdminGuard from "./AdminGuard";
import AdminSidebar from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add admin-panel class to body
  useEffect(() => {
    document.body.classList.add('admin-panel');

    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-primary/20">
        {/* Technical Background Element */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        {!isMobile && <AdminSidebar isMobile={false} />}

        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-all duration-500 animate-in fade-in" onClick={() => setIsSidebarOpen(false)} />
        )}

        {isMobile && isSidebarOpen && (
          <AdminSidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
          {isMobile && (
            <div className="bg-background/40 backdrop-blur-xl p-4 border-b border-border/50 flex items-center justify-between shadow-lg shadow-black/5 z-30">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-primary/10 transition-all"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
                <div className="ml-4">
                  <h1 className="text-lg font-black tracking-tighter text-primary uppercase leading-tight">Painel</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Sistema de Gestão</p>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">AJ</span>
              </div>
            </div>
          )}
          <main className="flex-1 overflow-y-auto bg-slate-50/30 dark:bg-transparent custom-scrollbar">
            <div className="max-w-7xl mx-auto pb-20">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
