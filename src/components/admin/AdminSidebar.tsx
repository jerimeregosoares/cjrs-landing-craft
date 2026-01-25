
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
      className={`relative w-full justify-start h-11 rounded-lg transition-all duration-500 overflow-hidden ${isActive
        ? "bg-primary text-white shadow-[0_0_20px_rgba(var(--primary),0.2)] border border-white/10"
        : "hover:bg-primary/5 hover:text-primary dark:text-slate-400 dark:hover:text-primary border border-transparent"
        }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 w-1 h-full bg-white opacity-50 shadow-[0_0_10px_white]" />
      )}
      <div className={`p-1.5 rounded-md transition-all duration-500 ${isActive ? "text-white scale-110" : "text-slate-500 group-hover:text-primary group-hover:scale-110"}`}>
        {icon}
      </div>
      <span className={`ml-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
        {label}
      </span>
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
    ? "fixed top-0 left-0 h-full z-50 w-72 shadow-2xl transition-all duration-500 transform animate-in slide-in-from-left"
    : "w-72 h-screen sticky top-0 border-r border-border/50 bg-slate-50/50 dark:bg-slate-950/20 backdrop-blur-3xl overflow-hidden";

  return (
    <div className={sidebarClasses}>
      {/* Sidebar background details */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] -left-[20%] w-[150%] h-[30%] bg-primary/5 blur-[120px] rounded-full rotate-12" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative flex flex-col h-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-500">
        <div className="p-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-11 h-11 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden">
                <Settings className="text-white dark:text-slate-950 h-6 w-6 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">Admin</h2>
              <p className="text-[10px] font-bold text-primary uppercase mt-1 tracking-tighter">Core Engine v2.0</p>
            </div>
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl hover:bg-slate-100 dark:hover:bg-white/5">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <div className="px-3 mb-3 flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Navigation</p>
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800" />
            </div>
            <NavItem
              to="/admin"
              icon={<Settings className="h-4 w-4" />}
              label="Overview"
              isActive={location.pathname === "/admin"}
            />
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-3 flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Modules</p>
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
              <NavItem
                to="/admin/content"
                icon={<FileText className="h-4 w-4" />}
                label="Content"
                isActive={location.pathname === "/admin/content"}
              />
              <NavItem
                to="/admin/testimonials"
                icon={<MessageSquare className="h-4 w-4" />}
                label="Feedback"
                isActive={location.pathname === "/admin/testimonials"}
              />
              <NavItem
                to="/admin/images"
                icon={<Image className="h-4 w-4" />}
                label="Assets"
                isActive={location.pathname === "/admin/images"}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="px-3 mb-3 flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Settings</p>
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
              <NavItem
                to="/admin/colors"
                icon={<Palette className="h-4 w-4" />}
                label="Branding"
                isActive={location.pathname === "/admin/colors"}
              />
              <NavItem
                to="/admin/links"
                icon={<LinkIcon className="h-4 w-4" />}
                label="Network"
                isActive={location.pathname === "/admin/links"}
              />
              <NavItem
                to="/admin/backup"
                icon={<Database className="h-4 w-4" />}
                label="Storage"
                isActive={location.pathname === "/admin/backup"}
              />
              <NavItem
                to="/admin/users"
                icon={<Users className="h-4 w-4" />}
                label="Security"
                isActive={location.pathname === "/admin/users"}
              />
            </div>
          </div>
        </div>

        <div className="p-6 mt-auto border-t border-border/50 space-y-4 bg-slate-50/50 dark:bg-slate-900/10">
          <div className="flex items-center justify-between px-2 bg-slate-900/5 dark:bg-white/5 p-2 rounded-xl border border-slate-200/50 dark:border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flux Interface</span>
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            className="w-full h-11 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all duration-500 font-bold uppercase tracking-widest text-[10px]"
            onClick={() => {
              logout();
            }}
          >
            System Shutdown
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
