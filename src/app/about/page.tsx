"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export interface Milestone {
  id: string;
  tag: string;
  title: string;
  description: string;
  quote?: string;
  imageUrl: string;
}

export interface AboutConfig {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  stat4Number: string;
  stat4Label: string;
  milestones: Milestone[];
}

const DEFAULT_ABOUT_CONFIG: AboutConfig = {
  heroTag: "OUR STORY & JOURNEY",
  heroTitle: "How Three Friends Turned Late-Night Banter Into A Cult Podcast",
  heroDescription: "No scripts, no filters, just pure Punjabi comedy. Here is the unfiltered story of how Saade Aala Radio evolved from a makeshift room into a full studio production.",
  stat1Number: "50+", stat1Label: "Episodes Released",
  stat2Number: "100K+", stat2Label: "Monthly Streams",
  stat3Number: "3", stat3Label: "Unfiltered Hosts",
  stat4Number: "100%", stat4Label: "Unscripted Comedy",
  milestones: [
    {
      id: "m-1",
      tag: "EARLY DAYS",
      title: "The Late-Night Idea",
      description: "Harshdeep, Sarabjeet, and Sandeep were sitting together after a long shoot day, telling outrageous personal stories. Sandeep suggested putting a condenser mic on the table and recording without a script.",
      quote: "Asli comedy script vich nahi, unscripted chaotic moments vich hundi aa. — Harshdeep",
      imageUrl: "/about/milestone1.png",
    },
    {
      id: "m-2",
      tag: "EPISODE #1",
      title: "Dropping Episode 1",
      description: "Armed with a single USB microphone and zero audio engineering experience, we recorded our first raw episode. Audio levels peaked, but the audience loved the relatable humor.",
      imageUrl: "/about/milestone2.png",
    },
    {
      id: "m-3",
      tag: "STUDIO UPGRADE",
      title: "Moving to a Professional Studio Setup",
      description: "As our YouTube subscriber base and Spotify streams grew, we moved into a dedicated acoustic studio with multi-camera 4K video recording.",
      imageUrl: "/about/milestone3.png",
    },
    {
      id: "m-4",
      tag: "TODAY & BEYOND",
      title: "Global Community & Interactive Platform",
      description: "Today, Saade Aala Radio is more than just a podcast. With interactive games, community Q&As, short stories, and live video episodes.",
      imageUrl: "/about/milestone4.png",
    },
  ],
};

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<AboutConfig>(DEFAULT_ABOUT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("saade_aala_about_config");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black flex flex-col justify-between">
      <div>
        
        {/* 💻 DESKTOP HEADER */}
        <header className="hidden md:block sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/90 border-b border-[#27272A] px-8 py-4">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 no-underline">
              <span className="text-2xl font-black tracking-tighter text-[#FFC800]">SAADE AALA</span>
              <span className="text-2xl font-light tracking-widest text-white">RADIO</span>
            </Link>

            <nav className="flex items-center gap-8 text-sm font-bold text-[#A1A1AA]">
              <Link href="/" className="hover:text-[#FFC800] transition-colors">Home</Link>
              <Link href="/about" className="text-[#FFC800]">About Us</Link>
              <Link href="/team" className="hover:text-[#FFC800] transition-colors">Meet The Team</Link>
              <Link href="/stories" className="hover:text-[#FFC800] transition-colors">Short Stories</Link>
              <Link href="/game" className="hover:text-[#FFC800] transition-colors text-[#FFC800]">🎮 MMA Arcade</Link>
            </nav>
          </div>
        </header>

        {/* 📱 MOBILE HEADER + HAMBURGER */}
        <header className="md:hidden sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/95 border-b border-[#27272A] px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 no-underline">
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA</span>
            <span className="text-lg font-light text-white">RADIO</span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-white bg-[#141417] border border-[#27272A] rounded-xl text-lg flex items-center justify-center active:scale-95"
            aria-label="Open Navigation Menu"
          >
            ☰
          </button>
        </header>

        {/* 📱 MOBILE SIDEBAR DRAWER */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative w-[280px] h-full bg-[#141417] border-l border-[#27272A] p-6 flex flex-col justify-between z-10 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-[#27272A] pb-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-[#FFC800]">SAADE AALA</span>
                    <span className="text-xs text-white">NAVIGATION</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold text-[#A1A1AA] bg-[#09090B] border border-[#27272A] px-2.5 py-1 rounded-lg">
                    ✕ CLOSE
                  </button>
                </div>

                <nav className="flex flex-col gap-4 text-sm font-bold text-white">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</Link>
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FFC800]">📖 About Us</Link>
                  <Link href="/team" onClick={() => setIsMobileMenuOpen(false)}>🎙️ Meet The Team</Link>
                  <Link href="/stories" onClick={() => setIsMobileMenuOpen(false)}>📖 Short Stories</Link>
                  <Link href="/game" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FFC800]">🎮 MMA Arcade Game</Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC HERO SECTION */}
        <section className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8 md:pt-14 text-center flex flex-col items-center gap-4">
          <span className="text-[10px] md:text-xs font-black text-[#FFC800] uppercase tracking-widest bg-[#FFC800]/10 border border-[#FFC800]/20 px-3 py-1 rounded-full">
            {config.heroTag}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {config.heroTitle}
          </h1>
          <p className="text-xs md:text-sm text-[#A1A1AA] max-w-[650px] leading-relaxed">
            {config.heroDescription}
          </p>
        </section>

        {/* DYNAMIC CHRONOLOGICAL TIMELINE WITH 4:3 PHOTO PLACEHOLDERS */}
        <section className="max-w-[900px] mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="relative border-l-2 border-[#27272A] ml-4 md:ml-32 pl-6 md:pl-10 flex flex-col gap-12 md:gap-16">
            
            {config.milestones.map((ms, idx) => (
              <div key={ms.id} className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FFC800] border-4 border-[#09090B] shadow-lg" />
                <span className="md:absolute md:-left-36 md:top-1.5 text-xs font-black text-[#FFC800] uppercase tracking-wider block mb-1 md:mb-0">
                  {ms.tag}
                </span>

                <div className="bg-[#141417] border border-[#27272A] p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col gap-4 shadow-xl">
                  {/* 4:3 IMAGE PLACEHOLDER FRAME */}
                  <div className="w-full aspect-[4/3] bg-[#09090B] border border-[#27272A] rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <img
                      src={ms.imageUrl}
                      alt={ms.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-3xl mb-1">📷</span>
                      <span className="text-xs font-black text-[#FFC800] uppercase">4:3 PHOTO PLACEHOLDER</span>
                      <span className="text-[10px] text-[#71717A] mt-0.5">Upload milestone photo in CMS</span>
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-black text-white">{ms.title}</h2>
                  <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed">{ms.description}</p>
                  
                  {ms.quote && (
                    <blockquote className="bg-[#09090B] border-l-2 border-[#FFC800] p-3 rounded-r-xl text-xs text-white italic mt-1">
                      "{ms.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* DYNAMIC STATS BAR */}
        <section className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">
          <div className="bg-gradient-to-r from-[#141417] via-[#27272A] to-[#141417] border border-[#FFC800]/30 p-6 md:p-8 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-2xl md:text-4xl font-black text-[#FFC800]">{config.stat1Number}</span>
              <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">{config.stat1Label}</span>
            </div>
            <div>
              <span className="text-2xl md:text-4xl font-black text-[#FFC800]">{config.stat2Number}</span>
              <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">{config.stat2Label}</span>
            </div>
            <div>
              <span className="text-2xl md:text-4xl font-black text-[#FFC800]">{config.stat3Number}</span>
              <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">{config.stat3Label}</span>
            </div>
            <div>
              <span className="text-2xl md:text-4xl font-black text-[#FFC800]">{config.stat4Number}</span>
              <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">{config.stat4Label}</span>
            </div>
          </div>
        </section>

      </div>

      {/* FINALIZED FOOTER */}
      <footer className="mt-12 bg-[#141417] border-t border-[#27272A] py-10 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-20 h-20 bg-[#09090B] border border-[#27272A] rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/logo-placeholder.png"
                alt="Saade Aala Radio 500x500 Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="text-[10px] font-extrabold text-[#FFC800] uppercase p-2 text-center">500x500 LOGO</span>
            </div>
            <div>
              <span className="text-base font-black text-[#FFC800]">SAADE AALA RADIO</span>
              <p className="text-xs text-[#A1A1AA] max-w-[280px] mt-1">
                Unfiltered Punjabi banter, comedy specials, and raw stories.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-xs font-semibold text-[#A1A1AA]">
            <span className="text-xs font-black text-white uppercase tracking-wider mb-1">NAVIGATION</span>
            <Link href="/" className="hover:text-[#FFC800]">Home</Link>
            <Link href="/about" className="hover:text-[#FFC800]">About Us</Link>
            <Link href="/team" className="hover:text-[#FFC800]">Meet The Team</Link>
            <Link href="/stories" className="hover:text-[#FFC800]">Short Stories</Link>
            <Link href="/game" className="hover:text-[#FFC800]">MMA Arcade Game</Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs text-[#A1A1AA]">
            <span className="text-xs font-black text-white uppercase tracking-wider mb-1">GET IN TOUCH</span>
            <p>saadeaalaradio@gmail.com</p>
            <div className="mt-4 pt-4 border-t border-[#27272A] w-full text-center md:text-right">
              <p className="text-[11px]">
                Built by <strong className="text-white">Creative Benchers</strong>
              </p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}