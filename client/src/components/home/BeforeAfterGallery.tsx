import { useState } from "react";
import { motion } from "framer-motion";

export default function BeforeAfterGallery() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const transformations = [
    {
      title: "Complete Space Transformation",
      before: "/images/case-study-before.png",
      after: "/images/case-study-after.png",
    },
  ];

  const handleSlide = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Transformations</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">See the Difference</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag the slider to see how we transform spaces from concept to completion
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {transformations.map((transformation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-serif text-white">{transformation.title}</h3>
              <div
                className="relative w-full aspect-square overflow-hidden bg-gray-900 rounded-lg cursor-col-resize"
                onMouseMove={handleSlide}
              >
                {/* After Image */}
                <img
                  src={transformation.after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Before Image */}
                <div
                  style={{ width: `${sliderPosition}%` }}
                  className="absolute inset-y-0 left-0 overflow-hidden"
                >
                  <img
                    src={transformation.before}
                    alt="Before"
                    className="w-screen h-full object-cover"
                  />
                </div>

                {/* Slider Line */}
                <div
                  style={{ left: `${sliderPosition}%` }}
                  className="absolute inset-y-0 w-1 bg-primary transition-all"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-black rounded-full" />
                      <div className="w-1 h-3 bg-black rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-xs text-white font-semibold">
                  BEFORE
                </div>
                <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-xs text-white font-semibold">
                  AFTER
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
