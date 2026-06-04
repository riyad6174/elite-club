import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EliteStories from "@/components/home/EliteStories";
import { connectToDatabase } from "@/lib/mongodb";

export const revalidate = 60;

export default async function StoriesPage() {
  let featuredStories: {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    img: string;
  }[] = [];

  let hasStories = false;

  try {
    const { db } = await connectToDatabase();
    const dbStories = await db
      .collection("stories")
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .toArray();

    hasStories = dbStories.length > 0;

    featuredStories = dbStories.map((story) => ({
      id: story._id.toString(),
      category: story.category || "GENERAL",
      title: story.title,
      excerpt: story.excerpt || "",
      date: story.date,
      author: story.author,
      img: story.images?.[0] || "/assets/stories/annual-general-meeting.png",
    }));
  } catch (error) {
    console.error("Failed to load stories from MongoDB:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Page Header */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tertiary/5 blur-[180px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <span className="text-tertiary font-headline font-bold tracking-[0.5em] text-xs uppercase block mb-4">
              THE GAZETTE
            </span>
            <h1 className="text-white font-headline font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">
              EVENT<br />
              <span className="kinetic-text">STORIES</span>
            </h1>
          </div>
        </section>

        {/* Stories */}
        {hasStories ? (
          <EliteStories stories={featuredStories} />
        ) : (
          <section className="py-32 bg-surface-container-lowest">
            <div className="container mx-auto px-6 md:px-12 text-center">
              <span className="material-symbols-outlined text-5xl text-white/20 block mb-4">article</span>
              <p className="text-white/40 font-headline font-bold text-lg uppercase tracking-widest">
                NO STORIES PUBLISHED YET
              </p>
              <p className="text-white/25 text-sm mt-2">Check back soon for updates from RESC.</p>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}
