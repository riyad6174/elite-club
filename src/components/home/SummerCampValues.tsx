"use client";

import { Users2, Target, Globe, Star } from "lucide-react";

const values = [
  {
    Icon: Users2,
    title: "TEAMWORK",
    desc: "Children learn to work together, support each other, and achieve goals as a unit — skills that last a lifetime.",
  },
  {
    Icon: Target,
    title: "DISCIPLINE",
    desc: "Structured sessions every Tuesday and Thursday build consistency, focus, and a winning mindset.",
  },
  {
    Icon: Globe,
    title: "INCLUSION",
    desc: "Kids from all backgrounds play side by side, building friendships and celebrating diversity.",
  },
  {
    Icon: Star,
    title: "JOY OF SPORT",
    desc: "Every game is filled with laughter, encouragement, and the pure joy of playing the beautiful game.",
  },
];

export default function SummerCampValues() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {values.map(({ Icon, title, desc }, index) => (
        <div
          key={index}
          className="bg-surface-container-low p-8 border border-outline-variant/10 hover:border-primary/30 transition-colors group"
        >
          <div className="mb-5 w-12 h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors rounded-sm">
            <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="text-white font-headline font-black text-xl uppercase tracking-tighter mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-on-surface-variant text-sm font-light leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
