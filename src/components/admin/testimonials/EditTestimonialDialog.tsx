
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";

interface EditTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number;
  } | null;
  onSave: () => void;
  editingTestimonial: {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number;
  } | null;
  setEditingTestimonial: (testimonial: {
    id: string;
    content: string;
    author: string;
    role: string;
    rating: number;
  } | null) => void;
}

const EditTestimonialDialog = ({
  isOpen,
  onClose,
  testimonial,
  onSave,
  editingTestimonial,
  setEditingTestimonial,
}: EditTestimonialDialogProps) => {
  // Reset the form when the dialog opens or the testimonial changes
  useEffect(() => {
    if (testimonial && isOpen) {
      setEditingTestimonial(testimonial);
    }
  }, [testimonial, isOpen, setEditingTestimonial]);

  if (!editingTestimonial) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Depoimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-author">Nome do Cliente</Label>
            <Input
              id="edit-author"
              value={editingTestimonial.author}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  author: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Função</Label>
            <Input
              id="edit-role"
              value={editingTestimonial.role}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  role: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-content">Depoimento</Label>
            <Textarea
              id="edit-content"
              value={editingTestimonial.content}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  content: e.target.value,
                })
              }
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Avaliação</Label>
            <div className="py-2">
              <StarRating
                value={editingTestimonial.rating}
                onChange={(value) =>
                  setEditingTestimonial({
                    ...editingTestimonial,
                    rating: value,
                  })
                }
                size={24}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTestimonialDialog;
