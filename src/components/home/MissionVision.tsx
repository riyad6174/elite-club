"use client";

import { motion } from "framer-motion";

const MissionVision = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-container-low relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="font-headline font-black text-[12rem] md:text-[22rem] leading-none uppercase tracking-tighter text-white opacity-[0.02] whitespace-nowrap">
          ELITE
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Motto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase block mb-6">
            OUR MOTTO
          </span>
          <blockquote className="text-white font-headline font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-tight max-w-5xl mx-auto">
            <span className="kinetic-text">&ldquo;Elite by name,</span>{" "}
            united by hearts — where everyone belongs.&rdquo;
          </blockquote>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-background/60 border border-outline-variant/10 p-10 md:p-14 relative group hover:border-primary/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
            <span className="text-primary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-4">
              OUR MISSION
            </span>
            <p className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter leading-tight mb-4">
              FOSTER UNITY, HEALTH & COMMUNITY
            </p>
            <p className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
              To foster unity, health, and community bonding through the universal language of soccer — bringing together people of all backgrounds under one shared passion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-background/60 border border-outline-variant/10 p-10 md:p-14 relative group hover:border-tertiary/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-tertiary/30 group-hover:bg-tertiary transition-colors"></div>
            <span className="text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-4">
              OUR VISION
            </span>
            <p className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter leading-tight mb-4">
              A MODEL FOR MULTICULTURAL INCLUSIVITY
            </p>
            <p className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
              To be a model for multicultural inclusivity, leadership, and social well-being through sport — inspiring communities across Regina and beyond.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
