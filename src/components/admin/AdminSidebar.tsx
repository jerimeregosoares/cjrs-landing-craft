
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { Link, useLocation } from "react-router-dom";
import { Settings, FileText, MessageSquare, Link as LinkIcon, Image, X, Palette, Database, Users } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

import { ThemeToggle } from "@/components/ThemeToggle";

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link to={to} className="block group">
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${isActive
          ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
          : "hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:text-primary"
        }`}
    >
      <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}`}>
        {icon}
      </div>
      <span className="ml-3 font-medium">{label}</span>
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

  const sidebarClasses = isMobile
    ? "fixed top-0 left-0 h-full z-50 w-72 shadow-2xl transition-transform duration-300"
    : "w-72 h-screen sticky top-0 border-r border-border bg-slate-50 dark:bg-slate-900/50";

  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col h-full bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="p-6 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Settings className="text-white h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-gray-50">Admin</h2>
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Principal</p>
          </div>
          <NavItem
            to="/admin"
            icon={<Settings className="h-5 w-5" />}
            label="Dashboard"
            isActive={location.pathname === "/admin"}
          />

          <div className="px-3 mt-6 mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Conteúdo</p>
          </div>
          <NavItem
            to="/admin/content"
            icon={<FileText className="h-5 w-5" />}
            label="Textos do Site"
            isActive={location.pathname === "/admin/content"}
          />
          <NavItem
            to="/admin/testimonials"
            icon={<MessageSquare className="h-5 w-5" />}
            label="Depoimentos"
            isActive={location.pathname === "/admin/testimonials"}
          />
          <NavItem
            to="/admin/images"
            icon={<Image className="h-5 w-5" />}
            label="Galeria de Mídia"
            isActive={location.pathname === "/admin/images"}
          />

          <div className="px-3 mt-6 mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Configurações</p>
          </div>
          <NavItem
            to="/admin/colors"
            icon={<Palette className="h-5 w-5" />}
            label="Identidade Visual"
            isActive={location.pathname === "/admin/colors"}
          />
          <NavItem
            to="/admin/links"
            icon={<LinkIcon className="h-5 w-5" />}
            label="Links & Contato"
            isActive={location.pathname === "/admin/links"}
          />
          <NavItem
            to="/admin/backup"
            icon={<Database className="h-5 w-5" />}
            label="Dados & Backup"
            isActive={location.pathname === "/admin/backup"}
          />
          <NavItem
            to="/admin/users"
            icon={<Users className="h-5 w-5" />}
            label="Acesso"
            isActive={location.pathname === "/admin/users"}
          />
        </div>

        <div className="p-4 mt-auto border-t border-border space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-slate-500">Tema</span>
            <ThemeToggle />
          </div>
          <Button
            variant="destructive"
            className="w-full h-11 rounded-xl shadow-lg shadow-destructive/10 hover:shadow-destructive/20 transition-all duration-300 font-bold"
            onClick={() => {
              logout();
            }}
          >
            Encerrar Sessão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
