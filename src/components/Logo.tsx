
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

const Logo = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 hero-gradient rounded-2xl"></div>
      <span className={`font-bold text-primary dark:text-primary ${isMobile ? 'text-xs' : 'text-base'}`}>
        {isMobile ? 'Enf. Jérime Soares' : 'Enfermeiro Jérime Rêgo Soares'}
      </span>
    </div>
  );
};

export default Logo;
