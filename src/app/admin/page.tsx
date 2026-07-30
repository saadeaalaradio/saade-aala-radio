"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export interface SocialLink {
  platform: string;
  url: string;
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

export interface FanQuestion {
  id: string;
  hostId: string;
  fanName: string;
  question: string;
  answer: string;
  timestamp: string;
  isApproved: boolean;
}

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
  milestones: Milestone[];
}

export interface PageSEO {
  title: string;
  description: string;
}

export interface SiteConfig {
  stories: StoryPost[];
  questions: FanQuestion[];
  aboutConfig: AboutConfig;
  pageSeo: {
    home: PageSEO;
    team: PageSEO;
    stories: PageSEO;
    about: PageSEO;
    game: PageSEO;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  stories: [
    {
      id: "story-1",
      title: "The Unfiltered Truth Behind The Sirsa Trip",
      author: "Harshdeep Singh",
      date: "JUL 20, 2026",
      readTime: "3 min read",
      thumbnailUrl: "/logo-placeholder.png",
      summary: "We thought it was a 2-hour drive. 14 hours later we were stranded with no battery.",
      contentHtml: "<p>It all started when Sandeep said 'Short cut pata hai mujhe'...</p>",
      seoTitle: "Sirsa Trip Story - Saade Aala Radio",
      seoDescription: "The hilarious behind the scenes story of the Sirsa trip.",
      searchTags: ["sirsa", "travel", "podcast"],
    },
  ],
  questions: [
    {
      id: "q-1",
      hostId: "harshdeep",
      fanName: "Aman_Mohali",
      question: "Harshdeep bhaji, next live episode kadon aavega?",
      answer: "Agle Friday sharp 8 PM! Tayyar raho!",
      timestamp: "JUL 28, 2026",
      isApproved: true,
    },
  ],
  aboutConfig: {
    heroTag: "OUR STORY & JOURNEY",
    heroTitle: "How Three Friends Turned Late-Night Banter Into A Cult Podcast",
    heroDescription: "No scripts, no filters, just pure Punjabi comedy.",
    milestones: [],
  },
  pageSeo: {
    home: { title: "Saade Aala Radio - Punjabi Comedy Podcast", description: "Unfiltered chaos, deep laughs & wild stories." },
    team: { title: "Meet The Team - Saade Aala Radio", description: "Get to know Harshdeep, Sarabjeet, and Sandeep." },
    stories: { title: "Short Stories & Blogs - Saade Aala Radio", description: "Read behind the scenes stories and studio tales." },
    about: { title: "About Us - Saade Aala Radio", description: "Our journey from a makeshift room to a pro studio." },
    game: { title: "MMA Arcade Game - Saade Aala Radio", description: "Play our 8-bit retro fighting mini-game." },
  },
};

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"stories" | "editor" | "inbox" | "seo">("stories");

  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [saveMessage, setSaveMessage] = useState("");

  // Story Editing State
  const editorRef = useRef<HTMLDivElement>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("Harshdeep Singh");
  const [storySummary, setStorySummary] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [searchTags, setSearchTags] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("saade_aala_cms_config");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveConfig = (updated: SiteConfig, msg: string) => {
    setConfig(updated);
    localStorage.setItem("saade_aala_cms_config", JSON.stringify(updated));
    // Also sync to about config storage if needed
    localStorage.setItem("saade_aala_about_config", JSON.stringify(updated.aboutConfig));
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") setIsAuthenticated(true);
    else alert("Incorrect passcode!");
  };

  const handleSaveOrPublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    const contentHtml = editorRef.current?.innerHTML || "";
    if (!storyTitle || !contentHtml) return alert("Title and content required.");

    let updatedStories = [...config.stories];

    if (editingStoryId) {
      updatedStories = updatedStories.map((s) =>
        s.id === editingStoryId
          ? {
              ...s,
              title: storyTitle,
              author: storyAuthor,
              summary: storySummary,
              thumbnailUrl,
              contentHtml,
              seoTitle: seoTitle || storyTitle,
              seoDescription: seoDescription || storySummary,
              searchTags: searchTags.split(",").map((t) => t.trim()).filter(Boolean),
            }
          : s
      );
    } else {
      const newPost: StoryPost = {
        id: `story-${Date.now()}`,
        title: storyTitle,
        author: storyAuthor,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        readTime: `${Math.max(1, Math.ceil(contentHtml.length / 500))} min read`,
        thumbnailUrl: thumbnailUrl || "/logo-placeholder.png",
        summary: storySummary || storyTitle,
        contentHtml,
        seoTitle: seoTitle || storyTitle,
        seoDescription: seoDescription || storySummary,
        searchTags: searchTags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      updatedStories.unshift(newPost);
    }

    saveConfig({ ...config, stories: updatedStories }, editingStoryId ? "✨ Story updated!" : "🚀 Story published!");
    
    setEditingStoryId(null);
    setStoryTitle("");
    setStorySummary("");
    setSeoTitle("");
    setSeoDescription("");
    setSearchTags("");
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 bg-[#09090B] text-white">
        <form onSubmit={handleLogin} className="w-full max-w-[360px] bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 text-center shadow-2xl">
          <div className="text-2xl font-black text-[#FFC800]">SAADE AALA CMS</div>
          <p className="text-xs text-[#A1A1AA]">Enter admin passcode to manage website content & SEO.</p>
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
      <main className="w-full max-w-[800px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-[#27272A]">
          <div>
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA CMS</span>
            <span className="text-xs text-[#A1A1AA] block">Master Control Panel & SEO Manager</span>
          </div>
          <Link href="/" className="text-xs font-semibold text-[#A1A1AA] border border-[#27272A] px-4 py-1.5 rounded-full bg-white/5 hover:border-[#FFC800]">
            ← VIEW LIVE SITE
          </Link>
        </header>

        {saveMessage && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center">
            {saveMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          {[
            { id: "stories", label: "📚 Manage Stories" },
            { id: "editor", label: "✍️ Write Story" },
            { id: "inbox", label: "💬 Q&A Inbox" },
            { id: "seo", label: "🔍 Page SEO" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 text-[11px] font-extrabold uppercase rounded-xl transition-all ${
                activeTab === tab.id ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: MANAGE STORIES */}
        {activeTab === "stories" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Published Stories ({config.stories.length})</h2>
            <div className="flex flex-col gap-3">
              {config.stories.map((story) => (
                <div key={story.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex justify-between items-center">
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-[10px] text-[#FFC800] font-bold">{story.author} • {story.date}</span>
                    <h3 className="text-sm font-black text-white">{story.title}</h3>
                    <span className="text-[10px] text-[#71717A]">SEO Title: {story.seoTitle}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingStoryId(story.id);
                      setStoryTitle(story.title);
                      setStoryAuthor(story.author);
                      setStorySummary(story.summary);
                      setSeoTitle(story.seoTitle);
                      setSeoDescription(story.seoDescription);
                      setSearchTags(story.searchTags.join(", "));
                      if (editorRef.current) editorRef.current.innerHTML = story.contentHtml;
                      setActiveTab("editor");
                    }}
                    className="px-3 py-1.5 bg-[#FFC800] text-black text-xs font-bold rounded-xl shrink-0"
                  >
                    ✏️ Edit
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: WRITE & EDIT STORY (WITH SEO META FIELDS) */}
        {activeTab === "editor" && (
          <form onSubmit={handleSaveOrPublishStory} className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">
              {editingStoryId ? "✏️ Edit Story & SEO" : "✍️ Write New Story & SEO"}
            </h2>

            <input
              type="text"
              required
              placeholder="Story Title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#FFC800]"
            />

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
              placeholder="Short Summary / Teaser"
              value={storySummary}
              onChange={(e) => setStorySummary(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />

            <div
              ref={editorRef}
              contentEditable
              className="min-h-[180px] bg-[#09090B] border border-[#27272A] rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#FFC800] overflow-y-auto"
            />

            {/* SEO Section for Story */}
            <div className="flex flex-col gap-3 pt-3 border-t border-[#27272A]">
              <span className="text-[10px] font-extrabold text-[#FFC800] uppercase">🔍 Story SEO Meta Tags</span>
              <input
                type="text"
                placeholder="SEO Meta Title (Google search title)"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
              />
              <textarea
                rows={2}
                placeholder="SEO Meta Description"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white resize-none"
              />
              <input
                type="text"
                placeholder="Search Tags (comma separated)"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl mt-2">
              {editingStoryId ? "UPDATE STORY 💾" : "PUBLISH STORY 🚀"}
            </button>
          </form>
        )}

        {/* TAB: Q&A INBOX */}
        {activeTab === "inbox" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Fan Question Inbox ({config.questions.length})</h2>
            <div className="flex flex-col gap-3">
              {config.questions.map((q) => (
                <div key={q.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#FFC800]">👤 {q.fanName}</span>
                  <p className="text-xs text-white">"{q.question}"</p>
                  <textarea
                    rows={2}
                    defaultValue={q.answer}
                    onBlur={(e) => {
                      const updated = config.questions.map(item => item.id === q.id ? { ...item, answer: e.target.value } : item);
                      saveConfig({ ...config, questions: updated }, "Host reply saved!");
                    }}
                    placeholder="Write host response..."
                    className="bg-[#141417] border border-[#27272A] rounded-xl p-2 text-xs text-white resize-none"
                  />
                  <button
                    onClick={() => {
                      const updated = config.questions.map(item => item.id === q.id ? { ...item, isApproved: !item.isApproved } : item);
                      saveConfig({ ...config, questions: updated }, "Status updated!");
                    }}
                    className={`py-1.5 rounded-xl text-xs font-bold ${q.isApproved ? "bg-green-500/20 text-green-400" : "bg-[#FFC800] text-black"}`}
                  >
                    {q.isApproved ? "Approved (Click to Hide)" : "Approve & Publish ➔"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: GLOBAL PAGE SEO */}
        {activeTab === "seo" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Global Page SEO Manager</h2>
            <p className="text-xs text-[#A1A1AA]">Manage search engine titles and descriptions for core site pages.</p>

            <div className="flex flex-col gap-4">
              {(["home", "team", "stories", "about", "game"] as const).map((pageKey) => (
                <div key={pageKey} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-xs font-black text-[#FFC800] uppercase">Page: /{pageKey === "home" ? "" : pageKey}</span>
                  <input
                    type="text"
                    value={config.pageSeo[pageKey].title}
                    onChange={(e) => {
                      const updatedSeo = { ...config.pageSeo, [pageKey]: { ...config.pageSeo[pageKey], title: e.target.value } };
                      saveConfig({ ...config, pageSeo: updatedSeo }, "SEO settings updated!");
                    }}
                    placeholder="Meta Title"
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={config.pageSeo[pageKey].description}
                    onChange={(e) => {
                      const updatedSeo = { ...config.pageSeo, [pageKey]: { ...config.pageSeo[pageKey], description: e.target.value } };
                      saveConfig({ ...config, pageSeo: updatedSeo }, "SEO settings updated!");
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