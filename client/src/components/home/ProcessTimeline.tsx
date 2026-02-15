import { motion } from "framer-motion";

export default function ProcessTimeline() {
  const phases = [
    {
      number: "01",
      title: "Discovery",
      duration: "Week 1-2",
      description: "Understanding your vision, space, and style preferences.",
    },
    {
      number: "02",
      title: "Design",
      duration: "Week 3-4",
      description: "Creating detailed designs and 3D renderings for your approval.",
    },
    {
      number: "03",
      title: "Refinement",
      duration: "Week 5-6",
      description: "Final adjustments and client sign-off on all details.",
    },
    {
      number: "04",
      title: "Execution",
      duration: "Week 7+",
      description: "Installation and project management from start to finish.",
    },
    {
      number: "05",
      title: "Handover",
      duration: "Final Week",
      description: "Final inspection and walkthrough of your completed space.",
    },
  ];

  return (
    <section className="py-24 bg-card border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">From Vision to Reality</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Our Design Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent, collaborative journey where every step is designed for your satisfaction
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Timeline Marker */}
                <div className="flex flex-col items-center md:items-start">
                  <motion.div
                    whileInView={{ scale: 1.2 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-2xl relative z-10"
                  >
                    {phase.number}
                  </motion.div>
                  
                  {/* Connecting Line */}
                  {index < phases.length - 1 && (
                    <div className="hidden md:block absolute w-1 h-32 bg-gradient-to-b from-primary to-primary/10 -ml-8 mt-16" />
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-4 bg-white/[0.02] border border-white/5 p-6 rounded-lg hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-serif text-white mb-2">{phase.title}</h3>
                      <p className="text-primary text-sm font-semibold">{phase.duration}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
