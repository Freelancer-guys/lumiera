import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DesignInspirations() {
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

  const styles = [
    {
      id: 1,
      name: "Contemporary Luxury",
      description: "Clean lines, premium materials, and sophisticated minimalism. Perfect for the modern professional.",
      image: "/images/hero-luxury.png",
      colors: ["#D4AF37", "#2C2C2C", "#E8E8E8"],
      materials: ["Marble", "Brass", "Walnut"],
      mood: "Elegant, Sophisticated, Timeless",
    },
    {
      id: 2,
      name: "Warm Bohemian",
      description: "Eclectic, layered, and full of personality. Celebrates art, culture, and personal expression.",
      image: "/images/project-bedroom.png",
      colors: ["#B8860B", "#8B4513", "#D2B48C"],
      materials: ["Rattan", "Terracotta", "Natural Textiles"],
      mood: "Artistic, Warm, Inviting",
    },
    {
      id: 3,
      name: "Industrial Chic",
      description: "Raw elements, exposed structures, and refined edges. Modern meets industrial heritage.",
      image: "/images/project-kitchen.png",
      colors: ["#36454F", "#696969", "#A9A9A9"],
      materials: ["Steel", "Concrete", "Reclaimed Wood"],
      mood: "Bold, Urban, Authentic",
    },
    {
      id: 4,
      name: "Scandinavian Zen",
      description: "Minimalist, functional, and naturally beautiful. Less is more, but every piece matters.",
      image: "/images/project-office.png",
      colors: ["#F5F5F5", "#708090", "#228B22"],
      materials: ["Light Oak", "Linen", "Natural Stone"],
      mood: "Calm, Functional, Pure",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Find Your Inspiration</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Design Styles Gallery</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our signature design styles. Click to see details, color palettes, and materials
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => setSelectedStyle(style.id)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-900">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 group-hover:bg-black/40 transition-colors">
                  <h3 className="text-3xl font-serif text-white mb-2 group-hover:translate-y-0 translate-y-2 transition-transform">
                    {style.name}
                  </h3>
                  <button className="text-primary text-sm font-semibold uppercase tracking-widest group-hover:text-primary/100">
                    View Details →
                  </button>
                </div>
              </div>
              
              {/* Color Palette */}
              <div className="flex gap-2">
                {style.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-12 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedStyle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setSelectedStyle(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {styles.find((s) => s.id === selectedStyle) && (
                  <>
                    <div className="relative">
                      <img
                        src={styles.find((s) => s.id === selectedStyle)?.image}
                        alt={styles.find((s) => s.id === selectedStyle)?.name}
                        className="w-full aspect-square object-cover"
                      />
                      <button
                        onClick={() => setSelectedStyle(null)}
                        className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="p-8 space-y-8">
                      <div>
                        <h2 className="text-4xl font-serif text-white mb-3">
                          {styles.find((s) => s.id === selectedStyle)?.name}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {styles.find((s) => s.id === selectedStyle)?.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Color Palette</h3>
                          <div className="flex gap-3">
                            {styles.find((s) => s.id === selectedStyle)?.colors.map((color, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 rounded-lg border-2 border-white/10 hover:border-primary transition-colors cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Mood & Feel</h3>
                          <p className="text-primary font-medium text-sm leading-relaxed">
                            {styles.find((s) => s.id === selectedStyle)?.mood}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Key Materials</h3>
                        <div className="flex flex-wrap gap-3">
                          {styles.find((s) => s.id === selectedStyle)?.materials.map((material, i) => (
                            <div
                              key={i}
                              className="px-4 py-2 border border-primary/30 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                            >
                              {material}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStyle(null);
                          const element = document.getElementById("contact");
                          if (element) element.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-lg transition-colors"
                      >
                        Discuss This Style with Us
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
