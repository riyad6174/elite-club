"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ActionGallery = () => {
  const images = [
    {
      src: "/assets/team-images/FRR00778.jpg",
      alt: "Summer Match",
      span: "md:col-span-8 md:row-span-2",
      clip: "clip-slant",
      type: "sports",
    },
    {
      src: "/assets/team-images/ELITE-WINTER-20262-1536x864.png",
      alt: "Winter Tournament",
      span: "md:col-span-4",
      clip: "",
      type: "sports",
    },
    {
      src: "/assets/stories/eid-party-2025.png",
      alt: "Eid Party 2025",
      span: "md:col-span-4",
      clip: "",
      type: "events",
    },
    {
      src: "/assets/stories/kids-summer-soccer-camp-2024.png",
      alt: "Kids Summer Camp",
      span: "md:col-span-4 md:row-span-2",
      clip: "clip-slant",
      type: "events",
    },
    {
      src: "/assets/stories/annual-tournaments.png",
      alt: "Annual Tournament",
      span: "md:col-span-8",
      clip: "",
      type: "events",
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
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-secondary font-headline font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase block">SPORTS & EVENTS</span>
            <h2 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">OUR GALLERY</h2>
            <div className="flex gap-6 pt-2">
              <span className="text-white/40 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                SPORTS
              </span>
              <span className="text-white/40 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                EVENTS
              </span>
            </div>
          </div>
          <Link href="/gallery" className="text-white font-headline font-bold text-sm md:text-lg tracking-widest uppercase underline underline-offset-8 decoration-secondary hover:text-secondary transition-colors">
            VIEW FULL GALLERY
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
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 cursor-pointer"
                src={img.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${img.type === "sports" ? "text-primary" : "text-secondary"}`}>
                    {img.type === "sports" ? "SPORTS" : "EVENT"}
                  </span>
                  <p className="text-white font-headline font-bold text-lg tracking-widest uppercase">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionGallery;
