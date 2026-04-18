'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Teams = () => {
  const teamImages = [
    {
      src: '/assets/team-images/elite-winter-2026-1.png',
      alt: 'Team match action',
      span: 'md:col-span-7',
      height: 'h-[400px] md:h-[600px]',
    },
    {
      src: '/assets/team-images/ELITE-WINTER-20262-1536x864.png',
      alt: 'Players in action',
      span: 'md:col-span-5',
      height: 'h-[280px] md:h-[400px]',
    },
    {
      src: '/assets/team-images/ELITE-WINTER-20264-1536x864.png',
      alt: 'Team celebration',
      span: 'md:col-span-5',
      height: 'h-[280px] md:h-[400px]',
    },
    {
      src: '/assets/team-images/FRR00795.jpg',
      alt: 'Match day',
      span: 'md:col-span-7',
      height: 'h-[300px] md:h-[450px]',
    },
  ];

  const teamLogos = [
    { src: '/assets/teams/LION.png', alt: 'Lions' },
    { src: '/assets/teams/WARRIORS.png', alt: 'Warriors' },
    { src: '/assets/teams/THUNDRS.png', alt: 'Thunders' },
    { src: '/assets/teams/gladitors.png', alt: 'Gladiators' },
    { src: '/assets/teams/chagers.png', alt: 'Chargers' },
    { src: '/assets/teams/knigt.png', alt: 'Knights' },
  ];

  return (
    <section className='py-24 md:py-48 bg-surface-container-lowest'>
      <div className='container mx-auto px-6 md:px-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12'
        >
          <div className='space-y-4 max-w-2xl'>
            <span className='text-tertiary font-headline font-bold tracking-[0.5em] text-[10px] md:text-sm uppercase block'>
              SQUAD ROSTER
            </span>
            <h2 className='text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none'>
              THE ELITE TEAMS
            </h2>
          </div>
        </motion.div>

        {/* Team Action Images */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-16'>
          {teamImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${img.span} relative group overflow-hidden ${index % 2 === 1 ? 'md:-translate-y-12' : ''}`}
            >
              <div
                className={`relative ${img.height} overflow-hidden clip-slant`}
              >
                <img
                  alt={img.alt}
                  className='w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out'
                  src={img.src}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent'></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit Teams Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='flex justify-center mb-24'
        >
          <Link
            href='/teams'
            className='kinetic-gradient text-on-primary-fixed font-headline font-black px-12 py-5 rounded-sm uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-transform'
          >
            VISIT TEAMS PAGE
          </Link>
        </motion.div>

        {/* Team Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-10'
        >
          <span className='text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-8 text-center'>
            OUR TEAMS
          </span>
        </motion.div>

        <div className='grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10'>
          {teamLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className='flex flex-col items-center justify-center p-6 bg-surface-container/30 hover:bg-surface-container transition-colors duration-300 group gap-3'
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className='w-full max-w-[120px] h-auto object-contain transition-all duration-500 group-hover:scale-110'
              />
              <span className='text-white/50 group-hover:text-white font-headline font-bold text-[10px] uppercase tracking-widest text-center transition-colors'>
                {logo.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
