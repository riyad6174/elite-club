"use client";

import { motion } from "framer-motion";

const BoardOfDirectors = () => {
  const directors = [
    {
      name: "SIR ARLO VANCE",
      role: "CLUB PRESIDENT",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "DIANA STERLING",
      role: "TECHNICAL DIRECTOR",
      img: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "MARCUS DRAKE",
      role: "CHIEF OPERATIONS",
      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "SELINA THORNE",
      role: "HEAD OF ACADEMY",
      img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-surface-container-low">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="space-y-2">
            <span className="text-tertiary font-headline font-bold tracking-widest text-[10px] md:text-xs uppercase">
              LEADERSHIP
            </span>
            <h2 className="text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
              BOARD OF DIRECTORS
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {directors.map((director, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-container-highest/50 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-tertiary/20 group-hover:bg-tertiary transition-colors z-10"></div>
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={director.img}
                  alt={director.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 relative">
                <h3 className="text-white font-headline font-black text-xl uppercase tracking-tighter mb-1">
                  {director.name}
                </h3>
                <p className="text-tertiary font-bold tracking-widest text-[10px] uppercase">
                  {director.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
