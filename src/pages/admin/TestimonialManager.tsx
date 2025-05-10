
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "@/types/admin";
import { useTestimonials } from "@/context/TestimonialContext";
import { useTestimonialManagement } from "@/hooks/useTestimonialManagement";

// Import the new components
import AddTestimonialForm from "@/components/admin/testimonials/AddTestimonialForm";
import TestimonialList from "@/components/admin/testimonials/TestimonialList";
import EditTestimonialDialog from "@/components/admin/testimonials/EditTestimonialDialog";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { deleteTestimonial, editTestimonial } = useTestimonialManagement();
  const { toast } = useToast();
  const { refreshTestimonials } = useTestimonials();
  
  // Dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<{
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number;
  } | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('timestamp', { ascending: false });
        
      if (error) {
        console.error("Erro ao carregar depoimentos:", error);
        return;
      }
      
      if (data) {
        const parsedTestimonials = data.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setTestimonials(parsedTestimonials);
      }
    } catch (error) {
      console.error("Erro ao carregar depoimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      await loadTestimonials();
      // Also refresh the TestimonialContext
      await refreshTestimonials();
      
      toast({
        title: "Depoimento excluído",
        description: "O depoimento foi removido com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao excluir depoimento:", error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir depoimento",
        description: "Ocorreu um erro ao tentar excluir o depoimento.",
      });
    }
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditingTestimonial({
      id: testimonial.id,
      content: testimonial.content,
      author: testimonial.author,
      role: testimonial.role,
      rating: testimonial.rating,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedTestimonial(null);
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial) return;
    
    try {
      await editTestimonial(editingTestimonial.id, {
        content: editingTestimonial.content,
        author: editingTestimonial.author,
        role: editingTestimonial.role,
        rating: editingTestimonial.rating,
      });
      
      setIsEditDialogOpen(false);
      setEditingTestimonial(null);
      await loadTestimonials();
      // Also refresh the TestimonialContext
      await refreshTestimonials();
      
      toast({
        title: "Depoimento atualizado",
        description: "O depoimento foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar depoimento:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar depoimento",
        description: "Ocorreu um erro ao tentar atualizar o depoimento.",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Depoimentos</h1>

        <AddTestimonialForm 
          onTestimonialAdded={async () => {
            await loadTestimonials();
            await refreshTestimonials();
          }} 
        />

        <TestimonialList 
          testimonials={testimonials}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
        
        <EditTestimonialDialog 
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          testimonial={selectedTestimonial}
          onSave={handleUpdateTestimonial}
          editingTestimonial={editingTestimonial}
          setEditingTestimonial={setEditingTestimonial}
        />
      </div>
    </AdminLayout>
  );
};

export default TestimonialManager;
