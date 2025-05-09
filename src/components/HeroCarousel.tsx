
import MediaCarousel from "./MediaCarousel";

const HeroCarousel = () => {
  return <MediaCarousel 
    section="hero" 
    objectFit="contain"
    aspectRatio={16/9}
  />;
};

export default HeroCarousel;
