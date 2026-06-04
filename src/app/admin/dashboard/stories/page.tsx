"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import Link from "next/link";

interface Story {
  _id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  author: string;
  images: string[];
  quote?: string;
  quoteBy?: string;
  isPublished: boolean;
  createdAt: string;
}

export default function StoriesManagerPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching stories:", err);
      toast("error", "Failed to fetch stories from database");
    } finally {
      setLoading(false);
    }
  };


  const handleTogglePublishStory = async (story: Story) => {
    try {
      const res = await fetch(`/api/stories/${story._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !story.isPublished }),
      });
      if (!res.ok) throw new Error("Failed to change status");
      toast("success", `Story ${!story.isPublished ? "Published" : "Unpublished"}`);
      fetchStories();
    } catch (err: any) {
      toast("error", err.message);
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete story");
      toast("success", "Story deleted");
      fetchStories();
    } catch (err: any) {
      toast("error", err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING STORIES CONTENT...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-headline font-black text-2xl uppercase">STORIES LIST</h2>
          <p className="text-on-surface-variant text-xs mt-1">Write, edit, publish or delete blog articles and announcements.</p>
        </div>
        <Link
          href="/admin/dashboard/stories/create"
          className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2"
        >
          + NEW STORY
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.length === 0 ? (
          <div className="col-span-full glass-panel p-12 text-center text-white/40 text-sm">
            No stories found. Write a new story to populate the feed.
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story._id}
              className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 flex flex-col justify-between h-80 relative overflow-hidden"
            >
              {/* Left Accent turf blade */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-tertiary font-headline font-bold tracking-widest uppercase">
                    {story.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider ${
                        story.isPublished
                          ? "bg-tertiary/20 text-tertiary"
                          : "bg-surface-bright text-white/40"
                      }`}
                    >
                      {story.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{story.date}</span>
                  </div>
                </div>

                <h3 className="text-white font-headline font-black text-xl uppercase tracking-tight line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-on-surface-variant text-xs font-light line-clamp-3 leading-relaxed">
                  {story.excerpt || story.body}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-outline-variant/10 mt-auto">
                <button
                  onClick={() => handleTogglePublishStory(story)}
                  className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm border cursor-pointer ${
                    story.isPublished
                      ? "border-white/20 text-white/70 hover:bg-white/5"
                      : "border-tertiary/30 text-tertiary hover:bg-tertiary/5"
                  }`}
                >
                  {story.isPublished ? "UNPUBLISH" : "PUBLISH"}
                </button>
                <Link
                  href={`/admin/dashboard/stories/${story._id}/edit`}
                  className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-3 py-1.5 rounded-sm text-[10px] tracking-wider uppercase ml-auto"
                >
                  EDIT
                </Link>
                <button
                  onClick={() => handleDeleteStory(story._id)}
                  className="text-error hover:bg-error/10 border border-error/20 font-headline font-bold px-3 py-1.5 rounded-sm text-[10px] tracking-wider uppercase cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
