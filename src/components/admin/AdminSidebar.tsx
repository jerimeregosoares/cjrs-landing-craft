
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { Link, useLocation } from "react-router-dom";
import { Settings, FileText, MessageSquare, Link as LinkIcon, Image, X } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`w-full justify-start ${isActive ? "bg-slate-700" : ""}`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  </Link>
);

interface AdminSidebarProps {
  isMobile: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isMobile, isOpen = true, onClose }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout } = useAdmin();

  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <div className={`${isMobile ? 'fixed top-0 left-0 h-full z-50 bg-slate-800 w-64 shadow-lg' : 'w-64 min-h-screen'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between bg-slate-900">
          <h2 className="text-xl font-bold text-white">Painel Admin</h2>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5 text-white" />
            </Button>
          )}
        </div>

        <div className="flex-1 p-4 space-y-2 bg-slate-800">
          <NavItem
            to="/admin"
            icon={<Settings className="h-5 w-5" />}
            label="Dashboard"
            isActive={location.pathname === "/admin"}
          />
          <NavItem
            to="/admin/content"
            icon={<FileText className="h-5 w-5" />}
            label="Conteúdo"
            isActive={location.pathname === "/admin/content"}
          />
          <NavItem
            to="/admin/testimonials"
            icon={<MessageSquare className="h-5 w-5" />}
            label="Depoimentos"
            isActive={location.pathname === "/admin/testimonials"}
          />
          <NavItem
            to="/admin/links"
            icon={<LinkIcon className="h-5 w-5" />}
            label="Links"
            isActive={location.pathname === "/admin/links"}
          />
          <NavItem
            to="/admin/images"
            icon={<Image className="h-5 w-5" />}
            label="Imagens"
            isActive={location.pathname === "/admin/images"}
          />
        </div>

        <div className="p-4 bg-slate-900">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={() => {
              logout();
            }}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
