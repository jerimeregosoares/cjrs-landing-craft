
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { TestimonialProvider } from "./context/TestimonialContext";
import { AdminProvider } from "./context/AdminContext";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContentEditor from "./pages/admin/ContentEditor";
import TestimonialManager from "./pages/admin/TestimonialManager";
import LinkManager from "./pages/admin/LinkManager";
import ImageManager from "./pages/admin/ImageManager";
import ColorManager from "./pages/admin/ColorManager";
import AdminButton from "./components/AdminButton";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  // Apply theme colors on app load
  useEffect(() => {
    const siteContent = localStorage.getItem('siteContent');
    if (siteContent) {
      try {
        const parsedContent = JSON.parse(siteContent);
        if (parsedContent.theme) {
          document.documentElement.style.setProperty('--primary', parsedContent.theme.primaryColor || "#4CAF50");
          document.documentElement.style.setProperty('--secondary', parsedContent.theme.secondaryColor || "#A5D6A7");
          document.documentElement.style.setProperty('--accent', parsedContent.theme.accentColor || "#1A1A1A");
          document.documentElement.style.setProperty('--text', parsedContent.theme.textColor || "#333333");
          document.documentElement.style.setProperty('--background', parsedContent.theme.backgroundColor || "#FFFFFF");
        }
      } catch (error) {
        console.error("Error parsing theme:", error);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <TestimonialProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/content" element={<ContentEditor />} />
                <Route path="/admin/testimonials" element={<TestimonialManager />} />
                <Route path="/admin/links" element={<LinkManager />} />
                <Route path="/admin/images" element={<ImageManager />} />
                <Route path="/admin/colors" element={<ColorManager />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AdminButton />
            </BrowserRouter>
          </TestimonialProvider>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
