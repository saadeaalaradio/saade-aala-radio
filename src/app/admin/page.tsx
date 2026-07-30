"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "stories" | "inbox" | "layout">("about");

  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(DEFAULT_ABOUT_CONFIG);
  const [saveMessage, setSaveMessage] = useState("");

  // Load Config
  useEffect(() => {
    const saved = localStorage.getItem("saade_aala_about_config");
    if (saved) {
      try { setAboutConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveAboutConfig = (updated: AboutConfig) => {
    setAboutConfig(updated);
    localStorage.setItem("saade_aala_about_config", JSON.stringify(updated));
    setSaveMessage("✨ About Us Timeline & Milestones Updated!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedMs = [...aboutConfig.milestones];
        updatedMs[index].imageUrl = reader.result as string;
        saveAboutConfig({ ...aboutConfig, milestones: updatedMs });
      };
      reader.readAsDataURL(file);
    }
  };

  const addMilestone = () => {
    const newMs: Milestone = {
      id: `m-${Date.now()}`,
      tag: "NEW MILESTONE",
      title: "New Achievement Title",
      description: "Describe what happened during this stage of the journey...",
      quote: "",
      imageUrl: "/logo-placeholder.png",
    };
    saveAboutConfig({ ...aboutConfig, milestones: [...aboutConfig.milestones, newMs] });
  };

  const deleteMilestone = (id: string) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return;
    const updated = aboutConfig.milestones.filter((m) => m.id !== id);
    saveAboutConfig({ ...aboutConfig, milestones: updated });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") setIsAuthenticated(true);
    else alert("Incorrect passcode!");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 bg-[#09090B] text-white">
        <form onSubmit={handleLogin} className="w-full max-w-[360px] bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 text-center shadow-2xl">
          <div className="text-2xl font-black text-[#FFC800]">SAADE AALA CMS</div>
          <p className="text-xs text-[#A1A1AA]">Enter admin passcode to manage website content.</p>
          <input
            type="password"
            placeholder="Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC800]"
          />
          <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl">
            UNLOCK DASHBOARD 🔐
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-4 py-8 bg-[#09090B] text-[#FAFAFA] font-sans">
      <main className="w-full max-w-[850px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-[#27272A]">
          <div>
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA CMS</span>
            <span className="text-xs text-[#A1A1AA] block">Master Control Panel</span>
          </div>
          <Link href="/about" className="text-xs font-semibold text-[#A1A1AA] border border-[#27272A] px-4 py-1.5 rounded-full bg-white/5 hover:border-[#FFC800]">
            ← VIEW ABOUT PAGE
          </Link>
        </header>

        {saveMessage && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center">
            {saveMessage}
          </div>
        )}

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          <button
            onClick={() => setActiveTab("about")}
            className={`py-2.5 text-xs font-black uppercase rounded-xl ${activeTab === "about" ? "bg-[#FFC800] text-black" : "text-[#A1A1AA]"}`}
          >
            📖 About Page & Timeline
          </button>
          <Link href="/" className="py-2.5 text-xs font-black uppercase text-[#A1A1AA] flex items-center justify-center">
            🏠 Back to Site
          </Link>
        </div>

        {/* MANAGING ABOUT PAGE */}
        {activeTab === "about" && (
          <div className="flex flex-col gap-6">
            
            {/* Header / Hero Content */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-3">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Page Header Settings</h2>
              <input
                type="text"
                value={aboutConfig.heroTitle}
                onChange={(e) => saveAboutConfig({ ...aboutConfig, heroTitle: e.target.value })}
                placeholder="Hero Headline"
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 text-xs text-white"
              />
              <textarea
                rows={2}
                value={aboutConfig.heroDescription}
                onChange={(e) => saveAboutConfig({ ...aboutConfig, heroDescription: e.target.value })}
                placeholder="Hero Subtitle"
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 text-xs text-white resize-none"
              />
            </div>

            {/* Milestones Editor */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">
                  Milestone Timeline ({aboutConfig.milestones.length})
                </h2>
                <button
                  onClick={addMilestone}
                  className="px-3.5 py-1.5 bg-[#FFC800] text-black text-xs font-extrabold rounded-xl"
                >
                  + ADD MILESTONE
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {aboutConfig.milestones.map((ms, idx) => (
                  <div key={ms.id} className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-[#FFC800]">MILESTONE #{idx + 1}</span>
                      <button
                        onClick={() => deleteMilestone(ms.id)}
                        className="text-xs text-red-400 font-bold border border-red-500/30 px-2 py-0.5 rounded-lg bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={ms.tag}
                        onChange={(e) => {
                          const updated = [...aboutConfig.milestones];
                          updated[idx].tag = e.target.value;
                          saveAboutConfig({ ...aboutConfig, milestones: updated });
                        }}
                        placeholder="Tag (e.g. EARLY DAYS)"
                        className="bg-[#141417] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={ms.title}
                        onChange={(e) => {
                          const updated = [...aboutConfig.milestones];
                          updated[idx].title = e.target.value;
                          saveAboutConfig({ ...aboutConfig, milestones: updated });
                        }}
                        placeholder="Milestone Title"
                        className="bg-[#141417] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <textarea
                      rows={3}
                      value={ms.description}
                      onChange={(e) => {
                        const updated = [...aboutConfig.milestones];
                        updated[idx].description = e.target.value;
                        saveAboutConfig({ ...aboutConfig, milestones: updated });
                      }}
                      placeholder="Milestone Description"
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2.5 text-xs text-white resize-none"
                    />

                    <input
                      type="text"
                      value={ms.quote || ""}
                      onChange={(e) => {
                        const updated = [...aboutConfig.milestones];
                        updated[idx].quote = e.target.value;
                        saveAboutConfig({ ...aboutConfig, milestones: updated });
                      }}
                      placeholder="Optional Quote (e.g. 'Quote here' — Author)"
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                    />

                    {/* 4:3 Image Upload */}
                    <div className="flex items-center gap-3 bg-[#141417] border border-[#27272A] p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-[#A1A1AA]">4:3 Photo:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, idx)}
                        className="text-[10px] text-[#A1A1AA] w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}