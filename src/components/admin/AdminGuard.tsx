
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        navigate('/admin/login');
      } else {
        setIsChecking(false);
      }
    };
    
    // Small delay to ensure context is fully loaded
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);
  
  if (isChecking) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Verificando autenticação...</p>
    </div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
};

export default AdminGuard;
