"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Teams = () => {
  const teams = [
    {
      title: "SOCCER SQUAD",
      rank: "DIVISION 1 • NATIONAL RANKED",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBUITkEkyfMvbDW5acHlia0q0q3iwzrCuUZcs7ENOk5HG2m4C1fwh0-eWX_MlZsdm5ruOg6l64TvWl8VW1omrsmABORcak3T8Ot3kAjG3TvgHAbz_fyd7-9voO5wXxx56SGGLx70KdQoLCcw7q3vu_CU3nwijsnQqLLA8juG44OdgWNj3LBDvipkSWbV559YSX5VMySRwjl0LE8-zICaLjLz9Qc42Sp7Yr0rE6nUbMVnl6ZGGZal01B2xxNJn-1rOxWnB8uUZP0IJb",
      span: "md:col-span-7",
      height: "h-[400px] md:h-[650px]",
    },
    {
      title: "CRICKET XI",
      rank: "STATE CHAMPIONS",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQtgPal6V2sny9cBl4EL83WJna7cD79ncjTaDjNSQKSmB-Afm-P3g8Ynh-WaAIebnoBFbtybfHfugsrAAhg9pnFaxh20zNN6YenCbPrqMH_Fz61lsrl8GaXqmhZar0bDPLpV07aN-qoQ2Zpta6HmRlKYhP05yoN0s2o13Fo22za9dBR_PXE0alCpqfLEXPBvAh0yFP9SCy9bhBncFD_SIeVYzvvOWrq6QAB74ejR1oWt99slt0Gz80ocHRXvFDU2_Mhiduk-bgCvy-",
      span: "md:col-span-5",
      height: "h-[300px] md:h-[450px]",
    },
    {
      title: "PRO RUGBY",
      rank: "REGIONAL CHAMPIONS",
      img: "https://images.pexels.com/photos/163452/basketball-hoop-basketball-game-ball-163452.jpeg?auto=compress&cs=tinysrgb&w=800",
      span: "md:col-span-5",
      height: "h-[300px] md:h-[450px]",
    },
    {
      title: "COURT TENNIS",
      rank: "ELITE MASTERS",
      img: "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=800",
      span: "md:col-span-7",
      height: "h-[300px] md:h-[550px]",
    },
  ];

  return (
    <section className="py-24 md:py-48 bg-surface-container-lowest">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase block">SQUADRON ROSTER</span>
            <h2 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">THE ELITE TEAMS</h2>
          </div>
          <Link href="/teams" className="text-white font-headline font-bold text-sm md:text-lg tracking-widest uppercase underline underline-offset-8 decoration-primary hover:text-primary transition-colors">
            VIEW FULL ROSTER
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {teams.map((team, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${team.span} relative group overflow-hidden ${index % 2 === 1 ? 'md:-translate-y-24' : ''}`}
            >
              <div className={`relative ${team.height} overflow-hidden clip-slant`}>
                <img
                  alt={team.title}
                  className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  src={team.img}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="absolute bottom-10 left-10 space-y-3 z-10 transition-transform duration-500 group-hover:translate-x-4">
                <h3 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                  {team.title}
                </h3>
                <p className="text-tertiary-fixed-dim font-bold tracking-[0.2em] text-xs uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {team.rank}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
