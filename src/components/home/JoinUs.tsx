"use client";

import { motion } from "framer-motion";

const JoinUs = () => {
  return (
    <section className="relative py-24 md:py-48 overflow-hidden bg-surface-container-lowest">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <img
          alt="Athletic Texture"
          className="w-full h-full object-cover mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCox-2j-Io8OFCrCkk5Yj1nLjWotgLc2VX7x9YvaJNiQzJHvXyfFvbPxX-TmBVbSUiJThOHiJwWORtLMuDqbPUdjoT2G13hpR4n45oGx7jPkDjc89B61KzEU0znbG-9tjltdjZ8gwvQIqjLUY2I8IJVWBNWH_06WW7tBu7YKJ0W1WyllH93efnPyJjdz-G_qDClb06AAKOZHGpqv0r8kD4aRJ7mGXgEu7RraePsxZTaXx7CsT6XA8hp698TFvd9PdnOhT6XDg_HNf0Z"
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-secondary font-headline font-bold tracking-[0.6em] text-[10px] md:text-xs uppercase block">INITIATION</span>
              <h2 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.8]">
                BECOME AN<br />
                <span className="kinetic-text">ELITE</span>
              </h2>
            </div>
            
            <p className="text-on-surface-variant text-xl md:text-2xl font-light leading-relaxed max-w-lg">
              The path to prestige is not for everyone. Join our ranks and redefine your athletic legacy.
            </p>

            <ul className="space-y-8">
              {[
                "ACCESS TO WORLD-CLASS FACILITIES",
                "PRIORITY MATCH TICKETING",
                "PERSONALIZED PERFORMANCE COACHING",
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-sm border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </span>
                  <span className="font-headline font-bold text-lg md:text-xl uppercase tracking-tight text-on-surface">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="bg-surface-container relative p-8 md:p-12 shadow-2xl overflow-hidden border border-outline-variant/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 clip-slant"></div>
                
                <h3 className="text-white font-headline font-black text-2xl uppercase mb-8 tracking-tighter text-center">
                  MEMBER REGISTRY
                </h3>
                
                <div className="aspect-square bg-white p-4 rounded-sm shadow-inner mb-8 transition-transform group-hover:scale-[1.02] duration-500">
                  <img 
                    src="/assets/logo.png" 
                    alt="Regina Elite QR Registry"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-on-surface-variant text-[10px] text-center uppercase tracking-widest font-bold mb-8">
                  SCAN TO INITIATE ADMISSION
                </p>

                <div className="pt-4">
                  <button 
                    onClick={() => window.open('https://registry.reginaelites.club/join', '_blank')}
                    className="w-full kinetic-gradient text-on-primary-fixed font-headline font-black py-4 rounded-sm uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all text-sm shadow-xl"
                  >
                    DIRECT SUBMISSION
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
