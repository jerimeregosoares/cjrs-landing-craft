
export interface SiteContent {
  hero: {
    title: string;
    description: string;
  };
  services: {
    title: string;
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
  };
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
