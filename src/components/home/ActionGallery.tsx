"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ActionGallery = () => {
  const images = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDajtv8FKPPFp-bLiwfn0LQjkD99sVeJ4iE43ADbhXP20I-thZ3IJvQ-OQ3guHixVpstDCL1NaBraX-50bfXTsKLY9QddsR2z0smKibYBNCf0gzt4calFGaV8_Ujk46b80CIfJ_nZ2UvnKOHEhF9tvrwTQpOCOZlvlY95M9lwo_OJimyAk1NEfvO05QV9YCPbCXO1843S_STnLUEIpr7p8EpO9Q-_qXzevut46OsOFsPUGAb5QlaFki36NpUjyfR0MiE0Z-058EZSBJ",
      alt: "Soccer action Celebration",
      span: "md:col-span-8 md:row-span-2",
      clip: "clip-slant",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9dT_AWs_ni6dre1JMp7w0Amd-NugaBztQrbzz8lbocSonJVcKDpqBmEaTCsqQ-F4vKUfVAI-sXjQnrueBKZJM7Kq98-HXHI0b-SCDhdrUYHXv6T6rYOgH7bfdySgEN6N8V6YATvKgORaaXiH93-5xERRKJ36pp-kKjZPVHctnVK2pgi6pP6CMg2VZMBBuHVeXuhwn32Gmd-K0ywEnGX_PGo_WRw8rcWBbD6IK4SzB4GSalzeWAAHuHcdHihRWjUdDVQA8Cwld_HUL",
      alt: "Cricket wicket moment",
      span: "md:col-span-4",
      clip: "",
    },
    {
      src: "https://images.pexels.com/photos/159515/football-american-football-runner-player-159515.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Aggressive run in elite arena",
      span: "md:col-span-4",
      clip: "",
    },
    {
      src: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Badminton precision",
      span: "md:col-span-4 md:row-span-2",
      clip: "clip-slant",
    },
    {
      src: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Victory celebration",
      span: "md:col-span-8",
      clip: "",
    },
  ];

  return (
    <section className="py-24 md:py-48 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-secondary font-headline font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase block">VISUAL CHRONICLES</span>
            <h2 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">THE KINETIC LENS</h2>
          </div>
          <Link href="/gallery" className="text-white font-headline font-bold text-sm md:text-lg tracking-widest uppercase underline underline-offset-8 decoration-secondary hover:text-secondary transition-colors">
            OPEN THE ARCHIVE
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[300px] gap-6">
          {images.map((img, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${img.span} relative group overflow-hidden ${img.clip} border border-white/5`}
            >
               <img
                alt={img.alt}
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110 cursor-pointer"
                src={img.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-white font-headline font-bold text-lg tracking-widest uppercase">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionGallery;
