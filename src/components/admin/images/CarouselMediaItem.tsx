
import { Button } from "@/components/ui/button";
import { CarouselMedia } from "@/context/AdminContext";
import { Trash, Move } from "lucide-react";

interface CarouselMediaItemProps {
  media: CarouselMedia;
  index: number;
  totalItems: number;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string, type: string) => void;
}

const CarouselMediaItem = ({ media, index, totalItems, onMove, onDelete }: CarouselMediaItemProps) => {
  return (
    <div className="flex items-center space-x-4 p-2 border rounded-md">
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
        {media.file_type === 'image' ? (
          <img 
            src={media.file_path} 
            alt={media.file_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            src={media.file_path}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium truncate">{media.file_name}</p>
        <p className="text-xs text-gray-500">
          {media.file_type === 'image' ? 'Imagem' : 'Vídeo'} • 
          Ordem: {media.order + 1} •
          {new Date(media.created_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          disabled={index === 0}
          onClick={() => onMove(media.id, 'up')}
          title="Mover para cima"
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={index === totalItems - 1}
          onClick={() => onMove(media.id, 'down')}
          title="Mover para baixo"
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(media.id, media.file_type)}
          title="Remover"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarouselMediaItem;
