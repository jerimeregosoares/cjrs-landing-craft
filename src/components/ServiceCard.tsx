
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  price
}: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow rounded-none h-full">
      <CardHeader className="rounded bg-red-950 p-4 md:p-6 h-full">
        <div className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 md:mb-4 flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="mb-2 font-bold text-lg md:text-xl text-slate-50">{title}</CardTitle>
        <CardDescription className="font-medium text-sm md:text-base text-neutral-50">
          {description}
        </CardDescription>
        {price && (
          <div className="mt-4 bg-red-900/50 p-2 rounded text-white text-sm font-medium">
            {price}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ServiceCard;
