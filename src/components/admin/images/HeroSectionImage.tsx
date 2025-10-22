
import { useAdmin } from "@/context/AdminContext";
import HeroImageUpload from "./HeroImageUpload";

interface HeroSectionImageProps {
  title: string;
  description: string;
  section: 'hero' | 'about' | 'testimonial-page';
}

const HeroSectionImage = ({ title, description, section }: HeroSectionImageProps) => {
  return (
    <HeroImageUpload 
      title={title} 
      description={description}
      section={section}
    />
  );
};

export default HeroSectionImage;
