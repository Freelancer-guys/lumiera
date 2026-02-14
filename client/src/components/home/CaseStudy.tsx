import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

export default function CaseStudy() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const calculatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    calculatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    calculatePosition(e.touches[0].clientX);
  };

  return (
    <section className="py-32 bg-secondary border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Case Study</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
              The Art of <br /> Transformation
            </h2>
            
            <div className="space-y-8 mb-12">
              {[
                { label: "Concept", desc: "Reimagining a raw industrial loft into a warm, inviting sanctuary." },
                { label: "Materials", desc: "Imported Italian marble, reclaimed oak, and brushed brass fixtures." },
                { label: "Outcome", desc: "A seamless blend of brutalist structure and soft luxury living." },
              ].map((item, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <h4 className="text-white font-serif text-lg mb-2">{item.label}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="text-white border border-white/20 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
              View Full Project
            </button>
          </div>

          <div 
            className="relative h-[500px] w-full select-none group cursor-ew-resize overflow-hidden" 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/images/case-study-after.png" 
                alt="After Renovation" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 text-xs text-white uppercase tracking-widest pointer-events-none">After</span>
            </div>

            {/* Before Image (Clipped on top) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-primary"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="/images/case-study-before.png" 
                alt="Before Renovation" 
                className="absolute top-0 left-0 max-w-none h-full"
                style={{ width: containerWidth || '100%' }}
              />
              <span className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-xs text-white uppercase tracking-widest pointer-events-none">Before</span>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-10 -ml-5 flex items-center justify-center pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <MoveHorizontal size={16} className="text-white" />
              </div>
            </div>
            
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <MoveHorizontal size={12} /> Drag to Compare
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
