import { Card, CardContent, CardHeader } from "@/components/ui/card";
interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
}
const TestimonialCard = ({
  content,
  author,
  role
}: TestimonialCardProps) => {
  return <Card className="bg-secondary/10">
      <CardHeader className="pb-2">
        <div className="text-4xl text-primary">"</div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 italic text-gray-300">{content}</p>
        <div>
          <p className="font-semibold py-0 px-0 text-left text-zinc-400">{author}</p>
          <p className="text-sm text-emerald-500">{role}</p>
        </div>
      </CardContent>
    </Card>;
};
export default TestimonialCard;