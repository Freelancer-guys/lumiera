import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  timestamp: Date;
}

const aiResponses: { [key: string]: string } = {
  "hello": "Hello! Welcome to Lumiera. I'm here to help answer any questions about our interior design services. How can I assist you today?",
  "hi": "Hello! Welcome to Lumiera. I'm here to help answer any questions about our interior design services. How can I assist you today?",
  "services": "We specialize in luxury interior design for residential, commercial, and hospitality spaces. Our services include concept development, 3D visualization, material selection, project management, and complete turnkey solutions.",
  "projects": "We've completed stunning projects including residential homes, luxury lofts, commercial offices, spas, and hospitality venues. Each project reflects our commitment to timeless luxury and attention to detail.",
  "consultation": "We offer a complimentary 15-minute discovery call to discuss your vision, budget, and timeline. We'll help you understand our design process and how we can transform your space.",
  "process": "Our design process includes: 1) Discovery & Concept, 2) 3D Visualization & Materials, 3) Detailed Planning, 4) Project Execution, 5) Final Handover. Each phase ensures your vision comes to life beautifully.",
  "timeline": "Project timelines vary based on scope and complexity. Residential projects typically take 3-6 months from concept to completion. We'll provide a detailed timeline during the consultation.",
  "budget": "We work with various budgets and can create stunning designs at different price points. The best way to discuss your budget is during a consultation where we can understand your specific needs.",
  "materials": "We source premium materials including Italian marble, reclaimed oak, brass fixtures, and sustainable options. We prioritize quality and durability for long-lasting designs.",
  "3d visualization": "Yes! We provide photorealistic 3D renderings so you can visualize your space before work begins. This helps ensure the design aligns perfectly with your vision.",
  "pricing": "Pricing depends on project scope, size, and complexity. We offer transparent cost breakdowns with no hidden fees. Let's discuss during a consultation.",
  "location": "We're based in [City] but work on projects globally. We can handle projects remotely or with on-site visits based on your needs.",
  "contact": "You can reach us through our website contact form, or book a consultation directly. We're available for calls, emails, and video consultations.",
  "luxury": "Luxury is in the details. We believe in creating spaces that are not just beautiful, but functional, sustainable, and timeless. Every element is carefully curated.",
  "design": "Our design philosophy combines modern aesthetics with timeless elegance. We focus on creating spaces that tell a story and enhance how you live or work.",
  "team": "Our team consists of experienced architects, interior designers, and project managers dedicated to delivering exceptional results. Each member brings expertise and passion for design.",
  "why choose": "Choose Lumiera for: personalized service, stunning visualizations, transparent pricing, timely delivery, and a portfolio of luxury spaces. We handle every detail so you don't have to.",
  "payment": "We typically structure payments across project phases. Discuss specific terms during your consultation.",
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      text: "Hi! 👋 I'm Lumiera's AI assistant. Ask me anything about our interior design services, projects, or process!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Default response
    return "Great question! I'm still learning about that specific topic. Feel free to ask about our services, projects, design process, consultation, pricing, materials, timeline, or anything related to luxury interior design. Or book a consultation to speak with our team directly!";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: findResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-6 w-96 h-[600px] bg-card border border-white/10 rounded-lg shadow-2xl flex flex-col z-[99] md:w-96 sm:w-80 max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-white/10 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold">Lumiera Assistant</h3>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-white"
                        : "bg-white/5 border border-white/10 text-white/90"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-white/10 p-4 bg-background/50"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/30 focus:border-primary focus:outline-none text-sm rounded"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white p-2 rounded transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[98] w-14 h-14 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
