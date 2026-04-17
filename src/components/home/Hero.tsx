"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "/assets/hero-banner.PNG",
    "/assets/hero-banner-2.PNG"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 6 seconds per image

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Hero Background ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-tertiary/10 blur-[150px] rounded-full mix-blend-screen"></div>
        </div>
  
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-4xl space-y-6 md:space-y-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-tertiary font-headline font-bold tracking-[0.6em] text-xs md:text-sm uppercase block"
              >
                ESTABLISHED 1924 • REGINA ELITES
              </motion.span>
              
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white font-headline font-black text-5xl md:text-7xl lg:text-8xl leading-[0.85] uppercase tracking-tighter"
            >
              BEYOND<br />
              <span className="kinetic-text">ORDINARY</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-on-surface-variant text-base md:text-xl max-w-2xl font-light leading-relaxed"
            >
              Experience the zenith of athletic prestige. Join a legacy where precision meets power in our state-of-the-art facilities.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
            className="flex-shrink-0 relative group"
          >
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="p-6 md:p-12  relative z-10 w-48 h-48 md:w-94 md:h-94 flex items-center justify-center">
              <img 
                src="/assets/logo.png" 
                alt="Regina Elites Club Emblem" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Spinning Text/Ring Effect around logo */}
            <div className="absolute inset-0 rounded-full border border-primary/20 border-dashed animate-[spin_20s_linear_infinite] scale-125"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
