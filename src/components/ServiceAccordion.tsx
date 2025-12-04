import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Clipboard, Syringe, Heart, Activity } from "lucide-react";

const iconMap = {
  search: Search,
  clipboard: Clipboard,
  syringe: Syringe, 
  heart: Heart,
  activity: Activity
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

interface ServiceAccordionProps {
  services: Service[];
}

const ServiceAccordion = ({ services }: ServiceAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service) => {
        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Search;
        return (
          <AccordionItem 
            key={service.id} 
            value={service.id}
            className="border-b border-slate-700"
          >
            <AccordionTrigger className="text-orange-50 hover:text-orange-200 hover:no-underline py-4 px-2">
              <div className="flex items-center gap-3">
                <IconComponent className="h-5 w-5 text-primary" />
                <span className="font-semibold text-left">{service.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pb-4">
              <div className="bg-red-950 rounded-lg p-4 space-y-3">
                <p className="text-neutral-50 text-sm whitespace-pre-line">
                  {service.description}
                </p>
                {service.price && (
                  <div className="bg-red-900/50 p-2 rounded text-white text-sm font-medium">
                    {service.price}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ServiceAccordion;
