import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ActionGallery from "@/components/home/ActionGallery";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <ActionGallery />
        <section className="py-24 bg-surface-container">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-16">MATCH DAY ARCHIVE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://images.pexels.com/photos/159515/football-american-football-runner-player-159515.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/163452/basketball-hoop-basketball-game-ball-163452.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800"
              ].map((img, idx) => (
                <div key={idx} className="aspect-square group overflow-hidden relative">
                  <img
                    src={img}
                    alt={`Gallery Image ${idx}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
            <div className="mt-20 flex justify-center">
              <button className="kinetic-gradient text-on-primary-fixed font-headline font-black px-12 py-5 rounded-sm uppercase tracking-widest text-sm shadow-xl">
                LOAD MORE FOOTAGE
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
