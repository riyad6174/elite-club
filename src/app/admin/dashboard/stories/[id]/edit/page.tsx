"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaDrawer from "@/components/admin/MediaDrawer";

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
}

export default function EditStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "" as "success" | "error" | "", text: "" });
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  const [form, setForm] = useState<Story>({
    _id: "",
    title: "",
    excerpt: "",
    body: "",
    category: "",
    date: "",
    author: "",
    images: [],
    quote: "",
    quoteBy: "",
    isPublished: false,
  });

  useEffect(() => {
    fetchStory();
    fetch("/api/stories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const cats = [
            ...new Set<string>(
              data
                .map((s: any) => (s.category as string) || "")
                .filter(Boolean)
                .map((c: string) => c.toUpperCase())
            ),
          ].sort();
          setExistingCategories(cats);
        }
      })
      .catch(() => {});
  }, [storyId]);

  const fetchStory = async () => {
    try {
      const res = await fetch(`/api/stories/${storyId}`);
      if (!res.ok) throw new Error("Failed to fetch story");
      const data = await res.json();
      setForm(data);
    } catch (err) {
      console.error("Error fetching story:", err);
      showBanner("error", "Failed to load story. It may not exist.");
    } finally {
      setLoading(false);
    }
  };

  const showBanner = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setForm({ ...form, images: [data.url] });
      showBanner("success", "Cover image uploaded");
    } catch (err: any) {
      showBanner("error", err.message);
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/stories/${storyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update story");

      showBanner("success", "Story updated successfully!");
      setTimeout(() => router.push("/admin/dashboard/stories"), 1000);
    } catch (err: any) {
      showBanner("error", err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING STORY...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Banner */}
      {message.text && (
        <div
          className={`p-4 border-l-4 rounded-sm text-sm font-semibold transition-all ${
            message.type === "success"
              ? "bg-tertiary-container/30 border-tertiary text-white"
              : "bg-error-container/30 border-error text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Breadcrumb + Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/dashboard/stories"
              className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              STORIES
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">
              EDIT
            </span>
          </div>
          <h2 className="text-white font-headline font-black text-2xl uppercase tracking-tight">
            EDIT STORY
          </h2>
          <p className="text-on-surface-variant text-xs mt-1 max-w-lg truncate">
            Editing: {form.title || "Untitled"}
          </p>
        </div>

        <button
          onClick={() => setMediaDrawerOpen(true)}
          className="flex items-center gap-2 bg-surface-container-high/40 border border-outline-variant/20 hover:border-primary/40 text-white font-headline font-bold px-4 py-2.5 rounded-sm text-[10px] tracking-wider uppercase transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">perm_media</span>
          MEDIA LIBRARY
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Title + Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              STORY TITLE
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="Enter article title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              CATEGORY
            </label>
            <input
              type="text"
              list="story-categories-edit"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value.toUpperCase() })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="SELECT OR TYPE CATEGORY"
            />
            <datalist id="story-categories-edit">
              {existingCategories.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {existingCategories.length > 0 && (
              <p className="text-white/25 text-[10px] tracking-wider">
                Existing: {existingCategories.join(" · ")}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Date + Author */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              DATE
            </label>
            <input
              type="text"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. MAY 2025"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              AUTHOR
            </label>
            <input
              type="text"
              required
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="Enter author name"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              COVER IMAGE
            </label>
            <div className="flex items-center gap-3">
              {form.images.length > 0 && (
                <img
                  src={form.images[0]}
                  alt="Cover preview"
                  className="w-12 h-12 object-cover rounded-sm border border-outline-variant/20"
                />
              )}
              <label className="bg-surface-bright/20 border border-outline-variant/15 hover:bg-surface-bright text-white text-[10px] font-bold px-3 py-2 rounded-sm cursor-pointer uppercase tracking-wider transition-colors">
                {form.images.length > 0 ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-white/25 text-[10px] tracking-wider">
              💡 Please upload images under 800 KB
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
            EXCERPT (SHORT INTRO)
          </label>
          <input
            type="text"
            required
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
            placeholder="Brief description showing in list preview"
          />
        </div>

        {/* Rich Text Body */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              BODY TEXT
            </label>
            <button
              type="button"
              onClick={() => setMediaDrawerOpen(true)}
              className="text-primary text-[9px] font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              📎 OPEN MEDIA LIBRARY TO GET IMAGE URLS
            </button>
          </div>
          <RichTextEditor
            value={form.body}
            onChange={(content) => setForm({ ...form, body: content })}
            placeholder="Edit your story content..."
          />
          <p className="text-white/25 text-[10px] tracking-wider">
            Use the toolbar to format text. To add images, upload to Media Library first, copy the URL, then use the Image button in the toolbar to insert by URL.
          </p>
        </div>

        {/* Quote section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              FEATURED QUOTE (OPTIONAL)
            </label>
            <input
              type="text"
              value={form.quote || ""}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="Important quote to highlight"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              QUOTE ATTRIBUTION
            </label>
            <input
              type="text"
              value={form.quoteBy || ""}
              onChange={(e) => setForm({ ...form, quoteBy: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. Director Hasan"
            />
          </div>
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3 bg-surface-container-high/20 border border-outline-variant/10 rounded-sm p-4">
          <button
            type="button"
            onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
            className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
              form.isPublished ? "bg-tertiary" : "bg-surface-bright"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                form.isPublished ? "left-5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-white/70 text-xs font-bold uppercase tracking-wider">
            {form.isPublished ? "PUBLISHED" : "DRAFT"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
          <Link
            href="/admin/dashboard/stories"
            className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            ← BACK TO STORIES
          </Link>
          <div className="flex gap-3">
            <Link
              href="/admin/dashboard/stories"
              className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-colors"
            >
              CANCEL
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-6 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </form>

      {/* Media Drawer */}
      <MediaDrawer
        isOpen={mediaDrawerOpen}
        onClose={() => setMediaDrawerOpen(false)}
      />
    </div>
  );
}
