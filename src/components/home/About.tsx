"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const About = () => {
  return (
    <section className="relative py-24 md:py-40 bg-background overflow-hidden">
      {/* Massive Background Typography */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap"
      >
        <span className="font-headline font-black text-[20rem] md:text-[40rem] leading-none uppercase tracking-tighter">
          EST 1924
        </span>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <span className="text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block">
              OUR LEGACY
            </span>
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
              A CENTURY OF<br />
              <span className="kinetic-text">KINETIC PRESTIGE</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 lg:pt-20"
          >
            <p className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Since 1924, Regina Elites has been the heartbeat of athletic excellence. We don't just train athletes; we forge icons through a mixture of relentless discipline and state-of-the-art innovation.
            </p>
            <p className="text-on-surface-variant/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Our philosophy rejects the static. We embrace motion, precision, and the raw energy of the arena. Every facility, every program, and every coach is dedicated to pushing the human potential beyond the horizon.
            </p>
            <div className="pt-4 drop-shadow-[0_0_15px_rgba(102,223,117,0.1)]">
              <Link href="/about" className="text-white border border-outline-variant/30 px-8 py-3 rounded-sm font-headline font-bold text-sm tracking-widest uppercase hover:bg-surface-bright transition-all inline-block text-center">
                LEARN OUR STORY
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
