
import React from 'react';
import Logo from "./Logo";
import { useAdmin } from "@/context/AdminContext";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
    const { siteContent } = useAdmin();

    const address = "Travessa José soares, 152, Fazendão";
    const googleMapsUrl = "https://maps.app.goo.gl/UX5noDFQnHFgHH357?g_st=awb";
    const searchEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

    return (
        <footer id="location" className="bg-slate-950 pt-20 pb-10 px-4 md:px-6 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
                    {/* Info Side */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-5 duration-700">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Nossa Localização
                            </h2>
                            <p className="text-slate-400 text-lg max-w-md">
                                Visite nosso consultório e receba um atendimento de excelência com a tecnologia que você merece.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <MapPin className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Endereço</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {address}<br />
                                        Fazendão, Anajás/PA
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <Clock className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Atendimento</h3>
                                    <p className="text-slate-400 text-sm">
                                        Seg - Sex: 09:00 - 18:00<br />
                                        Sáb e Dom: Fechado
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <Phone className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Contato</h3>
                                    <p className="text-slate-400 text-sm">
                                        (91) 98595-8042
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                    <Mail className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">E-mail</h3>
                                    <p className="text-slate-400 text-sm break-all">
                                        jerimeregosoares@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="default"
                                className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all bg-primary hover:bg-primary/90 text-white"
                                asChild
                            >
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 w-4 h-4" />
                                    Como Chegar no Google Maps
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/5 animate-in fade-in slide-in-from-right-5 duration-700">
                        <iframe
                            title="Localização do Consultório"
                            src={searchEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[0.4] contrast-[1.1] invert-[0.9] hue-rotate-[180deg] opacity-80 hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs text-center md:text-left font-medium">
                    <p>© {new Date().getFullYear()} Enfermeiro Jérime Rêgo Soares. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
