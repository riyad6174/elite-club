import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { connectToDatabase } from "@/lib/mongodb";

export const revalidate = 60;

interface ImageItem {
  src: string;
  alt: string;
}

interface Album {
  name: string;
  description: string;
  images: ImageItem[];
}

export default async function GalleryPage() {
  let sportsGallery: Album[] = [];
  let eventsGallery: Album[] = [];

  try {
    const { db } = await connectToDatabase();
    const dbAlbums = await db.collection("gallery_albums").find({}).sort({ order: 1 }).toArray();

    const sports = dbAlbums
      .filter((a) => a.category === "sports")
      .map((a) => ({ name: a.name, description: a.description || "", images: a.images || [] }));

    const events = dbAlbums
      .filter((a) => a.category === "events")
      .map((a) => ({ name: a.name, description: a.description || "", images: a.images || [] }));

    sportsGallery = sports;
    eventsGallery = events;
  } catch (error) {
    console.error("Failed to fetch gallery albums from MongoDB:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Page Header */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-4">
              SPORTS & EVENTS
            </span>
            <h1 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none mb-6">
              OUR GALLERY
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              Capturing the energy of every match and the warmth of every community moment — from the field to the celebration.
            </p>
            <div className="flex gap-8 mt-10">
              <a href="#sports" className="flex items-center gap-3 group">
                <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></span>
                <span className="text-white/60 group-hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">SPORTS GALLERY</span>
              </a>
              <a href="#events" className="flex items-center gap-3 group">
                <span className="w-3 h-3 rounded-full bg-secondary flex-shrink-0"></span>
                <span className="text-white/60 group-hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">EVENTS GALLERY</span>
              </a>
            </div>
          </div>
        </section>

        {/* Sports Gallery */}
        <section id="sports" className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-16">
              <span className="w-4 h-4 rounded-full bg-primary flex-shrink-0"></span>
              <div>
                <span className="text-primary font-headline font-bold tracking-widest text-xs uppercase block mb-1">CATEGORY</span>
                <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">SPORTS GALLERY</h2>
              </div>
            </div>

            {sportsGallery.length === 0 ? (
              <div className="py-20 text-center border border-outline-variant/10 rounded-sm bg-surface-container/40">
                <span className="material-symbols-outlined text-5xl text-white/15 block mb-4">sports_soccer</span>
                <p className="text-white/30 font-headline font-bold text-sm uppercase tracking-widest">
                  NO SPORTS ALBUMS YET
                </p>
                <p className="text-white/20 text-xs mt-2">Sports photo albums will appear here once added.</p>
              </div>
            ) : (
              <div className="space-y-20">
                {sportsGallery.map((album, albumIndex) => (
                  <div key={albumIndex}>
                    <div className="mb-8 pb-6 border-b border-outline-variant/20">
                      <h3 className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">
                        {album.name}
                      </h3>
                      <p className="text-on-surface-variant text-sm font-light">{album.description}</p>
                    </div>
                    {album.images.length === 0 ? (
                      <p className="text-white/30 text-xs uppercase tracking-widest">No photos in this album yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {album.images.map((img, idx) => (
                          <div key={idx} className="group overflow-hidden relative h-64">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs font-bold uppercase tracking-widest">{img.alt}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Events Gallery */}
        <section id="events" className="py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-16">
              <span className="w-4 h-4 rounded-full bg-secondary flex-shrink-0"></span>
              <div>
                <span className="text-secondary font-headline font-bold tracking-widest text-xs uppercase block mb-1">CATEGORY</span>
                <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">EVENTS GALLERY</h2>
              </div>
            </div>

            {eventsGallery.length === 0 ? (
              <div className="py-20 text-center border border-outline-variant/10 rounded-sm bg-surface-container/40">
                <span className="material-symbols-outlined text-5xl text-white/15 block mb-4">celebration</span>
                <p className="text-white/30 font-headline font-bold text-sm uppercase tracking-widest">
                  NO EVENTS ALBUMS YET
                </p>
                <p className="text-white/20 text-xs mt-2">Events photo albums will appear here once added.</p>
              </div>
            ) : (
              <div className="space-y-20">
                {eventsGallery.map((album, albumIndex) => (
                  <div key={albumIndex}>
                    <div className="mb-8 pb-6 border-b border-outline-variant/20">
                      <h3 className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">
                        {album.name}
                      </h3>
                      <p className="text-on-surface-variant text-sm font-light">{album.description}</p>
                    </div>
                    {album.images.length === 0 ? (
                      <p className="text-white/30 text-xs uppercase tracking-widest">No photos in this album yet.</p>
                    ) : album.images.length === 1 ? (
                      <div className="group overflow-hidden relative aspect-video max-w-3xl">
                        <img
                          src={album.images[0].src}
                          alt={album.images[0].alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-widest">{album.images[0].alt}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {album.images.map((img, idx) => (
                          <div key={idx} className="group overflow-hidden relative h-64">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs font-bold uppercase tracking-widest">{img.alt}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
