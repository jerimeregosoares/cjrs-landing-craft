
import { useState } from "react";
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

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-100">
        {!isMobile && <AdminSidebar isMobile={false} />}
        
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
        )}
        
        {isMobile && isSidebarOpen && (
          <AdminSidebar isMobile={true} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        
        <div className="flex-1">
          {isMobile && (
            <div className="bg-white p-4 shadow flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-medium ml-4">Painel Administrativo</h1>
            </div>
          )}
          <main>{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
