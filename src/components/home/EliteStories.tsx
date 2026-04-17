"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EliteStories = () => {
  const stories = [
    {
      category: "FACILITIES",
      title: "GROUNDBREAKING: THE NEW VANTAGE TRAINING CENTER",
      excerpt: "Regina Elites is proud to announce the next evolution in professional sports infrastructure: a 50,000 sq. ft. high-performance center arriving in 2025.",
      date: "OCT 18, 2024",
      author: "DIANA STERLING",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTDu-MftyQ0Qyrl0M8aXZZkVrZ01vCj-B_yOBSQU-FMS-ouBzoTUycRL_Mr8tAMOsQK7rY5bRNtzH_9S01e8Vq9jhTsQLi3RWGLDEiM1PEfwiKtOv8ijOSrwZ58Q53yBWSqAEb_HUMTjBkMWf-Jisn7iNX_TXvhe4z9x1HidxtX46Bxq9xa8Isat7ugnFHkWobStXwfQPvzuDdfG3sTVCpgc-tWO5-G0LTGx867DrUmD83t0xbM9cpFrevDftfnR_VCDy2jTUUOsBI",
    },
    {
      category: "ACHIEVEMENT",
      title: "THREE-PEAT: SOCCER SQUAD SECURES HISTORIC TITLE",
      excerpt: "The Regina Elites Soccer Squad has claimed the grand finale title for the third consecutive year after a thrilling 3-2 comeback victory at the National Arena.",
      date: "OCT 12, 2024",
      author: "MARCUS DRAKE",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYizznuzIz_q_Kj5yijh22AGgnuCzY_p7WfRqeDbtSZaxwAUvNWEOrZkbT0AfVR2oebe8XFxwmH543vACz9eEJsJ99kAdnqttlqrF_EKjyZiTO8EXHrC2-cis69CtRZtX7BimOCxvZJFJy2TWqAB8i12wnjtGbnfhM--54Wg1Jcy2Cc4poOOCheUODGQGrynbusHNDVIpINFt_KQ-yTL1kuefzTAzb7q-9QCWYTjYylLH_XItXHFsZsK2VcTAbZKIZhSW95-kb2Jp9",
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-surface-container">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
        >
          <div className="space-y-4">
            <span className="text-tertiary font-headline font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase block">THE GAZETTE</span>
            <h2 className="text-white font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">ELITE STORIES</h2>
          </div>
          <Link href="/stories" className="bg-surface-bright/20 text-white font-headline font-bold px-8 py-3 rounded-sm border border-outline-variant/10 hover:bg-surface-bright transition-all text-sm tracking-[0.2em] uppercase inline-block">
            EXPLORE ALL NEWS
          </Link>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {stories.map((story, index) => (
            <motion.article 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}
            >
              <div className="w-full lg:w-3/5 overflow-hidden clip-slant aspect-video lg:aspect-auto lg:h-[500px]">
                <img
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                  src={story.img}
                />
              </div>
              
              <div className="w-full lg:w-2/5 space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <span className="h-[2px] w-12 bg-primary"></span>
                  <span className="text-tertiary font-headline font-bold text-xs tracking-widest uppercase">
                    {story.category}
                  </span>
                </div>
                
                <h3 className="text-white font-headline font-black text-3xl md:text-5xl uppercase leading-none tracking-tighter group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                
                <p className="text-on-surface-variant text-lg font-light leading-relaxed">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase italic">WRITTEN BY</span>
                    <span className="text-white font-headline font-bold text-xs uppercase tracking-tight">{story.author}</span>
                  </div>
                  <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{story.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteStories;
