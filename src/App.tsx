
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
import BackupManager from "./pages/admin/BackupManager";
import UserManager from "./pages/admin/UserManager";
import AdminButton from "./components/AdminButton";
import PublicTestimonialForm from "./pages/PublicTestimonialForm";

import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  // Apply theme colors removed to avoid conflicts with HSL-based Tailwind system
  useEffect(() => {
    // Manual theme property setting removed to prevent CSS breakage
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AdminProvider>
            <TestimonialProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>

                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/avaliacoes" element={<PublicTestimonialForm />} />

                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/content" element={<ContentEditor />} />
                  <Route path="/admin/testimonials" element={<TestimonialManager />} />
                  <Route path="/admin/links" element={<LinkManager />} />
                  <Route path="/admin/images" element={<ImageManager />} />
                  <Route path="/admin/colors" element={<ColorManager />} />
                  <Route path="/admin/backup" element={<BackupManager />} />
                  <Route path="/admin/users" element={<UserManager />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <AdminButton />
              </BrowserRouter>
            </TestimonialProvider>
          </AdminProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
