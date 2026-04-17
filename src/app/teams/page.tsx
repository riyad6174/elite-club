import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Teams from "@/components/home/Teams";

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Teams />
        <section className="py-24 bg-surface text-white">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-16">SQUAD OVERVIEW</h2>
            <div className="space-y-12">
              {[
                { name: "SENIOR ELITES", level: "PRO LEAGUE", description: "Our flagship squad representing the pinnacle of the club's athletic prowess." },
                { name: "RESERVE VANGUARD", level: "DIVISION 1", description: "The immediate pathway to pro selection, focused on intense competition." },
                { name: "ELITE ACADEMY", level: "U-19", description: "Nurturing the next generation of icons with world-class coaching." }
              ].map((squad, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 p-12 bg-surface-container-high border-l-4 border-primary">
                  <div className="md:w-1/3">
                    <h3 className="font-headline font-black text-3xl uppercase tracking-tighter">{squad.name}</h3>
                    <p className="text-tertiary font-bold tracking-widest text-xs uppercase mt-2">{squad.level}</p>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-on-surface-variant text-xl font-light">{squad.description}</p>
                    <button className="mt-8 text-white font-headline font-bold uppercase tracking-widest text-sm underline underline-offset-8 decoration-primary hover:text-primary transition-colors">
                      VIEW SQUAD LIST
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
