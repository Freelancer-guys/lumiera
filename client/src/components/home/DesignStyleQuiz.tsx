import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "What's your ideal color palette?",
      options: ["Neutral & Warm", "Bold & Vibrant", "Minimal & Cool", "Mixed & Eclectic"],
    },
    {
      q: "Your space style preference?",
      options: ["Classic Elegance", "Modern Minimalist", "Bohemian Free", "Contemporary Sleek"],
    },
    {
      q: "Material preference?",
      options: ["Natural & Organic", "Luxe & Smooth", "Rustic & Raw", "Innovative & Tech"],
    },
  ];

  const styleResults = [
    {
      style: "Classic Elegance",
      desc: "Timeless luxury with sophisticated details, rich textures, and enduring beauty.",
      colors: "Warm golds, deep blues, ivory",
    },
    {
      style: "Modern Minimalist",
      desc: "Clean lines, functional elegance, and intentional spaces.",
      colors: "Grays, blacks, whites, subtle accents",
    },
    {
      style: "Bohemian Free",
      desc: "Eclectic, artistic, and full of personality and cultural elements.",
      colors: "Terracottas, jewel tones, natural browns",
    },
    {
      style: "Contemporary Sleek",
      desc: "Cutting-edge design with smart functionality and modern aesthetics.",
      colors: "Cool grays, steel, accent colors",
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const totalScore = selectedAnswers.reduce((a, b) => a + b, 0);
    const resultIndex = totalScore % styleResults.length;
    return styleResults[resultIndex];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  return (
    <section className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Discover Your Style</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Design Style Quiz</h2>
          <p className="text-muted-foreground text-lg">
            Answer a few questions to discover your perfect design aesthetic
          </p>
        </div>

        <motion.div
          key={showResult ? "result" : "quiz"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground font-semibold">QUESTION {currentQuestion + 1} OF {questions.length}</span>
                  <span className="text-xs text-primary font-bold">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <h3 className="text-2xl font-serif text-white mb-8">{questions[currentQuestion].q}</h3>
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 border-2 border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg transition-all duration-300 text-left group"
                    >
                      <p className="text-white font-medium group-hover:text-primary transition-colors">{option}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Result */}
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="inline-block"
                >
                  <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✨</span>
                  </div>
                </motion.div>

                <div>
                  <p className="text-muted-foreground mb-2">Your Design Style</p>
                  <h3 className="text-4xl font-serif text-white mb-6">{getResult().style}</h3>
                  <p className="text-lg text-white/70 mb-4">{getResult().desc}</p>
                  <div className="inline-block bg-primary/10 border border-primary/50 px-6 py-3 rounded-lg">
                    <p className="text-sm text-primary font-semibold">Color Palette: {getResult().colors}</p>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Try Again
                </button>

                <p className="text-muted-foreground text-sm pt-4 border-t border-white/10">
                  Ready to bring your design style to life? <a href="#contact" className="text-primary hover:underline">Book a consultation</a>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
