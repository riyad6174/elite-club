import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BoardOfDirectors from "@/components/home/BoardOfDirectors";
import Teams from "@/components/home/Teams";
import Players from "@/components/home/Players";
import EliteStories from "@/components/home/EliteStories";
import Sponsors from "@/components/home/Sponsors";
import ActionGallery from "@/components/home/ActionGallery";
import JoinUs from "@/components/home/JoinUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <BoardOfDirectors />
        <Teams />
        <Players />
        <EliteStories />
        <Sponsors />
        <ActionGallery />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}
