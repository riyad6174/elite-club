"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SummerCamp = () => {
  const highlights = [
    { number: "32", label: "YOUNG ATHLETES" },
    { number: "2", label: "MONTHS OF PLAY" },
    { number: "6-14", label: "AGES WELCOME" },
    { number: "2x", label: "SESSIONS PER WEEK" },
  ];

  return (
    <section className="py-24 md:py-40 bg-surface text-white overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-primary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block">
              YOUTH DEVELOPMENT
            </span>
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
              KIDS&apos;<br />
              <span className="kinetic-text">SUMMER CAMP</span>
            </h2>
          </div>
          <Link
            href="/summer-camp"
            className="bg-surface-bright/20 text-white font-headline font-bold px-8 py-3 rounded-sm border border-outline-variant/10 hover:bg-surface-bright transition-all text-sm tracking-[0.2em] uppercase inline-block"
          >
            LEARN MORE
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed">
              In 2024, Regina Elite Sporting Club proudly launched its first-ever <strong className="text-white">Kids&apos; Summer Soccer Camp</strong> — a collaborative initiative with the Royal Bengal Soccer Association (RBSA), affiliated with the University of Regina.
            </p>
            <p className="text-on-surface-variant/70 text-base md:text-lg font-light leading-relaxed">
              Over two months from July to August, 32 children aged 6 to 14 participated in twice-weekly sessions every Tuesday and Thursday. Each child received exclusive summer camp jerseys — generously sponsored by <strong className="text-white">Tandoor Kabab</strong>.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 italic text-on-surface-variant text-lg">
              &ldquo;We believe youth engagement through sport is essential for building confidence, leadership, and a stronger community.&rdquo;
              <footer className="text-white/40 text-xs font-bold tracking-widest uppercase mt-2 not-italic">— RESC Director</footer>
            </blockquote>
            <div className="pt-2">
              <Link
                href="/summer-camp"
                className="kinetic-gradient text-on-primary-fixed font-headline font-bold px-8 py-3 rounded-sm uppercase tracking-widest text-sm inline-block hover:scale-105 transition-transform"
              >
                EXPLORE SUMMER CAMP
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden clip-slant">
              <img
                src="https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kids Summer Soccer Camp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-sm border border-primary/20 p-6 hidden md:block">
              <p className="text-primary font-headline font-black text-4xl leading-none">2024</p>
              <p className="text-white/60 font-bold text-xs tracking-widest uppercase mt-1">INAUGURAL CAMP</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-outline-variant/10 pt-16"
        >
          {highlights.map((item, index) => (
            <div key={index} className="text-center space-y-2">
              <p className="text-white font-headline font-black text-4xl md:text-6xl tracking-tighter leading-none kinetic-text">
                {item.number}
              </p>
              <p className="text-on-surface-variant font-bold text-[10px] md:text-xs tracking-widest uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SummerCamp;
