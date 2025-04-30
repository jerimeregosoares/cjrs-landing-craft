
import { useEffect, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

export const TestimonialCarousel = () => {
  const { testimonials } = useTestimonials();
  const [isPaused, setIsPaused] = useState(false);
  const [api, setApi] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Function to advance to the next slide or restart
  const advanceSlide = useCallback(() => {
    if (!api) return;
    
    // If at the last slide, go back to the first
    if (currentIndex >= testimonials.length - 1) {
      api.scrollTo(0);
    } else {
      api.scrollNext();
    }
  }, [api, currentIndex, testimonials.length]);
  
  // Update the current index when the carousel changes
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);
  
  // Auto-rotate testimonials every 10 seconds
  useEffect(() => {
    if (!api || isPaused) return;
    
    const interval = setInterval(() => {
      advanceSlide();
    }, 10000); // 10 seconds
    
    return () => clearInterval(interval);
  }, [api, isPaused, advanceSlide]);

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
        <CarouselPrevious className={isMobile ? "-left-3 h-8 w-8 opacity-70" : "left-0"} />
        <CarouselNext className={isMobile ? "-right-3 h-8 w-8 opacity-70" : "right-0"} />
      </Carousel>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={togglePause}
        className={`absolute ${isMobile ? 'bottom-1 right-1 h-8 w-8' : 'bottom-0 right-0'} bg-transparent border-none hover:bg-slate-800/30 text-white`}
      >
        {isPaused ? <Play className={isMobile ? "h-4 w-4" : "h-5 w-5"} /> : <Pause className={isMobile ? "h-4 w-4" : "h-5 w-5"} />}
        <span className="sr-only">{isPaused ? "Play" : "Pause"} carousel</span>
      </Button>
    </div>
  );
};
