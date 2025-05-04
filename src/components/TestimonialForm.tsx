
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { StarRating } from "./StarRating";
import { useToast } from "@/hooks/use-toast";
import { useTestimonials } from "@/context/TestimonialContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDown, ChevronUp } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres"
  }),
  comment: z.string().min(10, {
    message: "O depoimento deve ter pelo menos 10 caracteres"
  }),
  rating: z.number().min(1, {
    message: "Por favor, selecione uma avaliação"
  })
});

export const TestimonialForm = () => {
  const { toast } = useToast();
  const { addTestimonial } = useTestimonials();
  const isMobile = useIsMobile();
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      comment: "",
      rating: 0
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Adiciona o novo depoimento ao contexto
    addTestimonial({
      content: data.comment,
      author: data.name,
      role: "Paciente",
      rating: data.rating
    });
    
    toast({
      title: "Depoimento enviado!",
      description: "Obrigado por compartilhar sua experiência."
    });
    
    form.reset();
    setIsFormVisible(false); // Esconde o formulário após envio
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        type="button" 
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-[#FFD700] text-[#1E3A8A] hover:bg-[#FFD700]/90 py-5 text-base md:text-lg font-medium mb-4 flex justify-center items-center"
      >
        {isFormVisible ? (
          <>
            Fechar formulário <ChevronUp className="ml-2 h-5 w-5" />
          </>
        ) : (
          <>
            Inserir Avaliação <ChevronDown className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      {isFormVisible && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-[#1E3A8A] p-4 md:p-6 rounded-lg transition-all">
            <FormField 
              control={form.control} 
              name="name" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm md:text-base">Nome</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Seu nome" 
                      {...field} 
                      className="bg-white text-sm md:text-base py-5" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control} 
              name="comment" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm md:text-base">Depoimento</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Compartilhe sua experiência" 
                      {...field} 
                      className="bg-white text-sm md:text-base min-h-[100px]" 
                    />
                  </FormControl>
                  <FormMessage className="text-sm md:text-base text-rose-400" />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control} 
              name="rating" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm md:text-base">Avaliação</FormLabel>
                  <FormControl>
                    <StarRating 
                      value={field.value} 
                      onChange={field.onChange} 
                      size={isMobile ? 20 : 24}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-[#FFD700] text-[#1E3A8A] hover:bg-[#FFD700]/90 py-5 text-base md:text-lg font-medium"
            >
              Enviar Depoimento
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
