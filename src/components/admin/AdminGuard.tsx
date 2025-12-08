import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isAuthenticated, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Wait for auth loading to complete
    if (loading) {
      return;
    }
    
    // Check if user is authenticated and has admin role
    if (!isAuthenticated || !isAdmin) {
      navigate('/admin/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);
  
  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Verificando autenticação...</p>
      </div>
    );
  }
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return <>{children}</>;
};

export default AdminGuard;
