
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
      <div className="flex min-h-screen bg-background text-foreground transition-colors duration-500">
        {!isMobile && <AdminSidebar isMobile={false} />}

        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsSidebarOpen(false)} />
        )}

        {isMobile && isSidebarOpen && (
          <AdminSidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {isMobile && (
            <div className="bg-background/80 backdrop-blur-md p-4 border-b border-border flex items-center shadow-sm z-30">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-primary/20 hover:bg-primary/10 transition-all"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5 text-primary" />
              </Button>
              <h1 className="text-xl font-bold ml-4 tracking-tight text-primary">Painel Admin</h1>
            </div>
          )}
          <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
