"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Players = () => {
  const players = [
    {
      name: "OBAIDUL HAQUE RIPON",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-007" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-007_Obaidul Haque Ripon.jpg",
      accent: "primary",
    },
    {
      name: "KBM ISMAIL NOOR",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-008" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-008_KBM Ismail Noor.jpeg",
      accent: "tertiary",
    },
    {
      name: "RUHUL AMIN",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-009" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-009_Ruhul Amin.jpg",
      accent: "primary",
    },
    {
      name: "KOYES NOMAN SAKI",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-010" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-010_Koyes Noman Saki.jpeg",
      accent: "tertiary",
    },
    {
      name: "ASHRAFUL ISLAM LEEPU",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-011" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-011_Ashraful Islam Leepu.jpeg",
      accent: "primary",
    },
    {
      name: "HAMZAH SHAIKH",
      sport: "SOCCER",
      stats: [
        { label: "RESC ID", value: "2023-012" },
        { label: "JOINED", value: "2023" },
      ],
      img: "/assets/members/2023-012_Hamzah Shaikh.jpeg",
      accent: "tertiary",
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-surface text-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
        >
          <div className="space-y-4">
            <span className="text-primary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block">
              FEATURED MEMBERS
            </span>
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none">
              THE ELITE<br />
              <span className="kinetic-text">VANGUARD</span>
            </h2>
          </div>
          <Link href="/players" className="text-on-primary-container font-headline font-bold hover:underline underline-offset-8 text-sm md:text-base tracking-widest uppercase inline-block">
            VIEW ALL MEMBERS
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {players.map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-[4/5] overflow-hidden clip-slant">
                <img
                  src={player.img}
                  alt={player.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
              </div>

              <div className="absolute -bottom-10 left-0 right-0 p-6 bg-surface-container-high/90 backdrop-blur-xl border-l-4 border-primary shadow-2xl z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline font-black text-2xl uppercase tracking-tighter">
                      {player.name}
                    </h3>
                    <p className="text-tertiary-fixed-dim font-bold tracking-widest text-[10px] uppercase">
                      {player.sport}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {player.stats.map((stat, sIndex) => (
                    <div key={sIndex} className="bg-surface-bright/40 px-3 py-2 rounded-sm border border-on-surface/10">
                      <p className="text-white/40 text-[8px] font-bold tracking-widest uppercase mb-1">
                        {stat.label}
                      </p>
                      <p className="text-white font-headline font-black text-lg leading-none">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Players;
