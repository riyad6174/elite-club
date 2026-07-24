"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Director {
  _id: string;
  name: string;
  role: string;
  img: string | null;
  resc_id: string | null;
  jersey_name: string;
  jersey_no: string;
  order: number;
}

export default function EditDirectorPage() {
  const router = useRouter();
  const params = useParams();
  const directorId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const [form, setForm] = useState<Director>({
    _id: "",
    name: "",
    role: "",
    img: null,
    resc_id: null,
    jersey_name: "",
    jersey_no: "",
    order: 0,
  });

  useEffect(() => {
    fetchDirector();
  }, [directorId]);

  const fetchDirector = async () => {
    try {
      const res = await fetch(`/api/team/directors/${directorId}`);
      if (!res.ok) throw new Error("Failed to fetch director");
      const data = await res.json();
      setForm(data);
    } catch (err) {
      console.error("Error fetching director:", err);
      toast("error", "Failed to load director. It may not exist.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setForm({ ...form, img: data.url });
      toast("success", "Image uploaded");
    } catch (err: any) {
      toast("error", err.message);
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/team/directors/${directorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update director");

      toast("success", "Director updated successfully!");
      setTimeout(() => router.push("/admin/dashboard/team"), 1000);
    } catch (err: any) {
      toast("error", err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING DIRECTOR...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb + Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/dashboard/team"
            className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            TEAM
          </Link>
          <span className="text-white/20 text-xs">/</span>
          <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">
            EDIT DIRECTOR
          </span>
        </div>
        <h2 className="text-white font-headline font-black text-2xl uppercase tracking-tight">
          EDIT DIRECTOR
        </h2>
        <p className="text-on-surface-variant text-xs mt-1 max-w-lg truncate">
          Editing: {form.name || "Untitled"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name + Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              FULL NAME *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. MOHAMMAD ZAKIRUL HASAN"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              ROLE / TITLE *
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value.toUpperCase() })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. FOUNDING LEGEND & DIRECTOR"
            />
          </div>
        </div>

        {/* RE SC ID + Jersey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              RESC ID
            </label>
            <input
              type="text"
              value={form.resc_id || ""}
              onChange={(e) => setForm({ ...form, resc_id: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. 2023-001"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              JERSEY NAME
            </label>
            <input
              type="text"
              value={form.jersey_name}
              onChange={(e) => setForm({ ...form, jersey_name: e.target.value.toUpperCase() })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. SAYEM"
            />
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              JERSEY NUMBER
            </label>
            <input
              type="text"
              value={form.jersey_no}
              onChange={(e) => setForm({ ...form, jersey_no: e.target.value })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        {/* Image + Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              PHOTO
            </label>
            <div className="flex items-center gap-4">
              {form.img && (
                <img
                  src={form.img}
                  alt="Preview"
                  className="w-16 h-20 object-cover rounded-sm border border-outline-variant/20"
                />
              )}
              <label className="bg-surface-bright/20 border border-outline-variant/15 hover:bg-surface-bright text-white text-[10px] font-bold px-4 py-2.5 rounded-sm cursor-pointer uppercase tracking-wider transition-colors">
                {form.img ? "CHANGE PHOTO" : "UPLOAD PHOTO"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {form.img && (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, img: null })}
                  className="text-error text-[10px] font-bold uppercase tracking-wider hover:underline cursor-pointer"
                >
                  REMOVE
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">
              DISPLAY ORDER
            </label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="0"
            />
            <p className="text-white/25 text-[10px] tracking-wider">
              Lower numbers appear first
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
          <Link
            href="/admin/dashboard/team"
            className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            ← BACK TO TEAM
          </Link>
          <div className="flex gap-3">
            <Link
              href="/admin/dashboard/team"
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
    </div>
  );
}
