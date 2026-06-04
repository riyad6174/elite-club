"use client";

import { useEffect, useState, useRef } from "react";

interface MediaItem {
  _id: string;
  url: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: "" as "success" | "error" | "", text: "" });
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch {
      showBanner("error", "Failed to load media library.");
    } finally {
      setLoading(false);
    }
  };

  const showBanner = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    let uploaded = 0;
    let failed = 0;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        if (!res.ok) throw new Error();
        uploaded++;
      } catch {
        failed++;
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (failed === 0) {
      showBanner("success", `${uploaded} file${uploaded !== 1 ? "s" : ""} uploaded successfully.`);
    } else {
      showBanner("error", `${uploaded} uploaded, ${failed} failed.`);
    }
    fetchMedia();
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.filename}"?\n\nThis will permanently remove it from storage and cannot be undone.`)) return;

    setDeletingId(item._id);
    try {
      const res = await fetch(`/api/admin/media/${item._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showBanner("success", `"${item.filename}" deleted.`);
      setMedia((prev) => prev.filter((m) => m._id !== item._id));
      if (lightbox?._id === item._id) setLightbox(null);
    } catch {
      showBanner("error", "Failed to delete file. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
    } catch {
      const t = document.createElement("textarea");
      t.value = item.url;
      t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = media.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  const isImage = (type: string) => type.startsWith("image/");

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-headline font-black text-2xl uppercase">MEDIA LIBRARY</h2>
          <p className="text-on-surface-variant text-xs mt-1">
            {media.length} file{media.length !== 1 ? "s" : ""} · Upload images to reference in stories and pages.
          </p>
        </div>

        <label className={`flex items-center gap-2 bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase cursor-pointer transition-opacity ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          <span className="material-symbols-outlined text-sm">upload</span>
          {uploading ? "UPLOADING..." : "UPLOAD FILES"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Drop Zone hint */}
      <label
        className="block border-2 border-dashed border-outline-variant/20 hover:border-primary/40 rounded-sm p-8 text-center cursor-pointer transition-colors group"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
      >
        <span className="material-symbols-outlined text-3xl text-white/20 group-hover:text-primary/60 transition-colors block mb-2">cloud_upload</span>
        <p className="text-white/30 text-xs font-bold uppercase tracking-wider group-hover:text-white/50 transition-colors">
          Drag & drop files here, or click Upload Files above
        </p>
        <p className="text-white/20 text-[10px] mt-1 tracking-wider">
          Please upload images under 800 KB for optimal performance
        </p>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
        />
      </label>

      {/* Search */}
      {media.length > 0 && (
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename..."
            className="w-full bg-surface-container-high/40 border-b border-outline-variant/20 text-white pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all rounded-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-white/40 font-headline uppercase tracking-widest text-xs">
          LOADING MEDIA LIBRARY...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border border-outline-variant/10 rounded-sm bg-surface-container/20">
          <span className="material-symbols-outlined text-5xl text-white/15 block mb-3">perm_media</span>
          <p className="text-white/30 font-headline font-bold text-sm uppercase tracking-widest">
            {search ? "NO FILES MATCH YOUR SEARCH" : "NO MEDIA UPLOADED YET"}
          </p>
          <p className="text-white/20 text-xs mt-2">
            {search ? "Try a different search term." : "Upload images using the button above."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="group bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/30 rounded-sm overflow-hidden transition-all relative"
            >
              {/* Thumbnail */}
              <div
                className="aspect-square bg-surface-container-high cursor-pointer overflow-hidden"
                onClick={() => setLightbox(item)}
              >
                {isImage(item.contentType) ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white/20">video_file</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-white text-2xl">zoom_in</span>
                </div>
              </div>

              {/* Info + actions */}
              <div className="p-3 space-y-2">
                <p className="text-white text-[10px] font-bold truncate" title={item.filename}>
                  {item.filename}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[9px] uppercase tracking-wider">
                    {formatSize(item.size)}
                  </span>
                  <span className="text-white/25 text-[9px] uppercase tracking-wider">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-1.5 pt-1">
                  {/* Copy URL */}
                  <button
                    onClick={() => handleCopy(item)}
                    title="Copy URL"
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                      copiedId === item._id
                        ? "bg-tertiary/20 border-tertiary/40 text-tertiary"
                        : "border-outline-variant/20 text-white/60 hover:text-white hover:border-outline-variant/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs leading-none">
                      {copiedId === item._id ? "check" : "link"}
                    </span>
                    {copiedId === item._id ? "COPIED" : "COPY"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item._id}
                    title="Delete file"
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-sm border border-error/20 text-error hover:bg-error/10 hover:border-error/40 text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-all disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined text-xs leading-none">
                      {deletingId === item._id ? "hourglass_empty" : "delete"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="max-w-4xl w-full bg-surface-container border border-outline-variant/15 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{lightbox.filename}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">
                  {formatSize(lightbox.size)} · {lightbox.contentType} · {new Date(lightbox.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={() => handleCopy(lightbox)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                    copiedId === lightbox._id
                      ? "bg-tertiary/20 border-tertiary/40 text-tertiary"
                      : "border-outline-variant/20 text-white/70 hover:text-white hover:border-white/30"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm leading-none">
                    {copiedId === lightbox._id ? "check" : "link"}
                  </span>
                  {copiedId === lightbox._id ? "COPIED!" : "COPY URL"}
                </button>
                <button
                  onClick={() => handleDelete(lightbox)}
                  disabled={deletingId === lightbox._id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border border-error/30 text-error hover:bg-error/10 cursor-pointer transition-all disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm leading-none">delete</span>
                  DELETE
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-white/50 hover:text-white cursor-pointer p-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="bg-surface-container-high/40 flex items-center justify-center max-h-[70vh] overflow-hidden">
              {isImage(lightbox.contentType) ? (
                <img
                  src={lightbox.url}
                  alt={lightbox.filename}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-6xl text-white/20 block mb-3">video_file</span>
                  <p className="text-white/40 text-sm">{lightbox.filename}</p>
                </div>
              )}
            </div>

            {/* URL bar */}
            <div className="px-5 py-3 border-t border-outline-variant/10 bg-surface-container-lowest/60">
              <p className="text-white/25 text-[9px] font-mono break-all">{lightbox.url}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
