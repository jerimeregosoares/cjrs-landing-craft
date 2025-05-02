
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

interface CarouselMediaUploadProps {
  type: 'image' | 'video';
  count: number;
  maxCount: number;
  onUpload: (files: File[]) => void;
  uploading: boolean;
  progress: number;
}

const CarouselMediaUpload = ({ 
  type, 
  count, 
  maxCount, 
  onUpload, 
  uploading, 
  progress 
}: CarouselMediaUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const fileExtensions = type === 'image' 
      ? ['image/png', 'image/jpeg', 'image/jpg']
      : ['video/mp4'];
      
    // Convert FileList to array and filter for supported formats
    const files = Array.from(e.target.files).filter(file => 
      fileExtensions.includes(file.type)
    );
    
    if (files.length > 0) {
      onUpload(files);
    }
    
    // Reset file input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {type === 'image' ? 'Imagens do Carrossel' : 'Vídeos do Carrossel'}
        </CardTitle>
        <CardDescription>
          {type === 'image' 
            ? `Adicione até ${maxCount} imagens (PNG, JPEG)` 
            : `Adicione até ${maxCount} vídeos (MP4, máx. 10 segundos)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="file"
              id={`carousel-${type}s`}
              accept={type === 'image' ? "image/png,image/jpeg,image/jpg" : "video/mp4"}
              multiple
              onChange={handleFileUpload}
              className="sr-only"
            />
            <label
              htmlFor={`carousel-${type}s`}
              className="cursor-pointer py-2 px-4 rounded-md bg-slate-50 hover:bg-slate-100 border text-sm font-medium flex items-center"
            >
              <Upload className="mr-2 h-4 w-4" />
              Escolher {type === 'image' ? 'imagens' : 'vídeos'}
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {count}/{maxCount} {type === 'image' ? 'imagens' : 'vídeos'}
            </span>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-center text-sm text-gray-500">Enviando... {progress}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarouselMediaUpload;
