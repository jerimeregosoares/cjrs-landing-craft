
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 text-primary mb-4">{icon}</div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ServiceCard;
