import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import MissionVision from "@/components/home/MissionVision";
import BoardOfDirectors from "@/components/home/BoardOfDirectors";
import Teams from "@/components/home/Teams";
import SummerCamp from "@/components/home/SummerCamp";
import EliteStories from "@/components/home/EliteStories";
import Sponsors from "@/components/home/Sponsors";
import ActionGallery from "@/components/home/ActionGallery";
import JoinUs from "@/components/home/JoinUs";
import { connectToDatabase } from "@/lib/mongodb";

export default async function Home() {
  let featuredStories: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const dbStories = await db
      .collection("stories")
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray();

    if (dbStories && dbStories.length > 0) {
      featuredStories = dbStories.map((story) => ({
        id: story._id.toString(),
        category: story.category,
        title: story.title,
        excerpt: story.excerpt || "",
        date: story.date,
        author: story.author,
        img: story.images?.[0] || "/assets/stories/annual-general-meeting.png",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch featured stories for home page from MongoDB:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <MissionVision />
        <BoardOfDirectors />
        <Teams />
        <SummerCamp />
        <EliteStories stories={featuredStories} />
        <Sponsors />
        <ActionGallery />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}
