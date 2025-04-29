
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialCard from "./TestimonialCard";
import { useTestimonials, Testimonial } from "@/context/TestimonialContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TestimonialCarousel = () => {
  const { testimonials } = useTestimonials();
  const [isPaused, setIsPaused] = useState(false);
  const [api, setApi] = useState<any | null>(null);
  
  // Auto-rotate testimonials every 90 seconds
  useEffect(() => {
    if (!api || isPaused) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 90000); // 90 seconds
    
    return () => clearInterval(interval);
  }, [api, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Return nothing if there are no testimonials
  if (testimonials.length === 0) return null;

  return (
    <div className="relative max-w-5xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {testimonials.map((testimonial: Testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/1">
              <div className="p-1">
                <TestimonialCard
                  content={testimonial.content}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={togglePause}
        className="absolute bottom-0 right-0 bg-transparent border-none hover:bg-slate-800/30 text-white"
      >
        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
        <span className="sr-only">{isPaused ? "Play" : "Pause"} carousel</span>
      </Button>
    </div>
  );
};
