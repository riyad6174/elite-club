import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BoardOfDirectors from '@/components/home/BoardOfDirectors';
import MembersSection from '@/components/home/MembersSection';

const teamImages = [
  {
    src: '/assets/team-images/FRR00778.jpg',
    alt: 'Team match action',
    span: 'md:col-span-7',
    height: 'h-[420px] md:h-[600px]',
  },
  {
    src: '/assets/team-images/FRR00782.jpg',
    alt: 'Players in action',
    span: 'md:col-span-5',
    height: 'h-[300px] md:h-[420px]',
  },
  {
    src: '/assets/team-images/elite-winter-2026-1.png',
    alt: 'Elite Winter 2026',
    span: 'md:col-span-5',
    height: 'h-[300px] md:h-[420px]',
  },
  {
    src: '/assets/team-images/ELITE-WINTER-20262-1536x864.png',
    alt: 'Winter tournament',
    span: 'md:col-span-7',
    height: 'h-[300px] md:h-[450px]',
  },
  {
    src: '/assets/team-images/FRR00783.jpg',
    alt: 'Team celebration',
    span: 'md:col-span-6',
    height: 'h-[300px] md:h-[400px]',
  },
  {
    src: '/assets/team-images/FRR00795.jpg',
    alt: 'Match day',
    span: 'md:col-span-6',
    height: 'h-[300px] md:h-[400px]',
  },
  {
    src: '/assets/team-images/elite-winter-2026-2.png',
    alt: 'Elite Winter squad',
    span: 'md:col-span-7',
    height: 'h-[300px] md:h-[420px]',
  },
  {
    src: '/assets/team-images/ELITE-WINTER-20264-1536x864.png',
    alt: 'Winter cup action',
    span: 'md:col-span-5',
    height: 'h-[300px] md:h-[380px]',
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

export default function TeamsPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow pt-20'>
        {/* Page Header */}
        <section className='py-20 md:py-32 bg-background relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none'></div>
          <div className='container mx-auto px-6 md:px-12 relative z-10'>
            <span className='text-tertiary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-4'>
              SQUAD ROSTER
            </span>
            <h1 className='text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none'>
              THE ELITE
              <br />
              <span className='kinetic-text'>TEAMS</span>
            </h1>
          </div>
        </section>

        {/* Team Action Images */}
        <section className='pb-24 bg-background'>
          <div className='container mx-auto px-6 md:px-12'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              {teamImages.map((img, index) => (
                <div
                  key={index}
                  className={`${img.span} relative group overflow-hidden ${index % 2 === 1 ? 'md:-translate-y-10' : ''}`}
                >
                  <div
                    className={`relative ${img.height} overflow-hidden clip-slant`}
                  >
                    <img
                      alt={img.alt}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out'
                      src={img.src}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent'></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <BoardOfDirectors />

        {/* Team Logos */}
        <section className='py-24 bg-background'>
          <div className='container mx-auto px-6 md:px-12'>
            <div className='mb-12'>
              <span className='text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3'>
                OUR SQUADS
              </span>
              <h2 className='text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none'>
                TEAM LOGOS
              </h2>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8'>
              {teamLogos.map((logo, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center p-6 md:p-8 bg-surface-container/40 hover:bg-surface-container transition-colors duration-300 group gap-4'
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className='w-full max-w-[120px] h-auto object-contain group-hover:scale-110 transition-transform duration-500'
                  />
                  <span className='text-white/50 group-hover:text-white font-headline font-bold text-[10px] uppercase tracking-widest text-center transition-colors'>
                    {logo.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <MembersSection />
      </main>
      <Footer />
    </div>
  );
}
