import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SummerCampValues from "@/components/home/SummerCampValues";

const highlights = [
  { number: "32", label: "YOUNG ATHLETES" },
  { number: "2", label: "MONTHS OF PLAY" },
  { number: "6–14", label: "AGES WELCOME" },
  { number: "2x", label: "SESSIONS / WEEK" },
];

export default function SummerCampPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Kids playing at summer camp"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 py-24">
            <span className="text-primary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-6">
              YOUTH DEVELOPMENT • ESTABLISHED 2024
            </span>
            <h1 className="text-white font-headline font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter leading-none mb-8">
              KIDS&apos;<br />
              <span className="kinetic-text">SUMMER</span><br />
              CAMP
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              Empowering the next generation of athletes and community leaders through the beautiful game.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-surface-container-low py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-outline-variant/20">
              {highlights.map((item, index) => (
                <div key={index} className="text-center px-4">
                  <p className="text-white font-headline font-black text-4xl md:text-6xl tracking-tighter leading-none kinetic-text">
                    {item.number}
                  </p>
                  <p className="text-on-surface-variant font-bold text-[10px] md:text-xs tracking-widest uppercase mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Camp */}
        <section className="py-24 md:py-40 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-8">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block">
                  ABOUT THE CAMP
                </span>
                <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">
                  BUILDING THE<br />
                  <span className="kinetic-text">NEXT GENERATION</span>
                </h2>
                <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                  In 2024, <strong className="text-white">Regina Elite Sporting Club</strong> proudly expanded its impact by hosting its first-ever Kids&apos; Summer Camp — a collaborative initiative with the{" "}
                  <strong className="text-white">Royal Bengal Soccer Association (RBSA)</strong>, an internationally recognized sports organization affiliated with the University of Regina.
                </p>
                <p className="text-on-surface-variant/70 text-base font-light leading-relaxed">
                  Over the course of two months from <strong className="text-white">July to August</strong>, 32 children aged 6 to 14 enthusiastically participated in sessions held <strong className="text-white">twice a week — every Tuesday and Thursday</strong> throughout the summer.
                </p>
                <p className="text-on-surface-variant/70 text-base font-light leading-relaxed">
                  The sessions were organized and managed by members of RBSA and RESC, who brought both experience and passion to every training and matchday.
                </p>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden clip-slant">
                  <img
                    src="https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Kids at summer camp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-surface-container-high border border-outline-variant/20 p-6 hidden md:block">
                  <p className="text-tertiary font-headline font-black text-3xl leading-none">JULY – AUG</p>
                  <p className="text-white/60 font-bold text-xs tracking-widest uppercase mt-1">SUMMER 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jerseys & Sponsor */}
        <section className="py-24 bg-surface-container">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] overflow-hidden clip-slant">
                <img
                  src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Summer Camp Jersey"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block">
                  JERSEYS & SPONSORSHIP
                </span>
                <h2 className="text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                  DRESSED FOR<br />
                  <span className="kinetic-text">SUCCESS</span>
                </h2>
                <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                  To make the event even more exciting, <strong className="text-white">Regina Elite Sporting Club provided exclusive Kids Summer Camp jerseys</strong> for all young participants — bright, high-quality kits that sparked team spirit and pride.
                </p>
                <p className="text-on-surface-variant/70 text-base font-light leading-relaxed">
                  These jerseys were <strong className="text-white">generously sponsored by Tandoor Kabab</strong> — a well-known local restaurant celebrated for its delicious food and support of community events.
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/10">
                  <span className="text-white/40 text-xs font-bold tracking-widest uppercase">SPONSORED BY</span>
                  <span className="text-white font-headline font-bold text-lg uppercase tracking-tight">TANDOOR KABAB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 md:py-40 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-4">
              <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block">
                WHAT KIDS LEARN
              </span>
              <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">
                VALUES WE BUILD
              </h2>
            </div>
            <SummerCampValues />
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
            <blockquote className="space-y-8">
              <p className="text-white font-headline font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-tight">
                &ldquo;We believe youth engagement through sport is essential for building confidence, leadership, and a stronger community.&rdquo;
              </p>
              <footer className="text-tertiary font-bold text-xs tracking-widest uppercase">
                — RESC DIRECTOR, ELITE SPORTING CLUB
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-2">CAMP MOMENTS</span>
                <h2 className="text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">IN THE FIELD</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
                "https://images.pexels.com/photos/3894379/pexels-photo-3894379.jpeg?auto=compress&cs=tinysrgb&w=600",
              ].map((src, idx) => (
                <div key={idx} className="aspect-square overflow-hidden group relative">
                  <img
                    src={src}
                    alt={`Camp moment ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
