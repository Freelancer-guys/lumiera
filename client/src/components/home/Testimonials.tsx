import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Lumiera didn't just design a house; they curated a lifestyle. The attention to detail is simply unmatched in the industry.",
    author: "Elena V.",
    role: "Private Client, New York"
  },
  {
    id: 2,
    text: "Professional, visionary, and incredibly talented. They transformed our headquarters into a space that truly reflects our brand's prestige.",
    author: "Marcus Chen",
    role: "CEO, Vantage Corp"
  },
  {
    id: 3,
    text: "The team understood our vision immediately. The result is a home that feels both grand and intimately personal.",
    author: "Sarah & James L.",
    role: "Residential Project, London"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-primary/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <Quote className="w-12 h-12 text-primary/20 mx-auto mb-12" />
        
        <div className="relative h-[300px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0, 
                scale: activeIndex === index ? 1 : 0.9,
                filter: activeIndex === index ? "blur(0px)" : "blur(10px)",
                zIndex: activeIndex === index ? 10 : 0
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col justify-center items-center"
            >
              <h3 className="text-2xl md:text-4xl font-serif text-white leading-relaxed italic mb-8">
                "{testimonial.text}"
              </h3>
              <div className="text-center">
                <span className="text-primary uppercase tracking-widest text-xs font-bold block mb-2">
                  {testimonial.author}
                </span>
                <span className="text-muted-foreground text-sm">
                  {testimonial.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-12 h-[2px] transition-all duration-300 ${
                activeIndex === index ? "bg-primary" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
