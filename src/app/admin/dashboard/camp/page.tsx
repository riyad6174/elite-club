"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import MediaDrawer from "@/components/admin/MediaDrawer";

interface ImageItem {
  src: string;
  alt: string;
}

interface CampAnnouncement {
  date: string;
  text: string;
}

interface CampSchedule {
  title: string;
  date: string;
  time: string;
}

interface KidsCamp {
  _id?: string;
  title: string;
  description: string;
  dates: string;
  ageGroup: string;
  fees: string;
  location: string;
  registrationLink: string;
  bannerImage: string;
  campDetails: string;
  images: ImageItem[];
  announcements: CampAnnouncement[];
  schedule: CampSchedule[];
}

export default function KidsCampManagerPage() {
  const [campData, setCampData] = useState<KidsCamp | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mediaDrawerOpen, setMediaDrawerOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchCampData();
  }, []);

  const fetchCampData = async () => {
    try {
      const res = await fetch("/api/kids-camp");
      const data = await res.json();
      setCampData({
        ...data,
        bannerImage: data.bannerImage || "",
        campDetails: data.campDetails || "",
      });
    } catch (err) {
      console.error("Error fetching camp details:", err);
      toast("error", "Failed to fetch camp details from database");
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateCamp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campData) return;
    setSaving(true);
    try {
      const res = await fetch("/api/kids-camp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campData),
      });
      if (!res.ok) throw new Error("Failed to update camp details");
      toast("success", "Kids Camp details saved successfully");
      fetchCampData();
    } catch (err: any) {
      toast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "banner" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !campData) return;

    const formData = new FormData();
    formData.append("file", file);

    setSaving(true);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      if (target === "banner") {
        setCampData({ ...campData, bannerImage: data.url });
        toast("success", "Banner uploaded. Click Save to persist.");
      } else {
        const newImages = [...campData.images, { src: data.url, alt: "Camp field photo" }];
        setCampData({ ...campData, images: newImages });
        toast("success", "Camp image added. Click Save to persist.");
      }
    } catch (err: any) {
      toast("error", err.message);
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING KIDS CAMP CONFIGURATION...
      </div>
    );
  }

  if (!campData) return null;

  return (
    <div className="space-y-8">

      <form onSubmit={handleUpdateCamp} className="space-y-12">
        {/* Header */}
        <div>
          <h2 className="text-white font-headline font-black text-2xl uppercase">KIDS CAMP CONFIGURATION</h2>
          <p className="text-on-surface-variant text-xs mt-1">
            Configure registrations, fees, schedules, banner, and photos for the Summer Camp.
          </p>
        </div>

        {/* Part 1: Core details */}
        <div className="bg-surface-container p-8 rounded-sm border border-outline-variant/10 space-y-6">
          <h3 className="text-white font-headline font-bold text-lg uppercase pb-4 border-b border-outline-variant/10">CORE DETAILS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-full">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">CAMP TITLE</label>
              <input
                type="text"
                required
                value={campData.title}
                onChange={(e) => setCampData({ ...campData, title: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              />
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">SHORT DESCRIPTION (HERO TEXT)</label>
              <textarea
                required
                rows={3}
                value={campData.description}
                onChange={(e) => setCampData({ ...campData, description: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">CAMP DATES</label>
              <input
                type="text"
                required
                value={campData.dates}
                onChange={(e) => setCampData({ ...campData, dates: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                placeholder="e.g. July – August"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">AGE GROUP</label>
              <input
                type="text"
                required
                value={campData.ageGroup}
                onChange={(e) => setCampData({ ...campData, ageGroup: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                placeholder="e.g. 6–14 Years"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">FEES</label>
              <input
                type="text"
                required
                value={campData.fees}
                onChange={(e) => setCampData({ ...campData, fees: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                placeholder="e.g. Free (Sponsored)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">LOCATION</label>
              <input
                type="text"
                required
                value={campData.location}
                onChange={(e) => setCampData({ ...campData, location: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              />
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-white/60 font-headline font-bold text-[10px] tracking-widest uppercase block">REGISTRATION LINK</label>
              <input
                type="text"
                required
                value={campData.registrationLink}
                onChange={(e) => setCampData({ ...campData, registrationLink: e.target.value })}
                className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Part 2: Banner Image */}
        <div className="bg-surface-container p-8 rounded-sm border border-outline-variant/10 space-y-6">
          <h3 className="text-white font-headline font-bold text-lg uppercase pb-4 border-b border-outline-variant/10">HERO BANNER IMAGE</h3>
          <p className="text-on-surface-variant text-xs">
            This image appears as the full-screen background in the camp page hero section.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview */}
            <div className="w-full sm:w-64 aspect-video rounded-sm overflow-hidden bg-surface-container-high border border-outline-variant/10 flex-shrink-0 flex items-center justify-center">
              {campData.bannerImage ? (
                <img src={campData.bannerImage} alt="Banner preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="material-symbols-outlined text-3xl text-white/20 block">image</span>
                  <p className="text-white/25 text-[10px] mt-1 uppercase tracking-wider">No banner</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 bg-surface-bright/20 border border-outline-variant/15 hover:bg-surface-bright text-white font-headline font-bold px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-colors cursor-pointer w-fit">
                <span className="material-symbols-outlined text-sm">upload</span>
                {campData.bannerImage ? "CHANGE BANNER" : "UPLOAD BANNER"}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "banner")} className="hidden" />
              </label>
              {campData.bannerImage && (
                <button
                  type="button"
                  onClick={() => setCampData({ ...campData, bannerImage: "" })}
                  className="flex items-center gap-1.5 text-error hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  REMOVE BANNER
                </button>
              )}
              <p className="text-white/25 text-[10px] tracking-wider">
                Recommended: landscape image, under 800 KB
              </p>
            </div>
          </div>
        </div>

        {/* Part 3: Camp Details (Rich Text) */}
        <div className="bg-surface-container p-8 rounded-sm border border-outline-variant/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
            <div>
              <h3 className="text-white font-headline font-bold text-lg uppercase">CAMP DETAILS</h3>
              <p className="text-on-surface-variant text-xs mt-1">
                Rich text section shown on the camp page — use it for partnerships, sponsorships, programme details, or any custom content.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMediaDrawerOpen(true)}
              className="flex items-center gap-2 bg-surface-container-high/40 border border-outline-variant/20 hover:border-primary/40 text-white font-headline font-bold px-4 py-2 rounded-sm text-[10px] tracking-wider uppercase transition-all cursor-pointer flex-shrink-0"
            >
              <span className="material-symbols-outlined text-sm">perm_media</span>
              MEDIA LIBRARY
            </button>
          </div>

          <RichTextEditor
            value={campData.campDetails}
            onChange={(content) => setCampData({ ...campData, campDetails: content })}
            placeholder="Write camp details, partnership info, programme breakdown, sponsorship notes..."
          />
          <p className="text-white/25 text-[10px] tracking-wider">
            Upload images to Media Library first, copy the URL, then insert via the Image button in the toolbar.
          </p>
        </div>

        {/* Part 4: Schedule & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule */}
          <div className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 space-y-4">
            <h3 className="text-white font-headline font-bold text-base uppercase pb-2 border-b border-outline-variant/10">CAMP SCHEDULE</h3>
            <div className="space-y-3">
              {campData.schedule.map((item, idx) => (
                <div key={idx} className="bg-surface-container-high/40 p-4 rounded-sm border border-outline-variant/5 space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const s = [...campData.schedule];
                        s[idx] = { ...s[idx], title: e.target.value };
                        setCampData({ ...campData, schedule: s });
                      }}
                      className="bg-transparent text-white font-bold text-xs uppercase border-b border-outline-variant/20 focus:outline-none focus:border-primary w-full"
                      placeholder="Session title"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const s = [...campData.schedule];
                        s.splice(idx, 1);
                        setCampData({ ...campData, schedule: s });
                      }}
                      className="text-error hover:text-white text-xs p-1 cursor-pointer flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => {
                        const s = [...campData.schedule];
                        s[idx] = { ...s[idx], date: e.target.value };
                        setCampData({ ...campData, schedule: s });
                      }}
                      className="bg-transparent text-white/50 text-[10px] border-b border-outline-variant/10 focus:outline-none focus:border-primary flex-1"
                      placeholder="e.g. Every Tuesday"
                    />
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => {
                        const s = [...campData.schedule];
                        s[idx] = { ...s[idx], time: e.target.value };
                        setCampData({ ...campData, schedule: s });
                      }}
                      className="bg-transparent text-white/50 text-[10px] border-b border-outline-variant/10 focus:outline-none focus:border-primary flex-1"
                      placeholder="e.g. 6:00 PM - 8:00 PM"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const s = [...campData.schedule, { title: "New Session", date: "Every Tuesday", time: "6:00 PM" }];
                  setCampData({ ...campData, schedule: s });
                }}
                className="w-full bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright py-2 rounded-sm text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                + ADD SCHEDULE ROW
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 space-y-4">
            <h3 className="text-white font-headline font-bold text-base uppercase pb-2 border-b border-outline-variant/10">ANNOUNCEMENTS & UPDATES</h3>
            <div className="space-y-3">
              {campData.announcements.map((ann, idx) => (
                <div key={idx} className="bg-surface-container-high/40 p-4 rounded-sm border border-outline-variant/5 flex justify-between items-start gap-4">
                  <div className="flex-grow space-y-1">
                    <input
                      type="text"
                      value={ann.date}
                      onChange={(e) => {
                        const a = [...campData.announcements];
                        a[idx].date = e.target.value;
                        setCampData({ ...campData, announcements: a });
                      }}
                      className="bg-transparent text-primary font-bold text-[10px] border-none focus:outline-none w-full uppercase"
                    />
                    <input
                      type="text"
                      value={ann.text}
                      onChange={(e) => {
                        const a = [...campData.announcements];
                        a[idx].text = e.target.value;
                        setCampData({ ...campData, announcements: a });
                      }}
                      className="bg-transparent text-white/80 text-xs border-none focus:outline-none w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const a = [...campData.announcements];
                      a.splice(idx, 1);
                      setCampData({ ...campData, announcements: a });
                    }}
                    className="text-error hover:text-white text-xs p-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const a = [...campData.announcements, { date: "Today", text: "New Alert Description" }];
                  setCampData({ ...campData, announcements: a });
                }}
                className="w-full bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright py-2 rounded-sm text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                + ADD ANNOUNCEMENT ALERT
              </button>
            </div>
          </div>
        </div>

        {/* Part 5: Gallery Images */}
        <div className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 space-y-6">
          <h3 className="text-white font-headline font-bold text-base uppercase pb-2 border-b border-outline-variant/10">CAMP GALLERY IMAGES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {campData.images.map((img, idx) => (
              <div key={idx} className="aspect-square relative overflow-hidden rounded-sm bg-surface-container-high group border border-outline-variant/5">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const imgs = [...campData.images];
                    imgs.splice(idx, 1);
                    setCampData({ ...campData, images: imgs });
                  }}
                  className="absolute inset-0 bg-error/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-headline font-bold text-xs uppercase tracking-wider text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
            <label className="aspect-square border border-dashed border-outline-variant/40 hover:border-primary/60 cursor-pointer rounded-sm flex flex-col items-center justify-center text-white/50 hover:text-white transition-colors bg-surface-container-high/20">
              <span className="material-symbols-outlined text-3xl mb-2">upload</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">UPLOAD FILE</span>
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "gallery")} className="hidden" />
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-10 py-4 rounded-sm text-sm tracking-widest uppercase hover:opacity-95 transition-opacity cursor-pointer"
          >
            {saving ? "SAVING CAMP DETAILS..." : "SAVE CONFIGURATION"}
          </button>
        </div>
      </form>

      {/* Media Drawer */}
      <MediaDrawer isOpen={mediaDrawerOpen} onClose={() => setMediaDrawerOpen(false)} />
    </div>
  );
}
