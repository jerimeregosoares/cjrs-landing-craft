
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { useIsMobile } from "@/hooks/use-mobile";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  rating?: number;
}

const TestimonialCard = ({ content, author, role, rating = 5 }: TestimonialCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-secondary/10 h-full">
      <CardHeader className="pb-2 pt-4 px-4 md:pt-6 md:px-6">
        <div className="text-3xl md:text-4xl text-primary">"</div>
        {rating && <StarRating value={rating} readonly size={isMobile ? 18 : 24} />}
      </CardHeader>
      <CardContent className="pb-4 px-4 md:pb-6 md:px-6">
        <p className="mb-4 italic text-gray-300 text-sm md:text-base">{content}</p>
        <div>
          <p className="font-semibold text-zinc-400 text-sm md:text-base">{author}</p>
          <p className="text-xs md:text-sm text-emerald-500">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
