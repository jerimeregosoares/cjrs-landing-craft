
import { useState, useEffect, useRef } from "react";
import { useAdmin } from "@/context/AdminContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaCarouselProps {
  section: 'hero' | 'about';
  fallbackImageSrc?: string;
  height?: string;
}

export const MediaCarousel = ({ section, fallbackImageSrc, height = "h-[250px] md:h-[500px]" }: MediaCarouselProps) => {
  const { carouselMedia } = useAdmin();
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const [api, setApi] = useState<any | null>(null);

  // Filter media by section
  const filteredMedia = carouselMedia.filter(media => 
    media.active && (media.section === section || (!media.section && section === 'hero'))
  );
  const orderedMedia = [...filteredMedia].sort((a, b) => a.order - b.order);
  
  // Function to advance to the next slide
  const advanceSlide = () => {
    if (!api) return;
    
    if (currentIndex >= orderedMedia.length - 1) {
      api.scrollTo(0);
    } else {
      api.scrollNext();
    }
  };
  
  // Update current index when carousel changes
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
  
  // Auto-rotate media every 7 seconds
  useEffect(() => {
    if (!api || isPaused || orderedMedia.length <= 1) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      advanceSlide();
    }, 7000); // 7 seconds interval
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, isPaused, currentIndex, orderedMedia.length]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Return default image if no media
  if (orderedMedia.length === 0) {
    return (
      <div className={`w-full ${height} overflow-hidden rounded-2xl`}>
        <img 
          alt="Imagem padrão" 
          className="w-full h-full object-cover"
          src={fallbackImageSrc || "/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {orderedMedia.map((media) => (
            <CarouselItem key={media.id} className="overflow-hidden">
              <div className={`w-full ${height}`}>
                {media.file_type === 'image' ? (
                  <img 
                    src={media.file_path}
                    alt={media.file_name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <video 
                    className="w-full h-full object-cover object-center"
                    autoPlay={!isPaused}
                    muted
                    loop
                    playsInline
                  >
                    <source src={media.file_path} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                )}
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

export default MediaCarousel;
