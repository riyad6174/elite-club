"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ToastProvider } from "@/components/admin/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      setAuthorized(true);
    } catch (err) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white font-headline text-lg tracking-widest uppercase">LOADING CMS DATABASE...</div>
      </div>
    );
  }

  if (!authorized) return null;

  const tabs = [
    { id: "gallery", label: "Gallery", href: "/admin/dashboard/gallery" },
    { id: "stories", label: "Stories", href: "/admin/dashboard/stories" },
    { id: "team", label: "Team", href: "/admin/dashboard/team" },
    { id: "camp", label: "Kids Camp", href: "/admin/dashboard/camp" },
    { id: "media", label: "Media Library", href: "/admin/dashboard/media" },
  ];

  return (
    <ToastProvider>
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Header bar */}
      <header className="border-b border-outline-variant/15 py-6 px-6 md:px-12 bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
          <div>
            <span className="text-tertiary font-headline font-bold tracking-widest text-[9px] uppercase block">RESC MANAGEMENT ENGINE</span>
            <span className="text-white font-headline font-black text-xl uppercase tracking-tighter">CMS PANEL</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open("/", "_blank")}
            className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW SITE</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-4 py-2 rounded-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main content wrapper */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Tab selection */}
        <div className="flex gap-4 border-b border-outline-variant/10 mb-12">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`pb-4 px-2 font-headline font-bold text-sm tracking-[0.2em] uppercase relative transition-colors ${
                  isActive ? "text-primary" : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Dynamic page content */}
        {children}
      </div>
    </div>
    </ToastProvider>
  );
}
