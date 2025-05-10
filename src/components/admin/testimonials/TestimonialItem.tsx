
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Edit, Trash2 } from "lucide-react";
import { Testimonial } from "@/types/admin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TestimonialItemProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => Promise<void>;
}

const TestimonialItem = ({
  testimonial,
  onEdit,
  onDelete,
}: TestimonialItemProps) => {
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <Card key={testimonial.id} className="relative">
      <CardContent className="pt-6">
        <div className="absolute top-3 right-3 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(testimonial)}
          >
            <Edit className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este depoimento? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => onDelete(testimonial.id)}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div>
          <StarRating value={testimonial.rating} readonly size={20} />
          <p className="my-3 italic">{testimonial.content}</p>
          <div className="mt-4">
            <p className="font-semibold">{testimonial.author}</p>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">{testimonial.role}</span>
              <span className="text-gray-500">{formatDate(testimonial.timestamp)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialItem;
