
import { useState } from "react";
import { Testimonial } from "@/types/admin";
import TestimonialItem from "./TestimonialItem";

interface TestimonialListProps {
  testimonials: Testimonial[];
  loading: boolean;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => Promise<void>;
}

const TestimonialList = ({
  testimonials,
  loading,
  onEdit,
  onDelete,
}: TestimonialListProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Depoimentos Existentes</h2>

      {loading ? (
        <p>Carregando depoimentos...</p>
      ) : testimonials.length === 0 ? (
        <p>Nenhum depoimento encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialItem
              key={testimonial.id}
              testimonial={testimonial}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TestimonialList;
