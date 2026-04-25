'use client';

import { motion } from 'framer-motion';

const BoardOfDirectors = () => {
  const directors = [
    {
      name: 'MOHAMMAD ZAKIRUL HASAN',
      role: 'FOUNDING LEGEND & DIRECTOR',
      img: '/assets/founders/zakir2.jpeg',
      resc_id: '2023-001',
      jersey_name: 'SAYEM',
      jersey_no: '10',
    },
    {
      name: 'MUHAMMAD KHAZA AHMED',
      role: 'DIRECTOR OF FINANCE',
      img: '/assets/founders/khaza.jpg',
      resc_id: '2023-002',
      jersey_name: 'KHAZA',
      jersey_no: '00',
    },
    {
      name: 'MD MIZANUR RAHMAN',
      role: 'DIRECTOR, PLANNING & STRATEGY',
      img: '/assets/founders/mizanur2.jpg',
      resc_id: '2023-003',
      jersey_name: 'MIZAN',
      jersey_no: '13',
    },
    {
      name: 'SYED MAHEDI HASAN',
      role: 'ADMINISTATION & OPERATIONS',
      img: '/assets/founders/mahedi.jpg',
      resc_id: '2023-005',
      jersey_name: 'NEWTON',
      jersey_no: '10',
    },
    {
      name: 'AKM MOIN-UL HAQUE OPU',
      role: 'DIRECTOR, PLANNING AND STRATEGY',
      img: '/assets/founders/opu.jpg',
      resc_id: '2023-006',
      jersey_name: 'MOIN-UL',
      jersey_no: '—',
    },
    // {
    //   name: 'OBAIDUL HAQUE RIPON',
    //   role: 'FOUNDING LEGEND & SENIOR MEMBER',
    //   img: '/assets/founders/ripon.jpg',
    //   resc_id: null,
    //   jersey_name: 'RIPON',
    //   jersey_no: '77',
    // },

    {
      name: 'GOLAM KABIR',
      role: 'DIRECTOR',
      img: null,
      resc_id: '2023-004',
      jersey_name: 'KABIR',
      jersey_no: '99',
    },
  ];

  return (
    <section className='py-24 md:py-32 bg-surface-container-low'>
      <div className='container mx-auto px-6 md:px-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6'
        >
          <div className='space-y-2'>
            <span className='text-tertiary font-headline font-bold tracking-widest text-[10px] md:text-xs uppercase'>
              LEADERSHIP
            </span>
            <h2 className='text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none'>
              BOARD OF DIRECTORS
            </h2>
          </div>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {directors.map((director, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-surface-container-highest/50 group relative overflow-hidden'
            >
              <div className='absolute top-0 left-0 w-1 h-full bg-tertiary/20 group-hover:bg-tertiary transition-colors z-10'></div>

              {/* Jersey number badge */}
              <div className='absolute top-4 right-4 z-20 bg-background/70 backdrop-blur-sm px-2 py-1 text-center'>
                <span className='text-primary font-headline font-black text-xl leading-none'>
                  {director.jersey_no}
                </span>
              </div>

              <div className='aspect-[3/4] overflow-hidden transition-all duration-700 bg-surface-container-highest'>
                {director.img ? (
                  <img
                    src={director.img}
                    alt={director.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-surface-container-high'>
                    <svg
                      className='w-24 h-24 text-white/20'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
                    </svg>
                  </div>
                )}
              </div>

              <div className='p-5 relative'>
                <h3 className='text-white font-headline font-black text-lg uppercase tracking-tighter mb-1 leading-tight'>
                  {director.name}
                </h3>
                <p className='text-tertiary font-bold tracking-widest text-[10px] uppercase mb-3'>
                  {director.role}
                </p>
                <div className='flex items-center gap-3 pt-3 border-t border-outline-variant/10'>
                  {director.resc_id && (
                    <span className='text-white/30 text-[10px] font-bold tracking-wider uppercase'>
                      ID: {director.resc_id}
                    </span>
                  )}
                  <span className='text-white/30 text-[10px] font-bold tracking-wider uppercase ml-auto'>
                    JERSEY: {director.jersey_name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
