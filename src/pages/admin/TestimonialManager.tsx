
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Testimonial } from "@/context/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/StarRating";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Edit, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { deleteTestimonial, addTestimonial, editTestimonial } = useAdmin();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Form state
  const [newTestimonial, setNewTestimonial] = useState({
    content: "",
    author: "",
    role: "Paciente",
    rating: 5,
  });

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

  const loadTestimonials = () => {
    try {
      const storedTestimonials = localStorage.getItem("testimonials");
      if (storedTestimonials) {
        const parsedTestimonials = JSON.parse(storedTestimonials).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setTestimonials(parsedTestimonials);
      }
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    loadTestimonials();
    toast({
      title: "Depoimento excluído",
      description: "O depoimento foi removido com sucesso.",
    });
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.content.length < 10 || newTestimonial.author.length < 2) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar depoimento",
        description: "Preencha todos os campos corretamente.",
      });
      return;
    }

    addTestimonial(newTestimonial);
    setNewTestimonial({
      content: "",
      author: "",
      role: "Paciente",
      rating: 5,
    });
    loadTestimonials();
    
    toast({
      title: "Depoimento adicionado",
      description: "O depoimento foi adicionado com sucesso.",
    });
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    
    editTestimonial(editingTestimonial.id, {
      content: editingTestimonial.content,
      author: editingTestimonial.author,
      role: editingTestimonial.role,
      rating: editingTestimonial.rating,
    });
    
    setEditingTestimonial(null);
    loadTestimonials();
    
    toast({
      title: "Depoimento atualizado",
      description: "O depoimento foi atualizado com sucesso.",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Depoimentos</h1>

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

        <h2 className="text-2xl font-semibold mb-4">Depoimentos Existentes</h2>

        {loading ? (
          <p>Carregando depoimentos...</p>
        ) : testimonials.length === 0 ? (
          <p>Nenhum depoimento encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="pt-6">
                  <div className="absolute top-3 right-3 flex space-x-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingTestimonial({
                            id: testimonial.id,
                            content: testimonial.content,
                            author: testimonial.author,
                            role: testimonial.role,
                            rating: testimonial.rating,
                          })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Depoimento</DialogTitle>
                        </DialogHeader>
                        {editingTestimonial && (
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
                        )}
                        <DialogFooter>
                          <Button onClick={handleUpdateTestimonial}>
                            Salvar Alterações
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

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
                            onClick={() => handleDelete(testimonial.id)}
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
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TestimonialManager;
