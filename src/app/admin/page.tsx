"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export interface HomepageSection {
  id: "webplayer" | "banners" | "hosts_photo" | "social_media" | "mma_game" | "stories";
  title: string;
  enabled: boolean;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  journey: string;
  quote: string;
}

export interface FanQuestion {
  id: string;
  hostId: string;
  fanName: string;
  question: string;
  answer: string;
  timestamp: string;
  isApproved: boolean;
}

export interface StoryPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  thumbnailUrl: string;
  summary: string;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
  searchTags: string[];
}

export interface Milestone {
  id: string;
  tag: string;
  title: string;
  description: string;
  quote?: string;
  imageUrl: string;
}

export interface PageSEO {
  title: string;
  description: string;
}

export interface MasterSiteConfig {
  headerLogoUrl: string;
  footerLogoUrl: string;
  homepageSections: HomepageSection[];
  hosts: Record<string, HostProfile>;
  questions: FanQuestion[];
  stories: StoryPost[];
  milestones: Milestone[];
  pageSeo: {
    home: PageSEO;
    team: PageSEO;
    stories: PageSEO;
    about: PageSEO;
    game: PageSEO;
  };
}

const DEFAULT_CONFIG: MasterSiteConfig = {
  headerLogoUrl: "/logo-placeholder.png",
  footerLogoUrl: "/logo-placeholder.png",
  homepageSections: [
    { id: "webplayer", title: "1. Webplayer (YouTube + Spotify)", enabled: true },
    { id: "banners", title: "2. 16:9 Episode Banner Slides", enabled: true },
    { id: "hosts_photo", title: "3. Hosts Photo & Meet The Team", enabled: true },
    { id: "social_media", title: "4. Social Media Tab", enabled: true },
    { id: "mma_game", title: "5. MMA Arcade Game", enabled: true },
    { id: "stories", title: "6. Short Stories Tab", enabled: true },
  ],
  hosts: {
    harshdeep: {
      id: "harshdeep",
      name: "Harshdeep Singh",
      role: "Lead Anchor & Chaos Director",
      photoUrl: "/hosts/harshdeep.png",
      journey: "From running wild production sets to co-founding Saade Aala Radio...",
      quote: "Tension nahi leni, story poori sun ke jaani aa!",
    },
    sarabjeet: {
      id: "sarabjeet",
      name: "Sarabjeet Singh",
      role: "Co-Host & Comeback King",
      photoUrl: "/hosts/sarabjeet.png",
      journey: "Sarabjeet is the anchor of reality until he drops legendary one-liners...",
      quote: "Ehne gall shuru kiti si, khatam main karunga!",
    },
    sandeep: {
      id: "sandeep",
      name: "Sandeep Singh",
      role: "Co-Host & Cunning Strategist",
      photoUrl: "/hosts/sandeep.png",
      journey: "The quiet genius behind the craziest takes...",
      quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
    },
  },
  questions: [
    {
      id: "q-1",
      hostId: "harshdeep",
      fanName: "Aman_Mohali",
      question: "Harshdeep bhaji, next episode kadon aavega?",
      answer: "Agle Friday sharp 8 PM!",
      timestamp: "JUL 28, 2026",
      isApproved: true,
    },
  ],
  stories: [],
  milestones: [
    {
      id: "m-1",
      tag: "EARLY DAYS",
      title: "The Late-Night Idea",
      description: "Harshdeep, Sarabjeet, and Sandeep recorded on a single mic...",
      imageUrl: "/about/milestone1.png",
    },
  ],
  pageSeo: {
    home: { title: "Saade Aala Radio - Unfiltered Punjabi Podcast", description: "Raw comedy, wild stories, and unscripted banter." },
    team: { title: "Meet The Team - Saade Aala Radio", description: "Meet Harshdeep, Sarabjeet, and Sandeep." },
    stories: { title: "Short Stories & Blogs - Saade Aala Radio", description: "Unfiltered studio tales and behind the scenes stories." },
    about: { title: "About Us - Saade Aala Radio", description: "Our evolution from a makeshift room to a pro studio." },
    game: { title: "8-Bit MMA Arcade Game - Saade Aala Radio", description: "Play our retro arcade fighting game." },
  },
};

export default function MasterAdminCMS() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"layout" | "logos" | "team" | "about" | "stories" | "seo">("layout");

  const [config, setConfig] = useState<MasterSiteConfig>(DEFAULT_CONFIG);
  const [saveMessage, setSaveMessage] = useState("");

  // Rich Text Editor State
  const editorRef = useRef<HTMLDivElement>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("Harshdeep Singh");
  const [storySummary, setStorySummary] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [storySeoTitle, setStorySeoTitle] = useState("");
  const [storySeoDesc, setStorySeoDesc] = useState("");
  const [storySearchTags, setStorySearchTags] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig({
            ...DEFAULT_CONFIG,
            ...parsed,
            homepageSections: parsed.homepageSections || DEFAULT_CONFIG.homepageSections,
            hosts: parsed.hosts || DEFAULT_CONFIG.hosts,
            questions: parsed.questions || DEFAULT_CONFIG.questions,
            stories: parsed.stories || DEFAULT_CONFIG.stories,
            milestones: parsed.milestones || DEFAULT_CONFIG.milestones,
            pageSeo: { ...DEFAULT_CONFIG.pageSeo, ...(parsed.pageSeo || {}) },
          });
        } catch (e) {
          console.error("Error parsing CMS config", e);
        }
      }
    }
  }, []);

  const saveConfig = (updated: MasterSiteConfig, msg: string) => {
    setConfig(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("saade_aala_cms_config", JSON.stringify(updated));
    }
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passcode!");
    }
  };

  const formatText = (command: string, value: string | undefined = undefined) => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      if (editorRef.current) editorRef.current.focus();
    }
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    const contentHtml = editorRef.current?.innerHTML || "";
    if (!storyTitle || !contentHtml) return alert("Title and Story Content are required!");

    let updatedStories = [...(config.stories || [])];

    if (editingStoryId) {
      updatedStories = updatedStories.map((s) =>
        s.id === editingStoryId
          ? {
              ...s,
              title: storyTitle,
              author: storyAuthor,
              summary: storySummary,
              thumbnailUrl: thumbnailUrl || "/logo-placeholder.png",
              contentHtml,
              seoTitle: storySeoTitle || storyTitle,
              seoDescription: storySeoDesc || storySummary,
              searchTags: storySearchTags.split(",").map((t) => t.trim()).filter(Boolean),
            }
          : s
      );
    } else {
      const newPost: StoryPost = {
        id: `story-${Date.now()}`,
        title: storyTitle,
        author: storyAuthor,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase(),
        readTime: `${Math.max(1, Math.ceil(contentHtml.length / 400))} min read`,
        thumbnailUrl: thumbnailUrl || "/logo-placeholder.png",
        summary: storySummary || storyTitle,
        contentHtml,
        seoTitle: storySeoTitle || storyTitle,
        seoDescription: storySeoDesc || storySummary,
        searchTags: storySearchTags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      updatedStories.unshift(newPost);
    }

    saveConfig({ ...config, stories: updatedStories }, editingStoryId ? "✨ Story updated!" : "🚀 New story published!");
    
    setEditingStoryId(null);
    setStoryTitle("");
    setStorySummary("");
    setThumbnailUrl("");
    setStorySeoTitle("");
    setStorySeoDesc("");
    setStorySearchTags("");
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const clearStorage = () => {
    if (confirm("Reset CMS local storage to default settings?")) {
      localStorage.removeItem("saade_aala_cms_config");
      setConfig(DEFAULT_CONFIG);
      alert("Reset complete!");
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 bg-[#09090B] text-white">
        <form onSubmit={handleLogin} className="w-full max-w-[360px] bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 text-center shadow-2xl">
          <div className="text-2xl font-black text-[#FFC800]">SAADE AALA CMS</div>
          <p className="text-xs text-[#A1A1AA]">Master Admin Passcode Required</p>
          <input
            type="password"
            placeholder="Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC800]"
          />
          <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl">
            UNLOCK ALL CONTROLS 🔐
          </button>
        </form>
      </div>
    );
  }

  const homepageSections = config.homepageSections || DEFAULT_CONFIG.homepageSections;
  const hosts = config.hosts || DEFAULT_CONFIG.hosts;
  const questions = config.questions || DEFAULT_CONFIG.questions;
  const milestones = config.milestones || DEFAULT_CONFIG.milestones;
  const pageSeo = config.pageSeo || DEFAULT_CONFIG.pageSeo;

  return (
    <div className="flex justify-center min-h-screen px-4 py-8 bg-[#09090B] text-[#FAFAFA] font-sans">
      <main className="w-full max-w-[900px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-[#27272A]">
          <div>
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA MASTER CMS</span>
            <span className="text-xs text-[#A1A1AA] block">Full Website & SEO Management Engine</span>
          </div>
          <div className="flex gap-2">
            <button onClick={clearStorage} className="text-[10px] font-bold text-red-400 border border-red-500/30 px-3 py-1.5 rounded-full bg-red-500/10">
              Reset Config
            </button>
            <Link href="/" className="text-xs font-semibold text-[#A1A1AA] border border-[#27272A] px-4 py-1.5 rounded-full bg-white/5 hover:border-[#FFC800]">
              ← LIVE SITE
            </Link>
          </div>
        </header>

        {saveMessage && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center">
            {saveMessage}
          </div>
        )}

        {/* Master CMS Navigation Tabs */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          {[
            { id: "layout", label: "🏠 Homepage" },
            { id: "logos", label: "🎨 Logos" },
            { id: "team", label: "🎙️ Team & Q&A" },
            { id: "about", label: "📖 Timeline" },
            { id: "stories", label: "✍️ Stories Editor" },
            { id: "seo", label: "🔍 Page SEO" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 text-[10px] md:text-xs font-extrabold uppercase rounded-xl transition-all ${
                activeTab === tab.id ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: HOMEPAGE */}
        {activeTab === "layout" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Homepage Section Order & Visibility</h2>
            <div className="flex flex-col gap-3">
              {homepageSections.map((section, idx) => (
                <div key={section.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => {
                        const updated = [...homepageSections];
                        updated[idx].enabled = !updated[idx].enabled;
                        saveConfig({ ...config, homepageSections: updated }, "Homepage visibility saved!");
                      }}
                      className="w-4 h-4 accent-[#FFC800] cursor-pointer"
                    />
                    <span className={`text-xs font-bold ${section.enabled ? "text-white" : "text-[#52525B] line-through"}`}>
                      {section.title}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={idx === 0}
                      onClick={() => {
                        const updated = [...homepageSections];
                        const temp = updated[idx - 1];
                        updated[idx - 1] = updated[idx];
                        updated[idx] = temp;
                        saveConfig({ ...config, homepageSections: updated }, "Order updated!");
                      }}
                      className="px-2.5 py-1 bg-[#141417] border border-[#27272A] text-white text-xs font-bold rounded-lg disabled:opacity-30"
                    >
                      ▲ UP
                    </button>
                    <button
                      disabled={idx === homepageSections.length - 1}
                      onClick={() => {
                        const updated = [...homepageSections];
                        const temp = updated[idx + 1];
                        updated[idx + 1] = updated[idx];
                        updated[idx] = temp;
                        saveConfig({ ...config, homepageSections: updated }, "Order updated!");
                      }}
                      className="px-2.5 py-1 bg-[#141417] border border-[#27272A] text-white text-xs font-bold rounded-lg disabled:opacity-30"
                    >
                      ▼ DOWN
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: BRANDING LOGOS */}
        {activeTab === "logos" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-6">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Site Brand Logos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-white">Header Logo</span>
                <div className="h-20 bg-[#141417] border border-[#27272A] rounded-xl flex items-center justify-center p-2">
                  <img src={config.headerLogoUrl || "/logo-placeholder.png"} alt="Header Logo" className="max-h-full object-contain" onError={(e) => ((e.target as HTMLElement).style.display = "none")} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => saveConfig({ ...config, headerLogoUrl: reader.result as string }, "Header logo updated!");
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs text-[#A1A1AA]"
                />
              </div>

              <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-white">Footer Logo (500x500 PNG)</span>
                <div className="h-20 bg-[#141417] border border-[#27272A] rounded-xl flex items-center justify-center p-2">
                  <img src={config.footerLogoUrl || "/logo-placeholder.png"} alt="Footer Logo" className="max-h-full object-contain" onError={(e) => ((e.target as HTMLElement).style.display = "none")} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => saveConfig({ ...config, footerLogoUrl: reader.result as string }, "Footer logo updated!");
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs text-[#A1A1AA]"
                />
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: TEAM & FAN Q&A */}
        {activeTab === "team" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-6">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Host Profiles & Fan Q&A Inbox</h2>
            <div className="flex flex-col gap-4">
              {Object.keys(hosts).map((key) => {
                const host = hosts[key];
                return (
                  <div key={key} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                    <span className="text-xs font-black text-[#FFC800] uppercase">{host.name}</span>
                    <input
                      type="text"
                      value={host.role}
                      onChange={(e) => {
                        const updated = { ...hosts, [key]: { ...host, role: e.target.value } };
                        saveConfig({ ...config, hosts: updated }, "Host updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Role Title"
                    />
                    <input
                      type="text"
                      value={host.quote}
                      onChange={(e) => {
                        const updated = { ...hosts, [key]: { ...host, quote: e.target.value } };
                        saveConfig({ ...config, hosts: updated }, "Quote updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                      placeholder="Signature Quote"
                    />
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#27272A] flex flex-col gap-3">
              <h3 className="text-xs font-black text-white uppercase">Fan Question Approval Feed</h3>
              {questions.map((q) => (
                <div key={q.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#FFC800]">👤 {q.fanName}</span>
                  <p className="text-xs text-white">"{q.question}"</p>
                  <textarea
                    rows={2}
                    defaultValue={q.answer}
                    onBlur={(e) => {
                      const updated = questions.map((item) => (item.id === q.id ? { ...item, answer: e.target.value } : item));
                      saveConfig({ ...config, questions: updated }, "Reply saved!");
                    }}
                    placeholder="Host answer..."
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white resize-none"
                  />
                  <button
                    onClick={() => {
                      const updated = questions.map((item) => (item.id === q.id ? { ...item, isApproved: !item.isApproved } : item));
                      saveConfig({ ...config, questions: updated }, "Approval status toggled!");
                    }}
                    className={`py-1.5 rounded-xl text-xs font-bold ${q.isApproved ? "bg-green-500/20 text-green-400" : "bg-[#FFC800] text-black"}`}
                  >
                    {q.isApproved ? "✓ Approved (Click to Hide)" : "Approve & Publish ➔"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: ABOUT MILESTONES */}
        {activeTab === "about" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">About Us Timeline Milestones</h2>
              <button
                onClick={() => {
                  const newM: Milestone = {
                    id: `m-${Date.now()}`,
                    tag: "NEW MILESTONE",
                    title: "New Story Stop",
                    description: "Describe milestone...",
                    imageUrl: "/logo-placeholder.png",
                  };
                  saveConfig({ ...config, milestones: [...milestones, newM] }, "Milestone added!");
                }}
                className="px-3 py-1 bg-[#FFC800] text-black text-xs font-bold rounded-xl"
              >
                + Add Milestone
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {milestones.map((ms, idx) => (
                <div key={ms.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-[#FFC800]">STOP #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = milestones.filter((m) => m.id !== ms.id);
                        saveConfig({ ...config, milestones: updated }, "Milestone deleted!");
                      }}
                      className="text-[10px] text-red-400 font-bold"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    type="text"
                    value={ms.title}
                    onChange={(e) => {
                      const updated = [...milestones];
                      updated[idx].title = e.target.value;
                      saveConfig({ ...config, milestones: updated }, "Milestone updated!");
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    value={ms.description}
                    onChange={(e) => {
                      const updated = [...milestones];
                      updated[idx].description = e.target.value;
                      saveConfig({ ...config, milestones: updated }, "Milestone updated!");
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#A1A1AA]">4:3 Photo:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updated = [...milestones];
                            updated[idx].imageUrl = reader.result as string;
                            saveConfig({ ...config, milestones: updated }, "Photo saved!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-[10px] text-[#A1A1AA]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 5: STORIES EDITOR */}
        {activeTab === "stories" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-6">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Short Stories Rich Text Editor</h2>

            <form onSubmit={handleSaveStory} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Story Title"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FFC800] outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={storyAuthor}
                  onChange={(e) => setStoryAuthor(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Harshdeep Singh">Harshdeep Singh</option>
                  <option value="Sarabjeet Singh">Sarabjeet Singh</option>
                  <option value="Sandeep Singh">Sandeep Singh</option>
                </select>

                <input
                  type="text"
                  placeholder="Summary / Excerpt"
                  value={storySummary}
                  onChange={(e) => setStorySummary(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              {/* RICH TEXT TOOLBAR */}
              <div className="flex flex-col border border-[#27272A] rounded-2xl overflow-hidden bg-[#09090B]">
                <div className="flex flex-wrap gap-1 bg-[#141417] p-2 border-b border-[#27272A]">
                  <button type="button" onClick={() => formatText("bold")} className="px-2.5 py-1 bg-[#09090B] text-white text-xs font-black rounded hover:text-[#FFC800]">B</button>
                  <button type="button" onClick={() => formatText("italic")} className="px-2.5 py-1 bg-[#09090B] text-white text-xs italic rounded hover:text-[#FFC800]">I</button>
                  <button type="button" onClick={() => formatText("formatBlock", "<h2>")} className="px-2.5 py-1 bg-[#09090B] text-[#FFC800] text-xs font-black rounded">H2</button>
                  <button type="button" onClick={() => formatText("formatBlock", "<h3>")} className="px-2.5 py-1 bg-[#09090B] text-white text-xs font-bold rounded">H3</button>
                  <button type="button" onClick={() => formatText("insertUnorderedList")} className="px-2.5 py-1 bg-[#09090B] text-white text-xs rounded">• List</button>
                  <button type="button" onClick={() => formatText("removeFormat")} className="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs rounded">Clear</button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[220px] p-4 text-xs text-white focus:outline-none leading-relaxed [&_h2]:text-base [&_h2]:font-black [&_h2]:text-[#FFC800] [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-white"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Story SEO Meta Title"
                  value={storySeoTitle}
                  onChange={(e) => setStorySeoTitle(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Story SEO Meta Description"
                  value={storySeoDesc}
                  onChange={(e) => setStorySeoDesc(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Search Tags (comma separated)"
                  value={storySearchTags}
                  onChange={(e) => setStorySearchTags(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg">
                PUBLISH STORY 🚀
              </button>
            </form>
          </section>
        )}

        {/* TAB 6: GLOBAL PAGE SEO */}
        {activeTab === "seo" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Global Page SEO Meta Manager</h2>
            <div className="flex flex-col gap-4">
              {(["home", "team", "stories", "about", "game"] as const).map((pageKey) => (
                <div key={pageKey} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-xs font-black text-[#FFC800] uppercase">Route: /{pageKey === "home" ? "" : pageKey}</span>
                  <input
                    type="text"
                    value={pageSeo[pageKey]?.title || ""}
                    onChange={(e) => {
                      const updated = {
                        ...pageSeo,
                        [pageKey]: { ...pageSeo[pageKey], title: e.target.value },
                      };
                      saveConfig({ ...config, pageSeo: updated }, "Page SEO updated!");
                    }}
                    placeholder="Meta Title"
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={pageSeo[pageKey]?.description || ""}
                    onChange={(e) => {
                      const updated = {
                        ...pageSeo,
                        [pageKey]: { ...pageSeo[pageKey], description: e.target.value },
                      };
                      saveConfig({ ...config, pageSeo: updated }, "Page SEO updated!");
                    }}
                    placeholder="Meta Description"
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}