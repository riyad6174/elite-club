"use client";

import { useEffect, useState, useCallback } from "react";

interface MediaItem {
  _id: string;
  url: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

interface MediaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertUrl?: (url: string) => void;
}

export default function MediaDrawer({ isOpen, onClose, onInsertUrl }: MediaDrawerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: "" as "success" | "error" | "", text: "" });

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Failed to fetch media");
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching media:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchMedia();
    }
  }, [isOpen, fetchMedia]);

  const showBanner = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      showBanner("success", "Media uploaded successfully");
      fetchMedia();
    } catch (err: any) {
      showBanner("error", err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCopyUrl = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item._id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for non-HTTPS environments
      const textarea = document.createElement("textarea");
      textarea.value = item.url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(item._id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInsert = (item: MediaItem) => {
    if (onInsertUrl) {
      onInsertUrl(item.url);
    }
    handleCopyUrl(item);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.filename}"? This will permanently remove it from storage.`)) return;
    setDeletingId(item._id);
    try {
      const res = await fetch(`/api/admin/media/${item._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showBanner("success", "File deleted.");
      setMedia((prev) => prev.filter((m) => m._id !== item._id));
    } catch {
      showBanner("error", "Failed to delete file.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-surface-container border-l border-outline-variant/15 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/10 flex-shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-headline font-black text-lg uppercase tracking-tight">
                MEDIA LIBRARY
              </h3>
              <p className="text-on-surface-variant text-xs font-light mt-1">
                Upload images and copy URLs for use in the rich text editor.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest cursor-pointer p-1"
            >
              ✕
            </button>
          </div>

          {/* Upload area */}
          <label className="flex items-center justify-center gap-2 border border-dashed border-outline-variant/40 hover:border-primary/60 rounded-sm p-4 cursor-pointer transition-colors bg-surface-container-high/25 group">
            <span className="material-symbols-outlined text-lg text-white/50 group-hover:text-white transition-colors">
              cloud_upload
            </span>
            <span className="text-xs text-white/50 group-hover:text-white font-bold uppercase tracking-wider transition-colors">
              {uploading ? "UPLOADING..." : "UPLOAD NEW IMAGE"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="text-white/30 text-[10px] mt-2 tracking-wider uppercase text-center">
            💡 Please upload images under 800 KB for optimal performance
          </p>
        </div>

        {/* Banner */}
        {message.text && (
          <div
            className={`mx-6 mt-3 p-3 border-l-4 rounded-sm text-xs font-semibold ${
              message.type === "success"
                ? "bg-tertiary-container/30 border-tertiary text-white"
                : "bg-error-container/30 border-error text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {loading ? (
            <div className="text-center text-white/40 text-xs font-headline uppercase tracking-widest py-12">
              LOADING MEDIA...
            </div>
          ) : media.length === 0 ? (
            <div className="text-center text-white/30 text-xs py-12">
              No media uploaded yet. Use the upload button above to add images.
            </div>
          ) : (
            media.map((item) => (
              <div
                key={item._id}
                className="bg-surface-container-high/40 border border-outline-variant/10 rounded-sm p-3 flex gap-3 items-center group hover:border-primary/30 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-background">
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-white text-xs font-bold truncate">{item.filename}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider">
                    {formatFileSize(item.size)} · {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                  <p className="text-white/20 text-[9px] truncate font-mono">{item.url}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleInsert(item)}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border cursor-pointer transition-all ${
                      copiedId === item._id
                        ? "bg-tertiary/20 border-tertiary/40 text-tertiary"
                        : "border-primary/30 text-primary hover:bg-primary/10"
                    }`}
                  >
                    {copiedId === item._id ? "COPIED!" : "COPY URL"}
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item._id}
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border border-error/20 text-error hover:bg-error/10 cursor-pointer transition-all disabled:opacity-40"
                  >
                    {deletingId === item._id ? "..." : "DELETE"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
