
export interface SiteContent {
  hero: {
    title: string;
    description: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  about: {
    title: string;
    subtitle: string;
    description: string[];
  };
  testimonials: {
    title: string;
  };
  links: {
    scheduleAppointment: string;
    whatsapp: string;
    bookConsultation: string;
    testimonialForm: string;
  };
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    adminPrimaryColor: string;
    adminBackgroundColor: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number;
  timestamp: Date;
}

export interface CarouselMedia {
  id: string;
  file_path: string;
  file_type: 'image' | 'video';
  file_name: string;
  storage_path: string;
  created_at: Date;
  order: number;
  active: boolean;
  section?: 'hero' | 'about';
}
