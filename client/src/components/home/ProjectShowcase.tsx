import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Obsidian Residence",
    category: "Residential",
    image: "/images/project-kitchen.png",
    location: "New York, NY"
  },
  {
    id: 2,
    title: "Elysium Loft",
    category: "Penthouse",
    image: "/images/project-bedroom.png",
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    title: "Vantage HQ",
    category: "Commercial",
    image: "/images/project-office.png",
    location: "London, UK"
  },
  {
    id: 4,
    title: "Serenity Spa",
    category: "Hospitality",
    image: "/images/hero-luxury.png", // Reusing hero for now or generate another
    location: "Kyoto, Japan"
  }
];

export default function ProjectShowcase() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-6 md:pl-24 pr-12 md:pr-24">
          <div className="flex-shrink-0 w-[300px] md:w-[400px] flex flex-col justify-center pr-12">
            <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
              Curated <br /> Excellence
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
              A collection of our finest residential and commercial projects, redefining modern luxury through thoughtful design.
            </p>
          </div>
          
          {projects.map((project) => (
            <div key={project.id} className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[4/3] overflow-hidden bg-muted">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-12">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-primary uppercase tracking-widest text-xs font-bold mb-2 block">{project.category}</span>
                      <h3 className="text-2xl md:text-4xl font-serif text-white">{project.title}</h3>
                      <span className="text-white/60 text-sm mt-2 block">{project.location}</span>
                    </div>
                    <button className="p-3 md:p-4 rounded-full border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-white">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
