import { motion } from "framer-motion";
import { Check, Clock, Box, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Turnkey Service",
    description: "From concept to completion, we handle every detail so you don't have to."
  },
  {
    icon: Box,
    title: "3D Visualization",
    description: "Photorealistic renderings that let you experience your space before it exists."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Rigorous project management ensuring your home is ready when promised."
  },
  {
    icon: Check,
    title: "Transparent Budget",
    description: "Detailed cost breakdowns with no hidden fees or surprise expenses."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-card border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
              Why discerning clients <br /> choose Lumiera
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We believe luxury lies in the details. Our comprehensive approach ensures that the journey of creating your home is as exceptional as the final result.
            </p>
            <button className="text-white border-b border-primary pb-1 hover:text-primary transition-colors uppercase tracking-widest text-xs font-bold">
              Learn more about our process
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all duration-300 group"
              >
                <reason.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-serif text-white mb-4">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
