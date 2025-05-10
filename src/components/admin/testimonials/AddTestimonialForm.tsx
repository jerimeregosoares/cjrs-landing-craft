
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/StarRating";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTestimonialManagement } from "@/hooks/useTestimonialManagement";

interface AddTestimonialFormProps {
  onTestimonialAdded: () => Promise<void>;
}

const AddTestimonialForm = ({ onTestimonialAdded }: AddTestimonialFormProps) => {
  const { toast } = useToast();
  const { addTestimonial } = useTestimonialManagement();
  const isMobile = useIsMobile();
  
  // Form state
  const [newTestimonial, setNewTestimonial] = useState({
    content: "",
    author: "",
    role: "Paciente",
    rating: 5,
  });

  const handleAddTestimonial = async () => {
    if (newTestimonial.content.length < 10 || newTestimonial.author.length < 2) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar depoimento",
        description: "Preencha todos os campos corretamente.",
      });
      return;
    }

    try {
      await addTestimonial(newTestimonial);
      setNewTestimonial({
        content: "",
        author: "",
        role: "Paciente",
        rating: 5,
      });
      
      await onTestimonialAdded();
      
      toast({
        title: "Depoimento adicionado",
        description: "O depoimento foi adicionado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao adicionar depoimento:", error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar depoimento",
        description: "Ocorreu um erro ao tentar adicionar o depoimento.",
      });
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Adicionar Novo Depoimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-author">Nome do Cliente</Label>
            <Input
              id="new-author"
              value={newTestimonial.author}
              onChange={(e) =>
                setNewTestimonial({ ...newTestimonial, author: e.target.value })
              }
              placeholder="Nome do cliente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-role">Função/Cargo</Label>
            <Input
              id="new-role"
              value={newTestimonial.role}
              onChange={(e) =>
                setNewTestimonial({ ...newTestimonial, role: e.target.value })
              }
              placeholder="Ex: Paciente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-content">Depoimento</Label>
            <Textarea
              id="new-content"
              value={newTestimonial.content}
              onChange={(e) =>
                setNewTestimonial({ ...newTestimonial, content: e.target.value })
              }
              placeholder="Digite o depoimento do cliente"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Avaliação</Label>
            <div className="py-2">
              <StarRating
                value={newTestimonial.rating}
                onChange={(value) =>
                  setNewTestimonial({ ...newTestimonial, rating: value })
                }
                size={isMobile ? 24 : 32}
              />
            </div>
          </div>

          <Button onClick={handleAddTestimonial}>
            Adicionar Depoimento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddTestimonialForm;
