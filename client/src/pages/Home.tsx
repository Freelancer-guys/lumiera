import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudy from "@/components/home/CaseStudy";
import Testimonials from "@/components/home/Testimonials";
import ContactPopup from "@/components/home/ContactPopup";
import { motion } from "framer-motion";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContactOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <Hero />
      <ProjectShowcase />
      <section id="studio">
        <CaseStudy />
      </section>
      <WhyChooseUs />
      <section id="journal">
        <Testimonials />
      </section>
      
      {/* Simple Footer for now */}
      <footer id="contact" className="bg-black py-32 border-t border-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-[0.03]" 
        />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-4">LUMIERA</h2>
            <p className="text-primary uppercase tracking-[0.5em] text-xs">Architectural Poetics</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-12">
              <a href="#" className="group relative overflow-hidden text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Instagram
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </a>
              <a href="#" className="group relative overflow-hidden text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                Pinterest
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </a>
              <a href="#" className="group relative overflow-hidden text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                LinkedIn
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </a>
            </div>
            <div className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
              © 2024 Lumiera Studio. Crafted for Excellence.
            </div>
          </div>
        </div>
      </footer>

      <ContactPopup isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
    </main>
  );
}
