import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudy from "@/components/home/CaseStudy";
import Testimonials from "@/components/home/Testimonials";
import ContactPopup from "@/components/home/ContactPopup";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <ProjectShowcase />
      <CaseStudy />
      <WhyChooseUs />
      <Testimonials />
      
      {/* Simple Footer for now */}
      <footer id="contact" className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif text-white mb-2">LUMIERA</h2>
            <p className="text-white/30 text-xs uppercase tracking-widest">Timeless Luxury Interiors</p>
          </div>
          
          <div className="flex justify-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider">Pinterest</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider">LinkedIn</a>
          </div>
          
          <div className="text-white/30 text-xs">
            © 2024 Lumiera Interiors.
          </div>
        </div>
      </footer>

      <ContactPopup />
    </main>
  );
}
