
import React from 'react';
import Logo from "./Logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { useAdmin } from "@/context/AdminContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { siteContent } = useAdmin();

    return (
        <nav className="py-4 px-4 md:px-6 border-b sticky top-0 bg-background/80 backdrop-blur-md z-30 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Desktop navigation */}
                <div className="flex items-center gap-6">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div className="hidden md:flex space-x-6 list-none">
                        <a href="/#services" className="hover:text-primary py-2 px-3 transition-colors font-medium">Serviços</a>
                        <a href="/#about" className="hover:text-primary py-2 px-3 transition-colors font-medium">Sobre</a>
                        <a href="/#location" className="hover:text-primary py-2 px-3 transition-colors font-medium">Localização</a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-3">
                        <Button variant="outline" className="px-4 border-primary/20 hover:bg-primary/5 transition-all" asChild>
                            <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                                {siteContent?.buttonLabels?.scheduleAppointment || "Cadastro de Pacientes"}
                            </a>
                        </Button>
                        <Button variant="default" className="px-4 shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300" asChild>
                            <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                                {siteContent?.buttonLabels?.whatsapp || "Agendar WhatsApp"}
                            </a>
                        </Button>
                    </div>

                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
