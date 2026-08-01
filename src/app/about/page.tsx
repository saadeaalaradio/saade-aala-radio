"use client";

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
  heroDescription:
    "No scripts, no filters, just pure Punjabi comedy. Here is the unfiltered story of how Saade Aala Radio evolved from a makeshift room into a full studio production.",
  stat1Number: "50+",
  stat1Label: "Episodes Released",
  stat2Number: "100K+",
  stat2Label: "Monthly Streams",
  stat3Number: "3",
  stat3Label: "Unfiltered Hosts",
  stat4Number: "100%",
  stat4Label: "Unscripted Comedy",
  milestones: [
    {
      id: "m-1",
      tag: "EARLY DAYS",
      title: "The Late-Night Idea",
      description:
        "Harshdeep, Sarabjeet, and Sandeep were sitting together after a long shoot day, telling outrageous personal stories. Sandeep suggested putting a condenser mic on the table and recording without a script.",
      quote:
        "Asli comedy script vich nahi, unscripted chaotic moments vich hundi aa. — Harshdeep",
      imageUrl: "/about/milestone1.png",
    },
    {
      id: "m-2",
      tag: "EPISODE #1",
      title: "Dropping Episode 1",
      description:
        "Armed with a single USB microphone and zero audio engineering experience, we recorded our first raw episode. Audio levels peaked, but the audience loved the relatable humor.",
      imageUrl: "/about/milestone2.png",
    },
    {
      id: "m-3",
      tag: "STUDIO UPGRADE",
      title: "Moving to a Professional Studio Setup",
      description:
        "As our YouTube subscriber base and Spotify streams grew, we moved into a dedicated acoustic studio with multi-camera 4K video recording.",
      imageUrl: "/about/milestone3.png",
    },
    {
      id: "m-4",
      tag: "TODAY & BEYOND",
      title: "Global Community & Interactive Platform",
      description:
        "Today, Saade Aala Radio is more than just a podcast. With interactive games, community Q&As, short stories, and live video episodes.",
      imageUrl: "/about/milestone4.png",
    },
  ],
};

export default function AboutPage() {
  const [config, setConfig] = useState<AboutConfig>(DEFAULT_ABOUT_CONFIG);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_about_config");
      if (saved) {
        try {
          setConfig(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse About configuration", e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
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
          {config.milestones.map((ms) => (
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
                    <span className="text-xs font-black text-[#FFC800] uppercase">
                      4:3 PHOTO PLACEHOLDER
                    </span>
                    <span className="text-[10px] text-[#71717A] mt-0.5">
                      Upload milestone photo in CMS
                    </span>
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-black text-white">
                  {ms.title}
                </h2>
                <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed">
                  {ms.description}
                </p>

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
            <span className="text-2xl md:text-4xl font-black text-[#FFC800]">
              {config.stat1Number}
            </span>
            <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">
              {config.stat1Label}
            </span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-[#FFC800]">
              {config.stat2Number}
            </span>
            <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">
              {config.stat2Label}
            </span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-[#FFC800]">
              {config.stat3Number}
            </span>
            <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">
              {config.stat3Label}
            </span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-[#FFC800]">
              {config.stat4Number}
            </span>
            <span className="text-[10px] md:text-xs text-[#A1A1AA] font-bold block mt-1 uppercase">
              {config.stat4Label}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}