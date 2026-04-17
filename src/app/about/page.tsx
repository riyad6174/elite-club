import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";
import BoardOfDirectors from "@/components/home/BoardOfDirectors";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <About />
        <BoardOfDirectors />
        <section className="py-24 bg-surface-container-lowest overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-12">OUR PHILOSOPHY</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "DISCIPLINE", desc: "The foundation of every elite movement. We believe in the power of routine and the beauty of hard work." },
                { title: "INNOVATION", desc: "Pushing athletic boundaries with state-of-the-art tech, recovery protocols, and tactical evolution." },
                { title: "LEGACY", desc: "Every member of Regina Elites carries the torch of 100 years of pride and athletic prestige." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <span className="text-primary font-headline font-black text-6xl opacity-20 italic">0{idx + 1}</span>
                  <h3 className="text-white font-headline font-black text-2xl uppercase tracking-tighter">{item.title}</h3>
                  <p className="text-on-surface-variant font-light leading-relaxed">{item.desc}</p>
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
