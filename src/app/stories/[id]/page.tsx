import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ShareButtons from "@/components/stories/ShareButtons";
import { connectToDatabase } from "@/lib/mongodb";

export const revalidate = 60;

async function getStory(id: string) {
  try {
    if (!ObjectId.isValid(id)) return null;
    const { db } = await connectToDatabase();
    const story = await db
      .collection("stories")
      .findOne({ _id: new ObjectId(id), isPublished: true });
    return story;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) {
    return { title: "Story Not Found | Regina Elites Sporting Club" };
  }

  const plainBody = story.body?.replace(/<[^>]+>/g, "") || "";
  const description =
    story.excerpt ||
    plainBody.slice(0, 160).trim() ||
    "Read this story from Regina Elites Sporting Club.";
  const coverImage = story.images?.[0];

  return {
    title: `${story.title} | Regina Elites Sporting Club`,
    description,
    openGraph: {
      title: story.title,
      description,
      type: "article",
      publishedTime: story.createdAt?.toISOString?.() ?? undefined,
      authors: story.author ? [story.author] : undefined,
      ...(coverImage && {
        images: [{ url: coverImage, width: 1200, height: 630, alt: story.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
      ...(coverImage && { images: [coverImage] }),
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) notFound();

  const coverImage = story.images?.[0];
  const additionalImages: string[] = (story.images || []).slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-background">
          {coverImage ? (
            <>
              <img
                src={coverImage}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-background" />
            </>
          )}

          <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16 pt-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8">
              <Link
                href="/stories"
                className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
              >
                STORIES
              </Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">
                {story.category}
              </span>
            </nav>

            <div className="flex items-center gap-4 mb-5">
              <span className="h-[2px] w-10 bg-primary flex-shrink-0" />
              <span className="text-tertiary font-headline font-bold text-xs tracking-widest uppercase">
                {story.category}
              </span>
              <span className="text-white/30 text-xs font-bold tracking-widest uppercase ml-auto">
                {story.date}
              </span>
            </div>

            <h1 className="text-white font-headline font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none mb-6 max-w-5xl">
              {story.title}
            </h1>

            <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
              BY {story.author}
            </p>
          </div>
        </section>

        {/* Article */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto space-y-10">

              {/* Lead / Excerpt */}
              {story.excerpt && (
                <p className="text-on-surface-variant text-xl md:text-2xl font-light leading-relaxed border-l-4 border-primary pl-6">
                  {story.excerpt}
                </p>
              )}

              {/* Body */}
              {story.body && (
                story.body.includes("<") ? (
                  <div
                    className="story-body"
                    dangerouslySetInnerHTML={{ __html: story.body }}
                  />
                ) : (
                  <p className="text-white/90 text-lg font-light leading-relaxed whitespace-pre-line">
                    {story.body}
                  </p>
                )
              )}

              {/* Featured Quote */}
              {story.quote && (
                <blockquote className="border-l-4 border-tertiary pl-6 py-2 my-8">
                  <p className="text-white font-headline font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  {story.quoteBy && (
                    <footer className="text-tertiary font-bold text-xs tracking-widest uppercase mt-4 not-italic">
                      — {story.quoteBy}
                    </footer>
                  )}
                </blockquote>
              )}

              {/* Author */}
              <div className="pt-8 border-t border-outline-variant/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-headline font-black text-sm uppercase">
                    {story.author?.[0] || "R"}
                  </span>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    Written by
                  </p>
                  <p className="text-white font-headline font-bold text-sm uppercase tracking-tight">
                    {story.author}
                  </p>
                </div>
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest ml-auto">
                  {story.date}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional images */}
        {additionalImages.length > 0 && (
          <section className="py-16 bg-surface-container-low">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-white font-headline font-black text-2xl uppercase tracking-tighter mb-8">
                MORE PHOTOS
              </h2>
              <div
                className={`grid gap-4 ${
                  additionalImages.length === 1
                    ? "grid-cols-1 max-w-2xl"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {additionalImages.map((src, idx) => (
                  <div key={idx} className="aspect-video overflow-hidden group rounded-sm">
                    <img
                      src={src}
                      alt={`${story.title} — photo ${idx + 2}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Share */}
        <section className="py-16 bg-background border-t border-outline-variant/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
              <ShareButtons title={story.title} excerpt={story.excerpt || ""} />
            </div>
          </div>
        </section>

        {/* Navigation footer */}
        <section className="py-10 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
            <Link
              href="/stories"
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
            >
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">BACK TO STORIES</span>
            </Link>
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              RESC HOME
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
