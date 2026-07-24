"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";
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

interface Member {
  _id: string;
  name: string;
  img: string | null;
  resc_id: string | null;
  order: number;
}

export default function TeamManagerPage() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"directors" | "members">("directors");
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dirRes, memRes] = await Promise.all([
        fetch("/api/team/directors"),
        fetch("/api/team/members"),
      ]);
      const dirData = await dirRes.json();
      const memData = await memRes.json();
      setDirectors(Array.isArray(dirData) ? dirData : []);
      setMembers(Array.isArray(memData) ? memData : []);
    } catch (err) {
      console.error("Error fetching team data:", err);
      toast("error", "Failed to fetch team data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDirector = async (id: string) => {
    if (!confirm("Are you sure you want to delete this director?")) return;
    try {
      const res = await fetch(`/api/team/directors/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete director");
      toast("success", "Director deleted");
      fetchData();
    } catch (err: any) {
      toast("error", err.message);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`/api/team/members/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete member");
      toast("success", "Member deleted");
      fetchData();
    } catch (err: any) {
      toast("error", err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-white/50 font-headline uppercase tracking-widest text-xs">
        LOADING TEAM CONTENT...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-white font-headline font-black text-2xl uppercase">TEAM MANAGEMENT</h2>
          <p className="text-on-surface-variant text-xs mt-1">Manage board of directors and club members.</p>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex gap-4 border-b border-outline-variant/10">
        <button
          onClick={() => setActiveTab("directors")}
          className={`pb-4 px-2 font-headline font-bold text-sm tracking-[0.2em] uppercase relative transition-colors cursor-pointer ${
            activeTab === "directors" ? "text-primary" : "text-white/50 hover:text-white"
          }`}
        >
          DIRECTORS ({directors.length})
          {activeTab === "directors" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`pb-4 px-2 font-headline font-bold text-sm tracking-[0.2em] uppercase relative transition-colors cursor-pointer ${
            activeTab === "members" ? "text-primary" : "text-white/50 hover:text-white"
          }`}
        >
          MEMBERS ({members.length})
          {activeTab === "members" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></div>
          )}
        </button>
      </div>

      {/* Directors Tab */}
      {activeTab === "directors" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant text-xs">Board of Directors displayed on the teams page.</p>
            <Link
              href="/admin/dashboard/team/directors/create"
              className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2"
            >
              + NEW DIRECTOR
            </Link>
          </div>

          {directors.length === 0 ? (
            <div className="glass-panel p-12 text-center text-white/40 text-sm">
              No directors found. Add a new director to populate the board.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {directors.map((director) => (
                <div
                  key={director._id}
                  className="bg-surface-container p-6 rounded-sm border border-outline-variant/10 flex gap-4 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-tertiary"></div>

                  <div className="w-20 h-24 overflow-hidden flex-shrink-0 bg-surface-container-high">
                    {director.img ? (
                      <img
                        src={director.img}
                        alt={director.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-headline font-bold text-sm uppercase tracking-tight truncate">
                      {director.name}
                    </h3>
                    <p className="text-tertiary text-[10px] font-bold tracking-widest uppercase mt-0.5">
                      {director.role}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-white/30 text-[10px] font-bold tracking-wider uppercase">
                      {director.resc_id && <span>ID: {director.resc_id}</span>}
                      {director.jersey_name && <span>JERSEY: {director.jersey_name}</span>}
                      {director.jersey_no && <span>#{director.jersey_no}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Link
                      href={`/admin/dashboard/team/directors/${director._id}/edit`}
                      className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-3 py-1.5 rounded-sm text-[10px] tracking-wider uppercase text-center"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleDeleteDirector(director._id)}
                      className="text-error hover:bg-error/10 border border-error/20 font-headline font-bold px-3 py-1.5 rounded-sm text-[10px] tracking-wider uppercase cursor-pointer"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-on-surface-variant text-xs">Club members displayed on the teams page.</p>
            <Link
              href="/admin/dashboard/team/members/create"
              className="bg-gradient-to-r from-primary to-on-primary-container text-on-primary-fixed font-headline font-bold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2"
            >
              + NEW MEMBER
            </Link>
          </div>

          {members.length === 0 ? (
            <div className="glass-panel p-12 text-center text-white/40 text-sm">
              No members found. Add a new member to populate the roster.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-surface-container p-4 rounded-sm border border-outline-variant/10 flex gap-3 relative overflow-hidden"
                >
                  <div className="w-14 h-14 overflow-hidden flex-shrink-0 bg-surface-container-high">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-headline font-bold text-xs uppercase tracking-tight truncate">
                      {member.name}
                    </h3>
                    {member.resc_id && (
                      <p className="text-white/30 text-[10px] font-bold tracking-wider uppercase mt-1">
                        ID: {member.resc_id}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <Link
                      href={`/admin/dashboard/team/members/${member._id}/edit`}
                      className="bg-surface-bright/20 border border-outline-variant/15 text-white hover:bg-surface-bright font-headline font-bold px-2 py-1 rounded-sm text-[9px] tracking-wider uppercase text-center"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => handleDeleteMember(member._id)}
                      className="text-error hover:bg-error/10 border border-error/20 font-headline font-bold px-2 py-1 rounded-sm text-[9px] tracking-wider uppercase cursor-pointer"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
