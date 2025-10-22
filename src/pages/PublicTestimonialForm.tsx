import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

const testimonialSchema = z.object({
  author: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  content: z.string()
    .trim()
    .min(10, { message: "Depoimento deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "Depoimento deve ter no máximo 1000 caracteres" }),
  rating: z.number()
    .min(1, { message: "Por favor, selecione uma avaliação" })
    .max(5),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

const PublicTestimonialForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        author: data.author,
        content: data.content,
        rating: rating,
        role: "Paciente",
      });

      if (error) throw error;

      toast({
        title: "Depoimento enviado!",
        description: "Obrigado por compartilhar sua experiência conosco.",
      });

      // Reset form
      reset();
      setRating(5);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Não foi possível enviar seu depoimento. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D5016] to-[#1a3d0a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Deixe seu Depoimento
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Compartilhe sua experiência e ajude outros pacientes
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <span className="flex items-center justify-center gap-2">
            {isOpen ? "Fechar formulário" : "Inserir Avaliação"}
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </span>
        </Button>

        {/* Form Card */}
        {isOpen && (
          <Card className="bg-[#1E3A8A] border-0 shadow-2xl animate-scale-in">
            <CardContent className="p-6 md:p-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">
                    Nome
                  </label>
                  <Input
                    {...register("author")}
                    placeholder="Digite seu nome completo"
                    className="bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 py-6 text-lg focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.author && (
                    <p className="text-red-300 text-sm">{errors.author.message}</p>
                  )}
                </div>

                {/* Testimonial Field */}
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">
                    Depoimento
                  </label>
                  <Textarea
                    {...register("content")}
                    placeholder="Conte-nos sobre sua experiência..."
                    rows={5}
                    className="bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 text-lg resize-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.content && (
                    <p className="text-red-300 text-sm">{errors.content.message}</p>
                  )}
                </div>

                {/* Rating Field */}
                <div className="space-y-3">
                  <label className="text-white font-semibold text-lg">
                    Avaliação
                  </label>
                  <div className="flex justify-center py-2">
                    <StarRating
                      value={rating}
                      onChange={setRating}
                      size={40}
                    />
                  </div>
                  {errors.rating && (
                    <p className="text-red-300 text-sm text-center">
                      {errors.rating.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Depoimento"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-white/60 text-sm">
          <p>Seus dados são confidenciais e serão usados apenas para exibição no site.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicTestimonialForm;
