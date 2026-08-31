"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// --- INTERFACES ---
export interface ShowcaseBannerItem {
  id: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface EpisodeBanner {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  altText: string;
  metaData: string;
  streamUrl: string;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  photoAltText: string;
  journey: string;
  quote: string;
  socials: SocialLink[];
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
  punchline: string;
  author: string;
  date: string;
  readTime: string;
  thumbnailUrl: string;
  thumbnailAltText: string;
  thumbnailMetaData: string;
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
  imageAltText: string;
  imageMetaData: string;
}

export interface AchievementBadge {
  id: string;
  number: string;
  label: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
}

export interface MasterSiteConfig {
  headerLogoUrl: string;
  footerLogoUrl: string;
  youtubeChannelId: string;
  spotifyRssUrl: string;
  showcaseBanners: ShowcaseBannerItem[];
  homeSocials: SocialLink[];
  episodeBanners: EpisodeBanner[];
  homepageTeamPhoto: {
    url: string;
    altText: string;
    titleText: string;
  };
  teamPageContent: {
    heroHeadline: string;
    heroSubheadline: string;
  };
  hosts: Record<string, HostProfile>;
  questions: FanQuestion[];
  stories: StoryPost[];
  milestones: Milestone[];
  achievements: AchievementBadge[];
  pageSeo: {
    home: PageSEO;
    team: PageSEO;
    stories: PageSEO;
    about: PageSEO;
    game: PageSEO;
  };
}

// --- INITIAL DEFAULT DATA ---
const DEFAULT_CONFIG: MasterSiteConfig = {
  headerLogoUrl: "/logo-placeholder.png",
  footerLogoUrl: "/logo-placeholder.png",
  youtubeChannelId: "UC2iOVDWKiddCPKN89wBUhGg",
  spotifyRssUrl: "https://anchor.fm/s/e8ade3f8/podcast/rss",
  showcaseBanners: [
    {
      id: "banner-1",
      imageUrl: "/showcase-banner.png",
      linkUrl: "https://www.youtube.com/@SaadeAalaRadio",
      altText: "Saade Aala Radio Comedy Special Showcase",
    },
    {
      id: "banner-2",
      imageUrl: "/hosts-group.png",
      linkUrl: "/game",
      altText: "Play MMA Arcade Game",
    },
  ],
  homeSocials: [
    { id: "s-1", platform: "YouTube", url: "https://www.youtube.com/@SaadeAalaRadio" },
    { id: "s-2", platform: "Spotify", url: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" },
    { id: "s-3", platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
  ],
  episodeBanners: [
    {
      id: "b-1",
      title: "Episode #1 - Sirsa Special Roast",
      duration: "45 MINS",
      imageUrl: "/logo-placeholder.png",
      altText: "Saade Aala Radio Sirsa Trip Roast Banner",
      metaData: "Episode 1 Thumbnail Art",
      streamUrl: "https://www.youtube.com/@SaadeAalaRadio",
    },
  ],
  homepageTeamPhoto: {
    url: "/hosts-group.png",
    altText: "Harshdeep, Sarabjeet, and Sandeep sitting in studio",
    titleText: "The Trio Behind The Mic",
  },
  teamPageContent: {
    heroHeadline: "Meet The Chaos Crew",
    heroSubheadline: "Unfiltered banter, raw comedy, and crazy stories. Get to know the hosts!",
  },
  hosts: {
    harshdeep: {
      id: "harshdeep",
      name: "Harshdeep Singh",
      role: "Lead Anchor & Chaos Director",
      photoUrl: "/hosts/harshdeep.png",
      photoAltText: "Harshdeep Singh Lead Host Cutout",
      journey: "From running wild production sets to co-founding Saade Aala Radio...",
      quote: "Tension nahi leni, story poori sun ke jaani aa!",
      socials: [{ id: "hs-1", platform: "Instagram", url: "https://instagram.com" }],
    },
    sarabjeet: {
      id: "sarabjeet",
      name: "Sarabjeet Singh",
      role: "Co-Host & Comeback King",
      photoUrl: "/hosts/sarabjeet.png",
      photoAltText: "Sarabjeet Singh Co-Host Cutout",
      journey: "Sarabjeet drops legendary one-liners that shatter the room into laughter...",
      quote: "Ehne gall shuru kiti si, khatam main karunga!",
      socials: [{ id: "ss-1", platform: "Instagram", url: "https://instagram.com" }],
    },
    sandeep: {
      id: "sandeep",
      name: "Sandeep Singh",
      role: "Co-Host & Cunning Strategist",
      photoUrl: "/hosts/sandeep.png",
      photoAltText: "Sandeep Singh Co-Host Cutout",
      journey: "The quiet genius behind the craziest takes...",
      quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
      socials: [{ id: "sn-1", platform: "Instagram", url: "https://instagram.com" }],
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
  milestones: [],
  achievements: [
    { id: "a-1", number: "100+", label: "Videos Published" },
    { id: "a-2", number: "1M+", label: "Total Views" },
    { id: "a-3", number: "3", label: "Upcoming Projects" },
  ],
  pageSeo: {
    home: { title: "Saade Aala Radio - Unfiltered Punjabi Podcast", description: "Raw comedy and banter.", keywords: "punjabi podcast, comedy, saade aala" },
    team: { title: "Meet The Team - Saade Aala Radio", description: "Meet our hosts.", keywords: "harshdeep, sarabjeet, sandeep" },
    stories: { title: "Short Stories - Saade Aala Radio", description: "Studio tales.", keywords: "stories, blogs, comedy" },
    about: { title: "About Us - Saade Aala Radio", description: "Our podcast origin story.", keywords: "about us, timeline" },
    game: { title: "8-Bit MMA Game - Saade Aala Radio", description: "Arcade fighting game.", keywords: "mma, arcade, game" },
  },
};

export default function MasterAdminCMS() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"logos" | "home" | "team" | "stories" | "about" | "seo">("logos");

  const [config, setConfig] = useState<MasterSiteConfig>(DEFAULT_CONFIG);
  const [saveMessage, setSaveMessage] = useState("");

  // Rich Text Editor State
  const editorRef = useRef<HTMLDivElement>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyPunchline, setStoryPunchline] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("Harshdeep Singh");
  const [storySummary, setStorySummary] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailAlt, setThumbnailAlt] = useState("");
  const [thumbnailMeta, setThumbnailMeta] = useState("");
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
            showcaseBanners: parsed.showcaseBanners || DEFAULT_CONFIG.showcaseBanners,
            homeSocials: parsed.homeSocials || DEFAULT_CONFIG.homeSocials,
            episodeBanners: parsed.episodeBanners || DEFAULT_CONFIG.episodeBanners,
            hosts: parsed.hosts || DEFAULT_CONFIG.hosts,
            questions: parsed.questions || DEFAULT_CONFIG.questions,
            stories: parsed.stories || DEFAULT_CONFIG.stories,
            milestones: parsed.milestones || DEFAULT_CONFIG.milestones,
            achievements: parsed.achievements || DEFAULT_CONFIG.achievements,
            pageSeo: { ...DEFAULT_CONFIG.pageSeo, ...(parsed.pageSeo || {}) },
          });
        } catch (e) {
          console.error("Error loading config", e);
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
    if (password === "saadeaala123") setIsAuthenticated(true);
    else alert("Incorrect passcode!");
  };

  // Rich Text Formatting Tools
  const formatText = (command: string, value: string | undefined = undefined) => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      if (editorRef.current) editorRef.current.focus();
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) formatText("createLink", url);
  };

  const insertImage = () => {
    const url = prompt("Enter Image URL:");
    const alt = prompt("Enter Image Alt Text:") || "Story Image";
    if (url) {
      const html = `<img src="${url}" alt="${alt}" class="my-3 rounded-xl max-w-full border border-[#27272A]" />`;
      formatText("insertHTML", html);
    }
  };

  const insertTable = () => {
    const tableHtml = `
      <table class="w-full my-3 border-collapse border border-[#27272A] text-left text-xs">
        <thead>
          <tr class="bg-[#141417] text-[#FFC800]">
            <th class="border border-[#27272A] p-2">Header 1</th>
            <th class="border border-[#27272A] p-2">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-[#27272A] p-2">Data 1</td>
            <td class="border border-[#27272A] p-2">Data 2</td>
          </tr>
        </tbody>
      </table>
    `;
    formatText("insertHTML", tableHtml);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    const contentHtml = editorRef.current?.innerHTML || "";
    if (!storyTitle || !contentHtml) return alert("Story Title and Content required!");

    let updatedStories = [...(config.stories || [])];

    if (editingStoryId) {
      updatedStories = updatedStories.map((s) =>
        s.id === editingStoryId
          ? {
              ...s,
              title: storyTitle,
              punchline: storyPunchline,
              author: storyAuthor,
              summary: storySummary,
              thumbnailUrl: thumbnailUrl || "/logo-placeholder.png",
              thumbnailAltText: thumbnailAlt,
              thumbnailMetaData: thumbnailMeta,
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
        punchline: storyPunchline,
        author: storyAuthor,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase(),
        readTime: `${Math.max(1, Math.ceil(contentHtml.length / 400))} min read`,
        thumbnailUrl: thumbnailUrl || "/logo-placeholder.png",
        thumbnailAltText: thumbnailAlt,
        thumbnailMetaData: thumbnailMeta,
        summary: storySummary || storyTitle,
        contentHtml,
        seoTitle: storySeoTitle || storyTitle,
        seoDescription: storySeoDesc || storySummary,
        searchTags: storySearchTags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      updatedStories.unshift(newPost);
    }

    saveConfig({ ...config, stories: updatedStories }, editingStoryId ? "✨ Story updated!" : "🚀 Story published!");
    
    setEditingStoryId(null);
    setStoryTitle("");
    setStoryPunchline("");
    setStorySummary("");
    setThumbnailUrl("");
    setThumbnailAlt("");
    setThumbnailMeta("");
    setStorySeoTitle("");
    setStorySeoDesc("");
    setStorySearchTags("");
    if (editorRef.current) editorRef.current.innerHTML = "";
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
          <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg hover:scale-105 transition-all">
            UNLOCK ALL CONTROLS 🔐
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-4 py-8 bg-[#09090B] text-[#FAFAFA] font-sans">
      <main className="w-full max-w-[900px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-[#27272A]">
          <div>
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA MASTER CMS</span>
            <span className="text-xs text-[#A1A1AA] block">Full Website & Live Multi-Banner Management Engine</span>
          </div>
          <Link href="/" className="text-xs font-semibold text-[#A1A1AA] border border-[#27272A] px-4 py-1.5 rounded-full bg-white/5 hover:border-[#FFC800] transition-colors">
            ← LIVE WEBSITE
          </Link>
        </header>

        {saveMessage && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center animate-in fade-in duration-200">
            {saveMessage}
          </div>
        )}

        {/* Master Navigation Tabs */}
        <div className="grid grid-cols-6 gap-1 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          {[
            { id: "logos", label: "🎨 Logos" },
            { id: "home", label: "🏠 Homepage" },
            { id: "team", label: "🎙️ Team Page" },
            { id: "stories", label: "✍️ Stories & Editor" },
            { id: "about", label: "📖 About & Stats" },
            { id: "seo", label: "🔍 Global SEO" },
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

        {/* TAB 0: BRANDING & LOGOS UPLOAD PANEL */}
        {activeTab === "logos" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-6">
            <div>
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Site Brand Logos</h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Upload custom images for your website header and 500x500 footer logo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Header Logo File Picker */}
              <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Header Logo</span>
                <div className="h-24 bg-[#141417] border border-[#27272A] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                  {config.headerLogoUrl ? (
                    <img src={config.headerLogoUrl} alt="Header Logo Preview" className="max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-[#71717A] font-bold">NO HEADER LOGO UPLOADED</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#FFC800]">Select New Header Logo File:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          saveConfig({ ...config, headerLogoUrl: reader.result as string }, "✨ Header logo updated!");
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#FFC800] file:text-black hover:file:cursor-pointer"
                  />
                </div>
              </div>

              {/* 500x500 Footer Logo File Picker */}
              <div className="bg-[#09090B] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Footer Logo (500x500 PNG)</span>
                <div className="h-24 bg-[#141417] border border-[#27272A] rounded-xl flex items-center justify-center p-3 relative overflow-hidden">
                  {config.footerLogoUrl ? (
                    <img src={config.footerLogoUrl} alt="Footer Logo Preview" className="max-h-full object-contain" />
                  ) : (
                    <span className="text-xs text-[#71717A] font-bold">NO FOOTER LOGO UPLOADED</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#FFC800]">Select 500x500 Footer Image File:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          saveConfig({ ...config, footerLogoUrl: reader.result as string }, "✨ 500x500 Footer logo updated!");
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="text-xs text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#FFC800] file:text-black hover:file:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 1: HOMEPAGE MANAGER (SHOWCASE MULTI-BANNERS & LIVE RSS) */}
        {activeTab === "home" && (
          <section className="flex flex-col gap-6">
            
            {/* 🌟 1. TOP MULTI-BANNER SHOWCASE CAROUSEL CMS */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">🖼️ Top Showcase Multi-Banners</h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">Manage full-width showcase banners with clickable destination links.</p>
                </div>
                <button
                  onClick={() => {
                    const newBanner: ShowcaseBannerItem = {
                      id: `sb-${Date.now()}`,
                      imageUrl: "/showcase-banner.png",
                      linkUrl: "https://www.youtube.com/@SaadeAalaRadio",
                      altText: "New Showcase Banner",
                    };
                    saveConfig(
                      { ...config, showcaseBanners: [...(config.showcaseBanners || []), newBanner] },
                      "✨ Showcase banner added!"
                    );
                  }}
                  className="px-4 py-1.5 bg-[#FFC800] text-black text-xs font-bold rounded-xl shadow hover:scale-105 transition-all"
                >
                  + Add Showcase Banner
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {(config.showcaseBanners || []).map((sb, idx) => (
                  <div key={sb.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#FFC800]">SLIDE #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = config.showcaseBanners.filter((b) => b.id !== sb.id);
                          saveConfig({ ...config, showcaseBanners: updated }, "🗑️ Showcase banner removed!");
                        }}
                        className="text-xs text-red-400 font-bold hover:underline"
                      >
                        Delete Slide
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#A1A1AA] font-bold">Image URL or Local Path:</span>
                        <input
                          type="text"
                          value={sb.imageUrl}
                          onChange={(e) => {
                            const updated = [...config.showcaseBanners];
                            updated[idx].imageUrl = e.target.value;
                            saveConfig({ ...config, showcaseBanners: updated }, "Image URL updated!");
                          }}
                          placeholder="/showcase-banner.png or https://..."
                          className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#A1A1AA] font-bold">Click Destination URL (Optional):</span>
                        <input
                          type="text"
                          value={sb.linkUrl}
                          onChange={(e) => {
                            const updated = [...config.showcaseBanners];
                            updated[idx].linkUrl = e.target.value;
                            saveConfig({ ...config, showcaseBanners: updated }, "Destination link updated!");
                          }}
                          placeholder="e.g. /game or https://youtube.com/..."
                          className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Direct Image File Uploader */}
                    <div className="flex items-center gap-3 bg-[#141417] border border-[#27272A] p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-[#FFC800]">Upload Banner Image File:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updated = [...config.showcaseBanners];
                              updated[idx].imageUrl = reader.result as string;
                              saveConfig({ ...config, showcaseBanners: updated }, "Banner image uploaded!");
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-[10px] text-[#A1A1AA] w-full"
                      />
                    </div>

                    <input
                      type="text"
                      value={sb.altText}
                      onChange={(e) => {
                        const updated = [...config.showcaseBanners];
                        updated[idx].altText = e.target.value;
                        saveConfig({ ...config, showcaseBanners: updated }, "Alt text updated!");
                      }}
                      placeholder="Banner Alt Description (SEO & Accessibility)"
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 🔴 2. AUTOMATED YOUTUBE & SPOTIFY RSS SYNC SETTINGS */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div>
                <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">⚡ Live Podcast Auto-Sync Feeds</h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">The site continuously polls these endpoints to auto-update new episodes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#FFC800]">YouTube Channel ID</span>
                  <input
                    type="text"
                    value={config.youtubeChannelId || "UC2iOVDWKiddCPKN89wBUhGg"}
                    onChange={(e) => {
                      saveConfig({ ...config, youtubeChannelId: e.target.value }, "YouTube Channel ID updated!");
                    }}
                    placeholder="UC2iOVDWKiddCPKN89wBUhGg"
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-[#71717A]">Used by /api/youtube to fetch live videos.</span>
                </div>

                <div className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#FFC800]">Spotify / Anchor RSS Feed URL</span>
                  <input
                    type="text"
                    value={config.spotifyRssUrl || "https://anchor.fm/s/e8ade3f8/podcast/rss"}
                    onChange={(e) => {
                      saveConfig({ ...config, spotifyRssUrl: e.target.value }, "Spotify RSS Feed URL updated!");
                    }}
                    placeholder="https://anchor.fm/s/.../podcast/rss"
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                  />
                  <span className="text-[10px] text-[#71717A]">Used by /api/spotify for audio playback.</span>
                </div>
              </div>
            </div>

            {/* 3. Social Media Links */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Homepage Social Media Links</h2>
                <button
                  onClick={() => {
                    const newSocial: SocialLink = { id: `s-${Date.now()}`, platform: "Instagram", url: "https://instagram.com" };
                    saveConfig({ ...config, homeSocials: [...(config.homeSocials || []), newSocial] }, "Social link added!");
                  }}
                  className="px-3 py-1 bg-[#FFC800] text-black text-xs font-bold rounded-xl shadow hover:scale-105 transition-all"
                >
                  + Add Social Link
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {(config.homeSocials || []).map((social, idx) => (
                  <div key={social.id} className="bg-[#09090B] border border-[#27272A] p-3 rounded-xl flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => {
                        const updated = [...config.homeSocials];
                        updated[idx].platform = e.target.value;
                        saveConfig({ ...config, homeSocials: updated }, "Updated platform!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-lg p-2 text-xs text-white w-1/3"
                      placeholder="Platform"
                    />
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => {
                        const updated = [...config.homeSocials];
                        updated[idx].url = e.target.value;
                        saveConfig({ ...config, homeSocials: updated }, "Updated URL!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-lg p-2 text-xs text-white w-full"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => {
                        const updated = config.homeSocials.filter((s) => s.id !== social.id);
                        saveConfig({ ...config, homeSocials: updated }, "Social deleted!");
                      }}
                      className="text-xs text-red-400 font-bold px-2 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 16:9 Banner Slides */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">16:9 Episode Banner Slides (Manual CMS Override)</h2>
                <button
                  onClick={() => {
                    const newB: EpisodeBanner = {
                      id: `b-${Date.now()}`,
                      title: "New Episode Banner",
                      duration: "45 MINS",
                      imageUrl: "/logo-placeholder.png",
                      altText: "Banner Alt Text",
                      metaData: "Episode Art",
                      streamUrl: "https://youtube.com",
                    };
                    saveConfig({ ...config, episodeBanners: [...(config.episodeBanners || []), newB] }, "Banner added!");
                  }}
                  className="px-3 py-1 bg-[#FFC800] text-black text-xs font-bold rounded-xl shadow hover:scale-105 transition-all"
                >
                  + Add Banner Slide
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {(config.episodeBanners || []).map((b, idx) => (
                  <div key={b.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#FFC800]">SLIDE #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = config.episodeBanners.filter((item) => item.id !== b.id);
                          saveConfig({ ...config, episodeBanners: updated }, "Banner deleted!");
                        }}
                        className="text-xs text-red-400 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </div>

                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...config.episodeBanners];
                        updated[idx].title = e.target.value;
                        saveConfig({ ...config, episodeBanners: updated }, "Banner updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                      placeholder="Title"
                    />

                    <div className="flex items-center gap-3 bg-[#141417] border border-[#27272A] p-3 rounded-xl">
                      <span className="text-[10px] font-bold text-[#FFC800]">16:9 Image:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updated = [...config.episodeBanners];
                              updated[idx].imageUrl = reader.result as string;
                              saveConfig({ ...config, episodeBanners: updated }, "Banner thumbnail uploaded!");
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-[10px] text-[#A1A1AA] w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* TAB 2: TEAM PAGE MANAGER */}
        {activeTab === "team" && (
          <section className="flex flex-col gap-6">
            
            {/* Team Page Headings */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-3">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Team Page Headings & Copy</h2>
              <input
                type="text"
                value={config.teamPageContent?.heroHeadline || ""}
                onChange={(e) => {
                  const updated = { ...config.teamPageContent, heroHeadline: e.target.value };
                  saveConfig({ ...config, teamPageContent: updated }, "Headline updated!");
                }}
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                placeholder="Page Headline"
              />
              <textarea
                rows={2}
                value={config.teamPageContent?.heroSubheadline || ""}
                onChange={(e) => {
                  const updated = { ...config.teamPageContent, heroSubheadline: e.target.value };
                  saveConfig({ ...config, teamPageContent: updated }, "Subheadline updated!");
                }}
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white resize-none"
                placeholder="Subheadline Description"
              />
            </div>

            {/* Host Profiles + Social Buttons per Host */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-6">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Host Profiles & Socials</h2>
              {Object.keys(config.hosts || {}).map((key) => {
                const host = config.hosts[key];
                return (
                  <div key={key} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                    <span className="text-xs font-black text-[#FFC800] uppercase">{host.name}</span>
                    
                    <input
                      type="text"
                      value={host.role}
                      onChange={(e) => {
                        const updated = { ...config.hosts, [key]: { ...host, role: e.target.value } };
                        saveConfig({ ...config, hosts: updated }, "Host role updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                      placeholder="Role Title"
                    />

                    <textarea
                      rows={2}
                      value={host.journey}
                      onChange={(e) => {
                        const updated = { ...config.hosts, [key]: { ...host, journey: e.target.value } };
                        saveConfig({ ...config, hosts: updated }, "Host bio updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white resize-none"
                      placeholder="Journey Bio"
                    />

                    <input
                      type="text"
                      value={host.quote}
                      onChange={(e) => {
                        const updated = { ...config.hosts, [key]: { ...host, quote: e.target.value } };
                        saveConfig({ ...config, hosts: updated }, "Host quote updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                      placeholder="Signature Quote"
                    />

                    <div className="flex items-center gap-3 bg-[#141417] border border-[#27272A] p-2.5 rounded-xl">
                      <span className="text-xs font-bold text-[#FFC800]">Host Photo:</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const updated = { ...config.hosts, [key]: { ...host, photoUrl: reader.result as string } };
                              saveConfig({ ...config, hosts: updated }, "Host photo uploaded!");
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="text-xs text-[#A1A1AA]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Q&A Approval Feed */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-3">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Fan Q&A Approval Inbox</h2>
              {(config.questions || []).map((q) => (
                <div key={q.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#FFC800]">👤 {q.fanName}</span>
                    <button
                      onClick={() => {
                        const updated = config.questions.filter((item) => item.id !== q.id);
                        saveConfig({ ...config, questions: updated }, "Question deleted!");
                      }}
                      className="text-xs text-red-400 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-xs text-white">"{q.question}"</p>
                  <textarea
                    rows={2}
                    defaultValue={q.answer}
                    onBlur={(e) => {
                      const updated = config.questions.map((item) => (item.id === q.id ? { ...item, answer: e.target.value } : item));
                      saveConfig({ ...config, questions: updated }, "Answer saved!");
                    }}
                    placeholder="Host answer..."
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white resize-none"
                  />
                  <button
                    onClick={() => {
                      const updated = config.questions.map((item) => (item.id === q.id ? { ...item, isApproved: !item.isApproved } : item));
                      saveConfig({ ...config, questions: updated }, "Approval status toggled!");
                    }}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${q.isApproved ? "bg-green-500/20 text-green-400" : "bg-[#FFC800] text-black"}`}
                  >
                    {q.isApproved ? "✓ Approved (Click to Hide)" : "Approve & Publish ➔"}
                  </button>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* TAB 3: STORIES & RICH TEXT EDITOR */}
        {activeTab === "stories" && (
          <section className="flex flex-col gap-6">
            
            {/* Manage Published Stories */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-3">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Manage Published Stories</h2>
              {(config.stories || []).map((story) => (
                <div key={story.id} className="bg-[#09090B] border border-[#27272A] p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{story.title}</span>
                    <span className="text-[10px] text-[#A1A1AA]">By {story.author} • {story.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingStoryId(story.id);
                        setStoryTitle(story.title);
                        setStoryPunchline(story.punchline || "");
                        setStoryAuthor(story.author);
                        setStorySummary(story.summary);
                        setThumbnailUrl(story.thumbnailUrl);
                        setThumbnailAlt(story.thumbnailAltText || "");
                        setThumbnailMeta(story.thumbnailMetaData || "");
                        setStorySeoTitle(story.seoTitle);
                        setStorySeoDesc(story.seoDescription);
                        setStorySearchTags((story.searchTags || []).join(", "));
                        if (editorRef.current) editorRef.current.innerHTML = story.contentHtml;
                      }}
                      className="px-3 py-1 bg-[#FFC800] text-black text-xs font-bold rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const updated = config.stories.filter((s) => s.id !== story.id);
                        saveConfig({ ...config, stories: updated }, "Story deleted!");
                      }}
                      className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Rich Text Editor Form */}
            <form onSubmit={handleSaveStory} className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">
                {editingStoryId ? "✏️ Edit Story" : "✍️ Write Story"}
              </h2>

              <input
                type="text"
                required
                placeholder="Story Title"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
              />

              <input
                type="text"
                placeholder="Story Punchline / Comedy Teaser"
                value={storyPunchline}
                onChange={(e) => setStoryPunchline(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={storyAuthor}
                  onChange={(e) => setStoryAuthor(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="Harshdeep Singh">Harshdeep Singh</option>
                  <option value="Sarabjeet Singh">Sarabjeet Singh</option>
                  <option value="Sandeep Singh">Sandeep Singh</option>
                </select>

                <input
                  type="text"
                  placeholder="Summary Excerpt"
                  value={storySummary}
                  onChange={(e) => setStorySummary(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              {/* Story Thumbnail Uploader */}
              <div className="flex items-center gap-3 bg-[#09090B] border border-[#27272A] p-3 rounded-xl">
                <span className="text-xs font-bold text-[#FFC800]">Story Thumbnail:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setThumbnailUrl(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs text-[#A1A1AA]"
                />
              </div>

              {/* Rich Text Editor Toolbar */}
              <div className="border border-[#27272A] rounded-2xl overflow-hidden bg-[#09090B]">
                <div className="flex flex-wrap gap-1 bg-[#141417] p-2 border-b border-[#27272A]">
                  <button type="button" onClick={() => formatText("bold")} className="px-2 py-1 bg-[#09090B] text-xs font-black text-white rounded">B</button>
                  <button type="button" onClick={() => formatText("italic")} className="px-2 py-1 bg-[#09090B] text-xs italic text-white rounded">I</button>
                  <button type="button" onClick={() => formatText("formatBlock", "<h1>")} className="px-2 py-1 bg-[#09090B] text-xs font-black text-[#FFC800] rounded">H1</button>
                  <button type="button" onClick={() => formatText("formatBlock", "<h2>")} className="px-2 py-1 bg-[#09090B] text-xs font-black text-[#FFC800] rounded">H2</button>
                  <button type="button" onClick={() => formatText("formatBlock", "<h3>")} className="px-2 py-1 bg-[#09090B] text-xs font-bold text-white rounded">H3</button>
                  <button type="button" onClick={() => formatText("insertUnorderedList")} className="px-2 py-1 bg-[#09090B] text-xs text-white rounded">• List</button>
                  <button type="button" onClick={insertLink} className="px-2 py-1 bg-[#09090B] text-xs text-[#FFC800] rounded">🔗 Link</button>
                  <button type="button" onClick={insertImage} className="px-2 py-1 bg-[#09090B] text-xs text-[#FFC800] rounded">🖼️ Image</button>
                  <button type="button" onClick={insertTable} className="px-2 py-1 bg-[#09090B] text-xs text-[#FFC800] rounded">📊 Table</button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[220px] p-4 text-xs text-white focus:outline-none leading-relaxed [&_h1]:text-lg [&_h1]:font-black [&_h1]:text-[#FFC800] [&_h2]:text-base [&_h2]:font-black [&_h2]:text-[#FFC800] [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-white"
                />
              </div>

              <input
                type="text"
                placeholder="Story SEO Meta Title"
                value={storySeoTitle}
                onChange={(e) => setStorySeoTitle(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl p-2.5 text-xs text-white"
              />

              <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg hover:scale-105 transition-all">
                PUBLISH STORY 🚀
              </button>
            </form>

          </section>
        )}

        {/* TAB 4: ABOUT TIMELINE & ACHIEVEMENTS */}
        {activeTab === "about" && (
          <section className="flex flex-col gap-6">
            
            {/* Achievements Counter Bar */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-3">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Achievements Counters</h2>
              <div className="grid grid-cols-3 gap-3">
                {(config.achievements || []).map((ach, idx) => (
                  <div key={ach.id} className="bg-[#09090B] border border-[#27272A] p-3 rounded-xl flex flex-col gap-1">
                    <input
                      type="text"
                      value={ach.number}
                      onChange={(e) => {
                        const updated = [...config.achievements];
                        updated[idx].number = e.target.value;
                        saveConfig({ ...config, achievements: updated }, "Achievement updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded p-1 text-xs text-[#FFC800] font-black"
                    />
                    <input
                      type="text"
                      value={ach.label}
                      onChange={(e) => {
                        const updated = [...config.achievements];
                        updated[idx].label = e.target.value;
                        saveConfig({ ...config, achievements: updated }, "Achievement updated!");
                      }}
                      className="bg-[#141417] border border-[#27272A] rounded p-1 text-[10px] text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Milestones with Direct File Upload Button */}
            <div className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Milestone Timeline Stops</h2>
                <button
                  onClick={() => {
                    const newM: Milestone = {
                      id: `m-${Date.now()}`,
                      tag: "MILESTONE",
                      title: "New Story Stop",
                      description: "Description",
                      imageUrl: "/logo-placeholder.png",
                      imageAltText: "Milestone Photo",
                      imageMetaData: "Studio Stop",
                    };
                    saveConfig({ ...config, milestones: [...(config.milestones || []), newM] }, "Milestone added!");
                  }}
                  className="px-3 py-1 bg-[#FFC800] text-black text-xs font-bold rounded-xl shadow hover:scale-105 transition-all"
                >
                  + Add Milestone
                </button>
              </div>

              {(config.milestones || []).map((ms, idx) => (
                <div key={ms.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-[#FFC800]">STOP #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = config.milestones.filter((m) => m.id !== ms.id);
                        saveConfig({ ...config, milestones: updated }, "Milestone deleted!");
                      }}
                      className="text-xs text-red-400 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                  <input
                    type="text"
                    value={ms.title}
                    onChange={(e) => {
                      const updated = [...config.milestones];
                      updated[idx].title = e.target.value;
                      saveConfig({ ...config, milestones: updated }, "Milestone updated!");
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                    placeholder="Milestone Title"
                  />

                  {/* 📷 Milestone Photo Uploader Button */}
                  <div className="flex items-center gap-3 bg-[#141417] border border-[#27272A] p-3 rounded-xl">
                    <span className="text-xs font-bold text-[#FFC800]">📷 Upload Milestone Photo:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updated = [...config.milestones];
                            updated[idx].imageUrl = reader.result as string;
                            saveConfig({ ...config, milestones: updated }, "Milestone photo uploaded!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-xs text-[#A1A1AA]"
                    />
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* TAB 5: GLOBAL PAGE SEO */}
        {activeTab === "seo" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Page SEO Settings</h2>
            {(["home", "team", "stories", "about", "game"] as const).map((pageKey) => (
              <div key={pageKey} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-black text-[#FFC800] uppercase">Route: /{pageKey === "home" ? "" : pageKey}</span>
                <input
                  type="text"
                  value={config.pageSeo?.[pageKey]?.title || ""}
                  onChange={(e) => {
                    const updated = {
                      ...config.pageSeo,
                      [pageKey]: { ...config.pageSeo[pageKey], title: e.target.value },
                    };
                    saveConfig({ ...config, pageSeo: updated }, "SEO updated!");
                  }}
                  className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                  placeholder="Meta Title"
                />
                <input
                  type="text"
                  value={config.pageSeo?.[pageKey]?.description || ""}
                  onChange={(e) => {
                    const updated = {
                      ...config.pageSeo,
                      [pageKey]: { ...config.pageSeo[pageKey], description: e.target.value },
                    };
                    saveConfig({ ...config, pageSeo: updated }, "SEO updated!");
                  }}
                  className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white"
                  placeholder="Meta Description"
                />
              </div>
            ))}
          </section>
        )}

      </main>
    </div>
  );
}