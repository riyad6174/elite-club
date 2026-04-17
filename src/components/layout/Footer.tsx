import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#000e25] w-full relative bottom-0 clip-slant-footer mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8 max-w-[1920px] mx-auto">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <span className="text-3xl md:text-4xl font-black text-[#051b38] opacity-50 font-headline uppercase">REGINA ELITES</span>
          <p className="text-white/30 text-[10px] font-headline tracking-widest max-w-xs">
            © 2024 REGINA ELITES SPORTING CLUB. KINETIC PRESTIGE ASSURED.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-headline uppercase text-[10px] tracking-widest font-bold">
          <Link href="#" className="text-white/30 hover:text-tertiary transition-colors underline decoration-on-primary-container decoration-2 underline-offset-4">PRIVACY POLICY</Link>
          <Link href="#" className="text-white/30 hover:text-tertiary transition-colors">TERMS OF SERVICE</Link>
          <Link href="#" className="text-white/30 hover:text-tertiary transition-colors">CONTACT US</Link>
          <Link href="#" className="text-white/30 hover:text-tertiary transition-colors">CAREERS</Link>
          <Link href="#" className="text-white/30 hover:text-tertiary transition-colors">SPONSORSHIP</Link>
        </div>

        <div className="flex gap-6">
          <Link href="#" className="text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">public</span>
          </Link>
          <Link href="#" className="text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">sports_basketball</span>
          </Link>
          <Link href="#" className="text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">groups</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
