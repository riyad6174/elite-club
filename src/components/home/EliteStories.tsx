"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface StoryProp {
  id?: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  img: string;
}

interface EliteStoriesProps {
  stories?: StoryProp[];
}

const EliteStories = ({ stories: propStories }: EliteStoriesProps) => {
  const defaultStories: StoryProp[] = [
    {
      category: "ANNUAL EVENT",
      title: "AGM 2025: A STEP TOWARD GROWTH AND UNITY",
      excerpt: "In May 2025, RESC held its Annual General Meeting at the Regina Public Library — reviewing the past year, celebrating accomplishments, sharing financial updates, and charting the path forward together.",
      date: "MAY 2025",
      author: "MOHAMMAD ZAKIRUL HASAN",
      img: "/assets/stories/annual-general-meeting.png",
    },
    {
      category: "COMMUNITY CELEBRATION",
      title: "EID PARTY 2025: A DAY OF TOGETHERNESS AT RIVERPARK",
      excerpt: "Over 30 families and nearly 100 individuals gathered at RiverPark Campground in Lumsden — enjoying tug-of-war, delicious food by Mehman Mezban Restaurant, and a beautiful drive through Lumsden together.",
      date: "JUN 14, 2025",
      author: "RESC COMMUNITY",
      img: "/assets/stories/eid-party-2025.png",
    },
  ];

  const stories = propStories && propStories.length > 0 ? propStories : defaultStories;

  return (
    <section className="py-24 md:py-40 bg-surface-container">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
        >
          <div className="space-y-4">
            <span className="text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block">THE GAZETTE</span>
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">EVENT STORIES</h2>
          </div>
          <Link href="/stories" className="bg-surface-bright/20 text-white font-headline font-bold px-8 py-3 rounded-sm border border-outline-variant/10 hover:bg-surface-bright transition-all text-sm tracking-[0.2em] uppercase inline-block">
            EXPLORE ALL STORIES
          </Link>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {stories.map((story, index) => {
            const ArticleWrapper = story.id
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link href={`/stories/${story.id}`} className="block group">
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className="group">{children}</div>
                );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ArticleWrapper>
                  <article
                    className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
                  >
                    <div className="w-full lg:w-3/5 overflow-hidden clip-slant aspect-video lg:aspect-auto lg:h-[500px]">
                      <img
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        src={story.img}
                      />
                    </div>

                    <div className="w-full lg:w-2/5 space-y-6 md:space-y-8">
                      <div className="flex items-center gap-4">
                        <span className="h-[2px] w-12 bg-primary"></span>
                        <span className="text-tertiary font-headline font-bold text-xs tracking-widest uppercase">
                          {story.category}
                        </span>
                      </div>

                      <h3 className="text-white font-headline font-black text-3xl md:text-5xl uppercase leading-none tracking-tighter group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>

                      <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                        {story.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                        <div className="flex flex-col gap-1">
                          <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase italic">WRITTEN BY</span>
                          <span className="text-white font-headline font-bold text-xs uppercase tracking-tight">{story.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{story.date}</span>
                          {story.id && (
                            <span className="text-primary text-[10px] font-bold uppercase tracking-wider group-hover:underline">
                              READ MORE →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </ArticleWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EliteStories;
