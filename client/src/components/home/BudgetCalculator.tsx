import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders } from "lucide-react";

export default function BudgetCalculator() {
  const [roomSize, setRoomSize] = useState(300);
  const [designType, setDesignType] = useState(1);
  const [complexity, setComplexity] = useState(1);

  const designMultiplier: { [key: number]: number } = {
    1: 1200, // Basic per sqft
    2: 1800,
    3: 3000,
  };

  const complexityMultiplier: { [key: number]: number } = {
    1: 1,
    2: 1.3,
    3: 1.6,
  };

  const baseCalculation = roomSize * designMultiplier[designType] * complexityMultiplier[complexity];
  const servicesFee = baseCalculation * 0.12;
  const totalBudget = Math.round(baseCalculation + servicesFee);

  const designLabels = {
    1: "Aesthetic Only",
    2: "Design + Execution",
    3: "Full Luxury",
  };

  const complexityLabels = {
    1: "Simple",
    2: "Moderate",
    3: "Complex",
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Smart Planning</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Budget Calculator</h2>
          <p className="text-muted-foreground text-lg">
            Get an instant estimate based on your space requirements and design preferences
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-white/10 p-8 md:p-12 rounded-lg space-y-8"
        >
          {/* Room Size */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-white font-semibold flex items-center gap-2">
                <Sliders size={18} className="text-primary" />
                Room Size (sq ft)
              </label>
              <span className="text-2xl font-bold text-primary">{roomSize}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={roomSize}
              onChange={(e) => setRoomSize(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>100</span>
              <span>1000</span>
            </div>
          </div>

          {/* Design Type */}
          <div>
            <label className="text-white font-semibold block mb-4">Design Scope</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((type) => (
                <button
                  key={type}
                  onClick={() => setDesignType(type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    designType === type
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <p className={`text-sm font-semibold ${designType === type ? "text-primary" : "text-white"}`}>
                    {designLabels[type as keyof typeof designLabels]}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">₹{designMultiplier[type]}/sqft</p>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <label className="text-white font-semibold block mb-4">Complexity Level</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setComplexity(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    complexity === level
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <p className={`text-sm font-semibold ${complexity === level ? "text-primary" : "text-white"}`}>
                    {complexityLabels[level as keyof typeof complexityLabels]}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">x{complexityMultiplier[level]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="border-t border-white/10 pt-8 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Design & Materials</span>
              <span className="text-white font-semibold">₹{baseCalculation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Service & Project Mgmt (12%)</span>
              <span className="text-white font-semibold">₹{Math.round(servicesFee).toLocaleString()}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between items-center bg-primary/10 p-4 rounded-lg">
              <span className="text-white font-bold text-lg">Estimated Total Budget</span>
              <span className="text-primary font-bold text-2xl">₹{totalBudget.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            * This is an estimate. Final pricing will be confirmed after detailed consultation considering materials, location, and custom requirements.
          </p>

          <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors">
            Get Detailed Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}
