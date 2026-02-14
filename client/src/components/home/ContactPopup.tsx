import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ContactPopup({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-card border border-white/10 p-8 md:p-12 max-w-lg w-full shadow-2xl"
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {!submitted ? (
            <>
              <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block text-center">Exclusive Consultation</span>
              <h2 className="text-3xl font-serif text-white text-center mb-2">Transform Your Space</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Book a complimentary 15-minute discovery call with our principal designer.
              </p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-background border border-white/10 p-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none text-sm"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full bg-background border border-white/10 p-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-background border border-white/10 p-4 text-white/70 focus:border-primary focus:outline-none text-sm appearance-none">
                    <option>Project Type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Renovation</option>
                  </select>
                  <select className="w-full bg-background border border-white/10 p-4 text-white/70 focus:border-primary focus:outline-none text-sm appearance-none">
                    <option>Budget Range</option>
                    <option>$50k - $100k</option>
                    <option>$100k - $250k</option>
                    <option>$250k+</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-primary/90 transition-colors mt-4">
                  Request Consultation
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-serif text-white mb-4">Thank you.</h3>
              <p className="text-muted-foreground">We will be in touch shortly to schedule your call.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-8 text-primary uppercase tracking-widest text-xs font-bold border-b border-primary pb-1"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
