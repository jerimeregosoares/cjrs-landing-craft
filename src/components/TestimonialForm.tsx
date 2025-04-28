
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { StarRating } from "./StarRating";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  comment: z.string().min(10, { message: "O depoimento deve ter pelo menos 10 caracteres" }),
  rating: z.number().min(1, { message: "Por favor, selecione uma avaliação" }),
});

export const TestimonialForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Testimonial submitted:", data);
    toast({
      title: "Depoimento enviado!",
      description: "Obrigado por compartilhar sua experiência.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#1E3A8A] p-6 rounded-lg max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} className="bg-white" />
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
              <FormLabel className="text-white">Depoimento</FormLabel>
              <FormControl>
                <Textarea placeholder="Compartilhe sua experiência" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Avaliação</FormLabel>
              <FormControl>
                <StarRating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#FFD700] text-[#1E3A8A] hover:bg-[#FFD700]/90">
          Enviar Depoimento
        </Button>
      </form>
    </Form>
  );
};
