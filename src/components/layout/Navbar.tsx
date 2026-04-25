'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/teams', label: 'TEAMS' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/stories', label: 'STORIES' },
    { href: '/summer-camp', label: 'KIDS CAMP' },
    { href: '/about', label: 'ABOUT' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#00132e]/80 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-b from-[#051b38] to-transparent'}`}
    >
      <nav className='flex justify-between items-center h-20 px-6 md:px-12 max-w-[1920px] mx-auto'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='flex items-center gap-4 group'>
            <div className='p-1 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300'>
              <img
                alt='Elites Sporting Club Logo'
                className='w-full h-full object-contain'
                src='/assets/logo.png'
              />
            </div>
            <span className='text-xl md:text-2xl font-black italic text-white tracking-widest font-headline'>
              REGINA <span className='text-primary'>ELITE</span> SPORTING CLUB
            </span>
          </Link>
        </div>

        <div className='hidden lg:flex gap-8 items-center font-headline uppercase tracking-tighter'>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative transition-colors pb-1 ${
                isActive(href) ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {label}
              {isActive(href) && (
                <span className='absolute -bottom-0.5 left-0 w-full h-[2px] bg-primary rounded-full' />
              )}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-6'>
          <button className='kinetic-gradient text-on-primary-fixed font-headline font-bold px-4 md:px-6 py-2 rounded-sm scale-95 active:scale-90 transition-transform uppercase tracking-wider text-xs md:text-sm'>
            JOIN THE ELITE
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
