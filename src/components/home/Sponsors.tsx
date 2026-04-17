const Sponsors = () => {
  const sponsors = [
    "NIKE ACTIVE",
    "ADIDAS ELITE",
    "PUMA KINETIC",
    "RED BULL RACING",
    "GATORADE PRO",
    "UNDER ARMOUR",
  ];

  return (
    <section className="py-20 md:py-32 bg-surface-container-low border-t border-outline-variant/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center gap-12 md:gap-20">
          <span className="text-white/20 font-headline font-bold text-[10px] tracking-[0.5em] uppercase">
            TRUSTED BY GLOBAL PARTNERS
          </span>
          <div className="w-full flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-24 opacity-30 invert dark:invert-0">
            {sponsors.map((sponsor) => (
              <span
                key={sponsor}
                className="font-headline font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter uppercase italic hover:opacity-100 transition-opacity cursor-default lg:whitespace-nowrap"
              >
                {sponsor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Sponsors;
