
import { ScrollArea } from "@/components/ui/scroll-area";
import { CarouselMedia } from "@/context/AdminContext";
import CarouselMediaItem from "./CarouselMediaItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CarouselMediaListProps {
  media: CarouselMedia[];
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDelete: (id: string, type: string) => void;
}

const CarouselMediaList = ({ media, onMove, onDelete }: CarouselMediaListProps) => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>Mídias do Carrossel ({media.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {media.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nenhuma mídia adicionada ao carrossel. Adicione imagens ou vídeos acima.
          </p>
        ) : (
          <ScrollArea className="h-[400px] md:h-[500px]">
            <div className="space-y-2">
              {media.map((item, index) => (
                <CarouselMediaItem 
                  key={item.id}
                  media={item}
                  index={index}
                  totalItems={media.length}
                  onMove={onMove}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default CarouselMediaList;
