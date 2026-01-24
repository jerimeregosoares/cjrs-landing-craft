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
            className="border-slate-200 dark:border-white/10"
          >
            <AccordionTrigger className="text-slate-900 dark:text-gray-50 hover:text-primary dark:hover:text-primary hover:no-underline py-6 px-4 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="font-bold text-lg text-left tracking-tight">{service.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4 border border-slate-100 dark:border-white/5 shadow-inner">
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
                {service.price && (
                  <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-bold">
                    Investimento: {service.price}
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
