import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SummerCampValues from "@/components/home/SummerCampValues";
import { connectToDatabase } from "@/lib/mongodb";

export const revalidate = 60;

const defaultCamp = {
  title: "KIDS' SUMMER CAMP",
  description: "Empowering the next generation of athletes and community leaders through the beautiful game.",
  dates: "July – August",
  ageGroup: "6–14 Years",
  fees: "Free (Sponsored)",
  location: "Regina Fields / University of Regina",
  registrationLink: "https://www.facebook.com/groups/574758087066199",
  bannerImage: "",
  campDetails: "",
  images: [
    { src: "/assets/stories/kids-summer-soccer-camp-2024.png", alt: "Summer Camp — Match Day" },
    { src: "/assets/stories/kids-summer-soccer-camp-2024-2.png", alt: "Summer Camp — Training Session" },
  ],
  announcements: [
    { date: "June 2026", text: "Registrations for the upcoming summer season are now open! Space is limited." },
  ],
  schedule: [
    { title: "Tuesday Sessions", date: "Every Tuesday", time: "6:00 PM - 8:00 PM" },
    { title: "Thursday Sessions", date: "Every Thursday", time: "6:00 PM - 8:00 PM" },
  ],
};

export default async function SummerCampPage() {
  let camp = defaultCamp;

  try {
    const { db } = await connectToDatabase();
    const dbCamp = await db.collection("kids_camp").findOne({});
    if (dbCamp) {
      camp = {
        title: dbCamp.title || defaultCamp.title,
        description: dbCamp.description || defaultCamp.description,
        dates: dbCamp.dates || defaultCamp.dates,
        ageGroup: dbCamp.ageGroup || defaultCamp.ageGroup,
        fees: dbCamp.fees || defaultCamp.fees,
        location: dbCamp.location || defaultCamp.location,
        registrationLink: dbCamp.registrationLink || defaultCamp.registrationLink,
        bannerImage: dbCamp.bannerImage || "",
        campDetails: dbCamp.campDetails || "",
        images: Array.isArray(dbCamp.images) && dbCamp.images.length > 0 ? dbCamp.images : defaultCamp.images,
        announcements: Array.isArray(dbCamp.announcements) ? dbCamp.announcements : [],
        schedule: Array.isArray(dbCamp.schedule) ? dbCamp.schedule : [],
      };
    }
  } catch (error) {
    console.error("Failed to load kids camp data from MongoDB, using fallback:", error);
  }

  const highlights = [
    { number: "32", label: "YOUNG ATHLETES" },
    { number: "2", label: "MONTHS OF PLAY" },
    { number: camp.ageGroup.replace(/\s*(years|old)\s*/gi, "").trim(), label: "AGES WELCOME" },
    { number: "2x", label: "SESSIONS / WEEK" },
  ];

  const featuredImages = camp.images.slice(0, 2);
  const gridImages = camp.images.slice(2, 6);
  const heroBg = camp.bannerImage || camp.images[0]?.src || "";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
          <div className="absolute inset-0 z-0">
            {heroBg && (
              <img
                src={heroBg}
                alt="Kids playing at summer camp"
                className="w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
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
            <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
              {camp.description}
            </p>
            <a
              href={camp.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-8 py-4 rounded-sm text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
            >
              REGISTER FOR CAMP
            </a>
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

        {/* Announcements */}
        {camp.announcements.length > 0 && (
          <section className="pt-24 bg-background">
            <div className="container mx-auto px-6 md:px-12">
              <div className="glass-panel border-l-4 border-tertiary p-6 md:p-8 rounded-sm">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">
                  CAMP ANNOUNCEMENT & UPDATES
                </span>
                <div className="space-y-4">
                  {camp.announcements.map((ann, idx) => (
                    <div key={idx} className="text-white/80 font-light text-base leading-relaxed">
                      <span className="text-primary font-bold text-xs uppercase tracking-wider block md:inline md:mr-3">{ann.date}</span>
                      {ann.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About the Camp */}
        <section className="py-24 md:py-36 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div className="space-y-8">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block">
                  ABOUT THE CAMP
                </span>
                <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">
                  BUILDING THE<br />
                  <span className="kinetic-text">NEXT GENERATION</span>
                </h2>
                <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                  In 2024, <strong className="text-white">Regina Elites Sporting Club</strong> proudly expanded its impact by hosting its first-ever Kids&apos; Summer Camp — a collaborative initiative with the{" "}
                  <strong className="text-white">Royal Bengal Soccer Association (RBSA)</strong>, an internationally recognized sports organization affiliated with the University of Regina.
                </p>
                <p className="text-on-surface-variant/70 text-base font-light leading-relaxed">
                  Over the course of two months, children enthusiastically participate in training sessions designed to build sportsmanship, discipline, and healthy exercise habits.
                </p>
                <p className="text-on-surface-variant/70 text-base font-light leading-relaxed">
                  The sessions are organized and managed by members of RBSA and RESC, who bring both experience and passion to every training and matchday.
                </p>
              </div>

              {/* Camp Metadata Card */}
              <div className="glass-panel border border-outline-variant/15 p-8 rounded-sm space-y-6 relative">
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-primary" />
                <h3 className="text-white font-headline font-black text-xl uppercase tracking-tighter pb-4 border-b border-outline-variant/10">CAMP METADATA</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">DATES</span>
                    <span className="text-white text-sm font-semibold">{camp.dates}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">AGES</span>
                    <span className="text-white text-sm font-semibold">{camp.ageGroup}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-outline-variant/5">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">FEES</span>
                    <span className="text-white text-sm font-semibold">{camp.fees}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">LOCATION</span>
                    <span className="text-white text-sm font-semibold text-right max-w-[200px]">{camp.location}</span>
                  </div>
                </div>
                <a
                  href={camp.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold py-3 rounded-sm text-xs tracking-widest uppercase transition-colors"
                >
                  JOIN THIS SESSION
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Camp Details (rich text) */}
        {camp.campDetails && (
          <section className="py-24 bg-surface-container">
            <div className="container mx-auto px-6 md:px-12">
              <div className="mb-12">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">PROGRAMME INFORMATION</span>
                <h2 className="text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">CAMP DETAILS</h2>
              </div>
              <div className="max-w-4xl">
                {camp.campDetails.includes("<") ? (
                  <div
                    className="story-body"
                    dangerouslySetInnerHTML={{ __html: camp.campDetails }}
                  />
                ) : (
                  <p className="text-on-surface-variant text-lg font-light leading-relaxed whitespace-pre-line">
                    {camp.campDetails}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Weekly Schedule */}
        {camp.schedule.length > 0 && (
          <section className="py-24 bg-surface-container-lowest">
            <div className="container mx-auto px-6 md:px-12">
              <div className="mb-16">
                <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">ROUTINE WORK</span>
                <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">WEEKLY SCHEDULE</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {camp.schedule.map((session, idx) => (
                  <div key={idx} className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-tertiary" />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-white font-headline font-black text-lg uppercase tracking-tight">{session.title}</h4>
                        <p className="text-on-surface-variant text-xs mt-1">{session.date}</p>
                      </div>
                      <span className="text-primary font-headline font-bold text-xs uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-sm flex-shrink-0">
                        {session.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* Quote */}
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
        {(featuredImages.length > 0 || gridImages.length > 0) && (
          <section className="py-24 bg-background">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-2">PHOTO GALLERY</span>
                  <h2 className="text-white font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">CAMP HIGHLIGHTS</h2>
                </div>
              </div>

              {featuredImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {featuredImages.map((img, idx) => (
                    <div key={idx} className="aspect-video overflow-hidden group relative">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                        <p className="text-white font-headline font-bold text-xs uppercase tracking-widest">{img.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {gridImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gridImages.map((img, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden group relative">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-[10px] font-bold uppercase tracking-widest">{img.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
