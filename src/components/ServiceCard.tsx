import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const ServiceCard = ({
  title,
  description,
  icon
}: ServiceCardProps) => {
  return <Card className="hover:shadow-lg transition-shadow rounded-none">
      <CardHeader className="rounded bg-red-950 mx-[2px] py-[11px]">
        <div className="w-12 h-12 text-primary mb-4">{icon}</div>
        <CardTitle className="mb-2 font-bold text-xl text-slate-50 my-0">{title}</CardTitle>
        <CardDescription className="mx-0 my-[2px] py-0 font-bold text-neutral-50">{description}</CardDescription>
      </CardHeader>
    </Card>;
};
export default ServiceCard;