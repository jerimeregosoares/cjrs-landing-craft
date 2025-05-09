
import { CarouselMedia } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import CarouselMediaUpload from "./CarouselMediaUpload";
import CarouselMediaList from "./CarouselMediaList";

interface MediaSectionProps {
  title: string;
  description: string;
  section: 'hero' | 'about';
  media: CarouselMedia[];
  uploading: boolean;
  uploadProgress: number;
  onImageUpload: (files: File[], section: 'hero' | 'about') => void;
  onVideoUpload: (files: File[], section: 'hero' | 'about') => void;
  onDeleteMedia: (id: string, type: string) => void;
  onMoveMedia: (id: string, direction: 'up' | 'down') => void;
  loading: boolean;
}

const MediaSection = ({
  title,
  description,
  section,
  media,
  uploading,
  uploadProgress,
  onImageUpload,
  onVideoUpload,
  onDeleteMedia,
  onMoveMedia,
  loading
}: MediaSectionProps) => {
  // Filter media by type
  const images = media.filter(m => m.file_type === 'image');
  const videos = media.filter(m => m.file_type === 'video');

  return (
    <div className="mb-6 space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <CarouselMediaUpload 
          type="image"
          count={images.length}
          maxCount={15}
          onUpload={(files) => onImageUpload(files, section)}
          uploading={uploading}
          progress={uploadProgress}
          title={`Imagens da Seção ${section === 'hero' ? 'Principal' : 'Sobre'}`}
        />
        
        {/* Video Upload */}
        <CarouselMediaUpload 
          type="video"
          count={videos.length}
          maxCount={10}
          onUpload={(files) => onVideoUpload(files, section)}
          uploading={uploading}
          progress={uploadProgress}
          title={`Vídeos da Seção ${section === 'hero' ? 'Principal' : 'Sobre'}`}
        />
      </div>
      
      {/* Media List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Mídia da Seção {section === 'hero' ? 'Principal' : '"Sobre o Profissional"'}
        </h3>
        <CarouselMediaList 
          media={media} 
          onMove={onMoveMedia}
          onDelete={onDeleteMedia}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MediaSection;
