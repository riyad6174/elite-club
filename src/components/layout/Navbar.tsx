"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#00132e]/80 backdrop-blur-xl shadow-2xl" : "bg-gradient-to-b from-[#051b38] to-transparent"}`}
    >
      <nav className="flex justify-between items-center h-20 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-4 group">
            <div className=" p-1 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img
                alt="Regina Elites Club Logo"
                className="w-full h-full object-contain"
                src="/assets/logo.png"
              />
            </div>
            <span className="text-xl md:text-2xl font-black italic text-white tracking-widest font-headline">REGINA ELITES</span>
          </Link>
        </div>

        <div className="hidden lg:flex gap-8 items-center font-headline uppercase tracking-tighter">
          <Link href="/" className="text-white hover:text-primary transition-colors">HOME</Link>
          <Link href="/teams" className="text-white/70 hover:text-white transition-colors">TEAMS</Link>
          <Link href="/players" className="text-white/70 hover:text-white transition-colors">PLAYERS</Link>
          <Link href="/gallery" className="text-white/70 hover:text-white transition-colors">GALLERY</Link>
          <Link href="/stories" className="text-white/70 hover:text-white transition-colors">STORIES</Link>
          <Link href="/about" className="text-white/70 hover:text-white transition-colors">ABOUT</Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="kinetic-gradient text-on-primary-fixed font-headline font-bold px-4 md:px-6 py-2 rounded-sm scale-95 active:scale-90 transition-transform uppercase tracking-wider text-xs md:text-sm">
            JOIN THE ELITE
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
