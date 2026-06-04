"use client";

import { useEffect, useState } from "react";

interface ImageItem {
  src: string;
  alt: string;
  title?: string;
}

interface Album {
  _id: string;
  name: string;
  description: string;
  category: "sports" | "events";
  order: number;
  images: ImageItem[];
}

export default function GalleryManagerPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "" as "success" | "error" | "", text: "" });

  // Editor Modal States
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [showNewAlbumModal, setShowNewAlbumModal] = useState(false);

  // Form Temp States
  const [newAlbum, setNewAlbum] = useState<{
    name: string;
    description: string;
    category: "sports" | "events";
  }>({ name: "", description: "", category: "sports" });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching albums:", err);
      showBanner("error", "Failed to fetch albums from database");
    } finally {
      setLoading(false);
    }
  };

  const showBanner = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAlbum),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create album");

      showBanner("success", "Album created successfully");
      setShowNewAlbumModal(false);
      setNewAlbum({ name: "", description: "", category: "sports" });
      fetchAlbums();
    } catch (err: any) {
      showBanner("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAlbum = async () => {
    if (!editingAlbum) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${editingAlbum._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAlbum),
      });
      if (!res.ok) throw new Error("Failed to update album");

      showBanner("success", "Album updated successfully");
      setEditingAlbum(null);
      fetchAlbums();
    } catch (err: any) {
      showBanner("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAlbum = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entire album? All images will be removed from this album.")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete album");
      showBanner("success", "Album deleted");
      fetchAlbums();
    } catch (err: any) {
      showBanner("error", err.message);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbum) return;

    const formData = new FormData();
    formData.append("file", file);

    setSaving(true);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      const uploadedUrl = data.url;
      const newImages = [...editingAlbum.images, { src: uploadedUrl, alt: file.name.split(".")[0], title: "" }];
      setEditingAlbum({ ...editingAlbum, images: newImages });
      showBanner("success", "Image uploaded. Click Save to persist changes.");
    } catch (err: any) {
      showBanner("error", err.message);
    } finally {
      setSaving(false);
      e.target.value = ""; // reset file input
    }
  };

  const handleReorderAlbums = async (direction: "up" | "down", index: number) => {
    const reordered = [...albums];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= albums.length) return;

    // Swap
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;

    // Map order fields
    const updated = reordered.map((alb, idx) => ({ id: alb._id, order: idx }));
    
    // Optimistic local update
    setAlbums(reordered.map((alb, idx) => ({ ...alb, order: idx })));

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ albums: updated }),
      });
      if (!res.ok) throw new Error("Reordering failed");
    } catch (err: any) {
      showBanner("error", err.message);
      fetchAlbums(); // reload on error
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING GALLERY CONTENT...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Banner alert messages */}
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

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-headline font-black text-2xl uppercase">ALBUMS LIST</h2>
          <p className="text-on-surface-variant text-xs mt-1">Manage photo collections categorized under Sports or Events.</p>
        </div>
        <button
          onClick={() => setShowNewAlbumModal(true)}
          className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer"
        >
          + NEW ALBUM
        </button>
      </div>

      <div className="space-y-4">
        {albums.length === 0 ? (
          <div className="glass-panel p-12 text-center text-white/40 text-sm">
            No albums found in database. Click &apos;New Album&apos; to create one.
          </div>
        ) : (
          albums.map((album, idx) => (
            <div
              key={album._id}
              className="bg-surface-container-low p-6 rounded-sm border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden group"
            >
              {/* Left Accent turf blade */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-tertiary"></div>

              <div className="pl-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-headline font-bold text-lg uppercase tracking-tight">
                    {album.name}
                  </span>
                  <span className="text-[10px] bg-surface-container-highest px-2 py-0.5 rounded-full text-white/70 uppercase font-bold tracking-widest">
                    {album.category}
                  </span>
                </div>
                <p className="text-on-surface-variant text-xs max-w-2xl font-light line-clamp-1">{album.description}</p>
                <span className="text-white/45 text-[10px] uppercase tracking-wider block">
                  {album.images.length} Image(s) inside
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Reordering buttons */}
                <button
                  disabled={idx === 0}
                  onClick={() => handleReorderAlbums("up", idx)}
                  className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-1.5 bg-surface-container-high/40 rounded-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                </button>
                <button
                  disabled={idx === albums.length - 1}
                  onClick={() => handleReorderAlbums("down", idx)}
                  className="text-white/50 hover:text-white disabled:opacity-20 transition-opacity p-1.5 bg-surface-container-high/40 rounded-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </button>

                <button
                  onClick={() => setEditingAlbum(album)}
                  className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  EDIT PHOTOS
                </button>
                <button
                  onClick={() => handleDeleteAlbum(album._id)}
                  className="text-error hover:bg-error/10 border border-error/20 hover:border-error/40 font-headline font-bold px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDITING GALLERY ALBUM */}
      {/* ========================================================================= */}
      {editingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-surface-container p-8 rounded-sm border border-outline-variant/15 relative my-8">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary to-on-primary-container"></div>
            
            <div className="flex justify-between items-start mb-8 mt-2 pb-4 border-b border-outline-variant/10">
              <div>
                <h3 className="text-white font-headline font-black text-xl uppercase">EDITING ALBUM: {editingAlbum.name}</h3>
                <p className="text-on-surface-variant text-xs font-light">Upload images, set descriptions, and adjust photo ordering.</p>
              </div>
              <button
                onClick={() => setEditingAlbum(null)}
                className="text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">ALBUM NAME</label>
                  <input
                    type="text"
                    value={editingAlbum.name}
                    onChange={(e) => setEditingAlbum({ ...editingAlbum, name: e.target.value })}
                    className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">CATEGORY</label>
                  <select
                    value={editingAlbum.category}
                    onChange={(e) => setEditingAlbum({ ...editingAlbum, category: e.target.value as "sports" | "events" })}
                    className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                  >
                    <option value="sports">Sports</option>
                    <option value="events">Events</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-full">
                  <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">DESCRIPTION</label>
                  <input
                    type="text"
                    value={editingAlbum.description}
                    onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })}
                    className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                  />
                </div>
              </div>

              {/* Photos management */}
              <div className="space-y-4">
                <h4 className="text-white font-headline font-bold text-sm uppercase">PHOTOS</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {editingAlbum.images.map((img, idx) => (
                    <div key={idx} className="bg-surface-container-high border border-outline-variant/10 p-2 rounded-sm space-y-2 group relative">
                      <div className="aspect-square relative overflow-hidden bg-background">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="space-y-1">
                        <input
                          type="text"
                          placeholder="Alt description"
                          value={img.alt}
                          onChange={(e) => {
                            const newImages = [...editingAlbum.images];
                            newImages[idx].alt = e.target.value;
                            setEditingAlbum({ ...editingAlbum, images: newImages });
                          }}
                          className="w-full bg-surface-container/60 border-b border-outline-variant/10 text-white text-[10px] px-1 py-1 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="flex justify-between items-center gap-1">
                        <div className="flex gap-0.5">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              const newImages = [...editingAlbum.images];
                              const temp = newImages[idx];
                              newImages[idx] = newImages[idx - 1];
                              newImages[idx - 1] = temp;
                              setEditingAlbum({ ...editingAlbum, images: newImages });
                            }}
                            className="text-white/60 hover:text-white disabled:opacity-20 text-[10px] bg-background px-1 py-0.5 rounded-sm cursor-pointer"
                          >
                            ◀
                          </button>
                          <button
                            disabled={idx === editingAlbum.images.length - 1}
                            onClick={() => {
                              const newImages = [...editingAlbum.images];
                              const temp = newImages[idx];
                              newImages[idx] = newImages[idx + 1];
                              newImages[idx + 1] = temp;
                              setEditingAlbum({ ...editingAlbum, images: newImages });
                            }}
                            className="text-white/60 hover:text-white disabled:opacity-20 text-[10px] bg-background px-1 py-0.5 rounded-sm cursor-pointer"
                          >
                            ▶
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            const newImages = [...editingAlbum.images];
                            newImages.splice(idx, 1);
                            setEditingAlbum({ ...editingAlbum, images: newImages });
                          }}
                          className="text-error hover:text-white text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add photo card */}
                  <label className="aspect-square border border-dashed border-outline-variant/40 hover:border-primary/60 cursor-pointer rounded-sm flex flex-col items-center justify-center text-white/50 hover:text-white transition-colors bg-surface-container-high/25">
                    <span className="material-symbols-outlined text-2xl mb-1">add_photo_alternate</span>
                    <span className="text-[9px] font-bold tracking-widest uppercase">ADD IMAGE</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10 flex justify-end gap-3">
                <button
                  onClick={() => setEditingAlbum(null)}
                  className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleUpdateAlbum}
                  disabled={saving}
                  className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-6 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer"
                >
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW ALBUM */}
      {/* ========================================================================= */}
      {showNewAlbumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md">
          <div className="w-full max-w-lg bg-surface-container p-8 rounded-sm border border-outline-variant/15 relative">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary to-on-primary-container"></div>

            <div className="flex justify-between items-start mb-6 mt-2">
              <h3 className="text-white font-headline font-black text-xl uppercase">CREATE NEW ALBUM</h3>
              <button
                onClick={() => setShowNewAlbumModal(false)}
                className="text-white/60 hover:text-white font-bold text-xs uppercase cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAlbum} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">ALBUM NAME</label>
                <input
                  type="text"
                  required
                  value={newAlbum.name}
                  onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
                  className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">CATEGORY</label>
                <select
                  value={newAlbum.category}
                  onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value as "sports" | "events" })}
                  className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                >
                  <option value="sports">Sports</option>
                  <option value="events">Events</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white/60 font-headline font-bold text-[9px] tracking-widest uppercase block">DESCRIPTION</label>
                <input
                  type="text"
                  value={newAlbum.description}
                  onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                  className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
                  placeholder="Short summary of album"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewAlbumModal(false)}
                  className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer"
                >
                  {saving ? "CREATING..." : "CREATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
