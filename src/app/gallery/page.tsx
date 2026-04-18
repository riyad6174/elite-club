import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sportsGallery = [
  {
    name: "SUMMER LEAGUE MATCHES",
    description: "Weekend outdoor soccer matches played every Saturday and Sunday morning throughout the summer season.",
    images: [
      { src: "/assets/team-images/FRR00778.jpg", alt: "Summer match action" },
      { src: "/assets/team-images/FRR00782.jpg", alt: "Players on the field" },
      { src: "/assets/team-images/FRR00783.jpg", alt: "Team in play" },
      { src: "/assets/team-images/FRR00795.jpg", alt: "Match day" },
    ],
  },
  {
    name: "ELITE WINTER TOURNAMENT 2026",
    description: "RESC's annual indoor winter tournament — competitive, high-energy soccer keeping the club active through the cold months.",
    images: [
      { src: "/assets/team-images/elite-winter-2026-1.png", alt: "Elite Winter 2026 squad" },
      { src: "/assets/team-images/elite-winter-2026-2.png", alt: "Elite Winter 2026 teams" },
      { src: "/assets/team-images/ELITE-WINTER-20262-1536x864.png", alt: "Winter tournament action" },
      { src: "/assets/team-images/ELITE-WINTER-20264-1536x864.png", alt: "Winter cup highlights" },
    ],
  },
];

const eventsGallery = [
  {
    name: "ANNUAL GENERAL MEETING 2025",
    description: "RESC's AGM held at Regina Public Library in May 2025 — a platform for transparency, member voices, and planning the club's future.",
    images: [
      { src: "/assets/stories/annual-general-meeting.png", alt: "AGM 2025 at Regina Public Library" },
    ],
  },
  {
    name: "EID PARTY 2025",
    description: "Over 30 families and nearly 100 individuals celebrated Eid at RiverPark Campground in Lumsden — tug-of-war, great food, and joyful memories.",
    images: [
      { src: "/assets/stories/eid-party-2025.png", alt: "Eid Party 2025 celebrations" },
      { src: "/assets/stories/eid-party-2025-2.jpg", alt: "Eid Party 2025 gathering" },
    ],
  },
  {
    name: "ANNUAL TOURNAMENTS 2024",
    description: "RESC's signature summer tournament — featuring special guest MLA Noor Burki, prize giveaways, and a full day of competitive soccer.",
    images: [
      { src: "/assets/stories/annual-tournaments.png", alt: "Annual Tournament 2024" },
      { src: "/assets/stories/annual-tournaments-2.png", alt: "Tournament highlights" },
    ],
  },
  {
    name: "CITY FAMILY BUS TOUR 2024",
    description: "On July 22, 2024, RESC chartered a city bus for a scenic tour of Regina — North to South, East to West — with food, laughter, and family bonding on board.",
    images: [
      { src: "/assets/stories/resc-city-family-bus-tour-2024.png", alt: "City Family Bus Tour 2024" },
      { src: "/assets/stories/resc-city-family-bus-tour-2024-2.png", alt: "Bus tour families" },
    ],
  },
  {
    name: "KIDS' SUMMER CAMP 2024",
    description: "32 children aged 6–14 trained every Tuesday and Thursday from July to August in collaboration with the Royal Bengal Soccer Association.",
    images: [
      { src: "/assets/stories/kids-summer-soccer-camp-2024.png", alt: "Kids Summer Camp 2024" },
      { src: "/assets/stories/kids-summer-soccer-camp-2024-2.png", alt: "Camp training session" },
    ],
  },
  {
    name: "FUNDRAISING CONCERT 2024",
    description: "A live music concert at the University of Regina on September 22, 2024 — featuring Bong Street band to raise funds for Bangladesh flood relief.",
    images: [
      { src: "/assets/stories/resc-fundraising-concert.png", alt: "Fundraising Concert 2024" },
      { src: "/assets/stories/image6.png", alt: "Concert night at U of R" },
    ],
  },
];

export default function GalleryPage() {
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

            <div className="space-y-20">
              {sportsGallery.map((album, albumIndex) => (
                <div key={albumIndex}>
                  <div className="mb-8 pb-6 border-b border-outline-variant/20">
                    <h3 className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">
                      {album.name}
                    </h3>
                    <p className="text-on-surface-variant text-sm font-light">{album.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {album.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`group overflow-hidden relative ${idx === 0 ? "sm:col-span-2 aspect-video" : "aspect-square"}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-bold uppercase tracking-widest">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

            <div className="space-y-20">
              {eventsGallery.map((album, albumIndex) => (
                <div key={albumIndex}>
                  <div className="mb-8 pb-6 border-b border-outline-variant/20">
                    <h3 className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2">
                      {album.name}
                    </h3>
                    <p className="text-on-surface-variant text-sm font-light">{album.description}</p>
                  </div>

                  {album.images.length === 1 ? (
                    <div className="group overflow-hidden relative aspect-video max-w-3xl">
                      <img
                        src={album.images[0].src}
                        alt={album.images[0].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">{album.images[0].alt}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {album.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`group overflow-hidden relative ${idx === 0 ? "sm:col-span-2 aspect-video" : "aspect-square"}`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
