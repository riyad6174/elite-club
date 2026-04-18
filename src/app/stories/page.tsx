import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EliteStories from "@/components/home/EliteStories";

const allStories = [
  {
    category: "ANNUAL EVENT",
    title: "AGM 2025: A STEP TOWARD GROWTH AND UNITY",
    excerpt: "In May 2025, RESC proudly held its Annual General Meeting at the Regina Public Library — reviewing the past year's activities, celebrating accomplishments, sharing financial updates, and inviting every member's voice to shape the club's future.",
    date: "MAY 2025",
    author: "MOHAMMAD ZAKIRUL HASAN",
    images: ["/assets/stories/annual-general-meeting.png"],
    body: "The AGM served as an important platform for the club to review the past year's activities, celebrate accomplishments, and share updates on finances. The venue offered a modern and comfortable space, fully equipped with a presentation hall, laptops, and a multimedia projector.",
    quote: "Our goal is to grow together, and that starts by listening to our members.",
    quoteBy: "Mohammad Zakirul Hasan, Director",
  },
  {
    category: "COMMUNITY CELEBRATION",
    title: "EID PARTY 2025: TOGETHERNESS AT RIVERPARK CAMPGROUND",
    excerpt: "Over 30 families and nearly 100 individuals gathered at RiverPark Campground in Lumsden on June 14 — a full day of tug-of-war, delicious food by Mehman Mezban Restaurant, children's games, and a scenic drive through Lumsden.",
    date: "JUN 14, 2025",
    author: "RESC COMMUNITY",
    images: ["/assets/stories/eid-party-2025.png", "/assets/stories/eid-party-2025-2.jpg"],
    body: "The Eid celebration was designed to include everyone — from the youngest children to the oldest members. Kids were at the heart of the event, with many fun games and activities planned just for them. A spirited tug-of-war match became one of the highlights, symbolizing teamwork, unity, and resilience.",
    quote: "It was more than just a party — it was a celebration of community, love, and connection.",
    quoteBy: "RESC Member",
  },
  {
    category: "SPORT",
    title: "ANNUAL TOURNAMENTS: A CELEBRATION OF SPORT AND COMMUNITY",
    excerpt: "Since 2023, RESC has hosted two major official soccer tournaments each year — Summer and Winter — bringing together athletes, families, and community members in a showcase of sportsmanship and cultural pride.",
    date: "SUMMER & WINTER 2024",
    author: "RESC DIRECTORS",
    images: ["/assets/stories/annual-tournaments.png", "/assets/stories/annual-tournaments-2.png"],
    body: "The 2024 Summer Tournament featured special guest MLA Noor Burki, Minister of Immigration and Career Training, as keynote speaker. Teams competed with enthusiasm, and attendees enjoyed delicious food, prize giveaways, and a strong sense of community.",
    quote: "Elite Sporting Club is doing more than playing soccer — it's building bridges between communities.",
    quoteBy: "Noor Burki, MLA Regina Coronation Park",
  },
  {
    category: "COMMUNITY",
    title: "CITY FAMILY BUS TOUR 2024: EXPLORING REGINA TOGETHER",
    excerpt: "On July 22, 2024, RESC coordinated an afternoon bus tour through the City of Regina — covering the entire city from North to South and East to West, with delicious food served onboard and laughter filling the air.",
    date: "JUL 22, 2024",
    author: "RESC ORGANIZERS",
    images: ["/assets/stories/resc-city-family-bus-tour-2024.png", "/assets/stories/resc-city-family-bus-tour-2024-2.png"],
    body: "More than just sightseeing, the event was infused with warmth and hospitality. Delicious food was served onboard, thoughtfully prepared and provided by the organizers. The atmosphere on the bus was light, festive, and filled with laughter from both children and adults.",
    quote: "This tour was not just about seeing Regina — it was about creating memories and strengthening the bond among our members.",
    quoteBy: "RESC Organizer",
  },
  {
    category: "YOUTH DEVELOPMENT",
    title: "KIDS' SUMMER CAMP 2024: EMPOWERING THE NEXT GENERATION",
    excerpt: "In a collaborative effort with the Royal Bengal Soccer Association, RESC hosted its first-ever Kids' Summer Camp — 32 children aged 6 to 14 training every Tuesday and Thursday from July to August, wearing jerseys sponsored by Tandoor Kabab.",
    date: "JUL – AUG 2024",
    author: "RESC DIRECTORS",
    images: ["/assets/stories/kids-summer-soccer-camp-2024.png", "/assets/stories/kids-summer-soccer-camp-2024-2.png"],
    body: "The Kids' Summer Camp has been recognized as one of the club's most successful events of 2024, reinforcing the club's mission to extend meaningful opportunities to families and children. Each game offered moments of laughter, learning, and encouragement.",
    quote: "We believe youth engagement through sport is essential for building confidence, leadership, and a stronger community.",
    quoteBy: "RESC Director",
  },
  {
    category: "HUMANITARIAN",
    title: "FUNDRAISING CONCERT 2024 FOR BANGLADESH FLOOD RELIEF",
    excerpt: "On September 22, 2024, RESC and RBSA organized a live music concert at the University of Regina featuring Bong Street band — raising funds and awareness for victims of devastating floods in Bangladesh.",
    date: "SEP 22, 2024",
    author: "RESC & RBSA",
    images: ["/assets/stories/resc-fundraising-concert.png", "/assets/stories/image6.png"],
    body: "The concert featured the popular Regina-based band Bong Street, including RESC director and musician Mizanur Rahman. Tickets were sold and the event quickly became a gathering point for the Bangladeshi community and supporters across Regina who came to show their solidarity.",
    quote: "It was more than just a concert — it was a moment to come together as one, raise our voices, and offer real help to those suffering back home.",
    quoteBy: "RESC Organizer",
  },
];

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Page Header */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tertiary/5 blur-[180px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-4">THE GAZETTE</span>
            <h1 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">
              EVENT<br />
              <span className="kinetic-text">STORIES</span>
            </h1>
          </div>
        </section>

        {/* Featured Stories */}
        <EliteStories />

        {/* Full Archive */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-16">
              <span className="text-tertiary font-headline font-bold tracking-widest text-xs uppercase block mb-3">ALL CHRONICLES</span>
              <h2 className="text-white font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">FULL ARCHIVE</h2>
            </div>

            <div className="space-y-20">
              {allStories.map((story, idx) => (
                <article key={idx} className="group border-t border-outline-variant/10 pt-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Images */}
                    <div className="lg:col-span-5 space-y-3">
                      {story.images.map((src, imgIdx) => (
                        <div key={imgIdx} className="overflow-hidden aspect-video">
                          <img
                            src={src}
                            alt={`${story.title} — ${imgIdx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-4">
                        <span className="h-[2px] w-10 bg-primary flex-shrink-0"></span>
                        <span className="text-tertiary font-headline font-bold text-[10px] tracking-widest uppercase">{story.category}</span>
                        <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase ml-auto">{story.date}</span>
                      </div>

                      <h2 className="text-white font-headline font-black text-2xl md:text-4xl uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                        {story.title}
                      </h2>

                      <p className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed">
                        {story.body}
                      </p>

                      <blockquote className="border-l-4 border-primary pl-5 italic">
                        <p className="text-white/70 text-base font-light leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                        <footer className="text-white/30 text-[10px] font-bold tracking-widest uppercase mt-2 not-italic">— {story.quoteBy}</footer>
                      </blockquote>

                      <div className="pt-4 border-t border-outline-variant/10">
                        <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase italic">BY </span>
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase">{story.author}</span>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
