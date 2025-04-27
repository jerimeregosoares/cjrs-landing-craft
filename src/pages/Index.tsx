
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Heart, Search, Syringe, Clipboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="space-x-6">
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#about" className="hover:text-primary">About</a>
            <Button variant="default">Book Consultation</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Advanced Nursing Care with POCUS Technology</h1>
            <p className="text-xl mb-8 text-muted-foreground">Expert nursing consultations and procedures utilizing state-of-the-art ultrasound technology for precise diagnostics and treatment.</p>
            <Button size="lg" className="mr-4">Schedule Appointment</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Medical Professional"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Search />}
              title="POCUS Ultrasound"
              description="Advanced ultrasound diagnostics for obstetrics, gynecology, prostate, and full abdomen examinations."
            />
            <ServiceCard
              icon={<Clipboard />}
              title="Consultations"
              description="Comprehensive nursing consultations with experienced practitioners."
            />
            <ServiceCard
              icon={<Syringe />}
              title="Medical Procedures"
              description="Professional dressing changes, wart removal, and injectable treatments."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Patient Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              content="The POCUS ultrasound technology made my examination much more comfortable and precise."
              author="Sarah Johnson"
              role="Patient"
            />
            <TestimonialCard
              content="Exceptional care and attention to detail. The staff is highly professional."
              author="Michael Chen"
              role="Patient"
            />
            <TestimonialCard
              content="The most thorough consultation I've ever had. Highly recommended!"
              author="Emily Rodriguez"
              role="Patient"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4">Advanced nursing care with cutting-edge technology.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>POCUS Ultrasound</li>
              <li>Consultations</li>
              <li>Medical Procedures</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>123 Medical Center Dr</li>
              <li>contact@cjrs.care</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Hours</h3>
            <ul className="space-y-2">
              <li>Mon-Fri: 9am - 6pm</li>
              <li>Sat: 10am - 4pm</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
