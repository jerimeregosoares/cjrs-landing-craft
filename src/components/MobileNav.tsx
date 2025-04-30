
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import Logo from './Logo';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center w-full">
        <Logo />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu} 
          className="relative z-50"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{isOpen ? 'Close Menu' : 'Open Menu'}</span>
        </Button>
      </div>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile menu content */}
      <div 
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } py-20 px-6 overflow-y-auto`}
      >
        <div className="flex flex-col space-y-6">
          <a 
            href="#services" 
            className="text-xl font-medium text-white hover:text-primary py-2 border-b border-gray-700"
            onClick={closeMenu}
          >
            Serviços
          </a>
          <a 
            href="#about" 
            className="text-xl font-medium text-white hover:text-primary py-2 border-b border-gray-700"
            onClick={closeMenu}
          >
            Sobre
          </a>
          <Button 
            variant="default" 
            className="mt-4 w-full" 
            asChild
          >
            <a href="https://wa.me/559191953465?text=GOSTARIA%20DE%20FAZER%20MEU%20AGENDAMENTO">
              Agendar WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
