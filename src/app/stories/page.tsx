import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EliteStories from "@/components/home/EliteStories";

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <EliteStories />
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-16">ARCHIVED CHRONICLES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "THE 1924 INITIATION", date: "AUG 10, 1924", category: "HISTORY" },
                { title: "REDEFINING THE ARENA", date: "SEP 05, 2023", category: "TECH" },
                { title: "YOUTH PROSPECTS HUB", date: "OCT 01, 2024", category: "ACADEMY" }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-video bg-surface-container-high mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-tertiary font-bold text-[10px] tracking-widest uppercase">{item.category}</span>
                  <h3 className="text-white font-headline font-black text-2xl uppercase tracking-tighter group-hover:text-primary transition-colors mt-2">{item.title}</h3>
                  <p className="text-white/40 text-xs mt-4 font-bold tracking-widest uppercase">{item.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-20 flex justify-center">
              <button className="text-white border border-outline-variant/30 px-12 py-4 rounded-sm font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-bright transition-all">
                BROWSE FULL ARCHIVE
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
