import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-[#000e25] w-full relative bottom-0 clip-slant-footer mt-20'>
      <div className='flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8 max-w-[1920px] mx-auto'>
        <div className='flex flex-col gap-4 items-center md:items-start text-center md:text-left'>
          <span className='text-3xl md:text-4xl font-black text-[#051b38] opacity-50 font-headline uppercase'>
            REGINA ELITE SPORTING CLUB
          </span>
          <p className='text-white/30 text-[10px] font-headline tracking-widest max-w-xs'>
            © {currentYear} REGINA ELITE SPORTING CLUB REGINA. ALL RIGHTS
            RESERVED.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-6 md:gap-10 font-headline uppercase text-[10px] tracking-widest font-bold'>
          <Link
            href='/teams'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            TEAMS
          </Link>
          <Link
            href='/gallery'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            GALLERY
          </Link>
          <Link
            href='/summer-camp'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            SUMMER CAMP
          </Link>
          <Link
            href='/stories'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            STORIES
          </Link>
          <Link
            href='/about'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            ABOUT
          </Link>
          <Link
            href='#'
            className='text-white/30 hover:text-tertiary transition-colors'
          >
            CONTACT US
          </Link>
        </div>

        <div className='flex gap-5'>
          {/* Facebook */}
          <Link
            href='#'
            aria-label='Facebook'
            className='text-white/30 hover:text-white transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
            </svg>
          </Link>
          {/* Instagram */}
          <Link
            href='#'
            aria-label='Instagram'
            className='text-white/30 hover:text-white transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
              <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
