"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6">
      {/* Decorative neon elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[180px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-tertiary/5 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-sm relative border border-outline-variant/15 z-10">
        {/* Accent Blade */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary to-on-primary-container"></div>

        <div className="text-center mb-8 mt-4">
          <span className="text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] uppercase block mb-2">
            REGINA ELITES SPORTING CLUB
          </span>
          <h1 className="text-white font-headline font-black text-3xl uppercase tracking-tighter">
            ADMIN ACCESS
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-container/20 border-l-4 border-error text-white font-body text-xs rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/65 font-headline font-bold text-[10px] tracking-widest uppercase block">
              USERNAME
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/65 font-headline font-bold text-[10px] tracking-widest uppercase block">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-high/40 border-b border-outline-variant/30 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden group cursor-pointer mt-4"
          >
            <div className="w-full kinetic-gradient text-on-primary-fixed font-headline font-bold px-8 py-4 rounded-sm hover:opacity-90 transition-all text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>ENTER LOCKER ROOM</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
