"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  journey: string;
  quote: string;
  socials: SocialLink[];
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

export interface SiteConfig {
  headerLogoUrl: string;
  footerLogoUrl: string;
  mainSocials: SocialLink[];
  hosts: Record<string, HostProfile>;
  stories: StoryPost[];
  questions: FanQuestion[];
}

const DEFAULT_CONFIG: SiteConfig = {
  headerLogoUrl: "/logo-placeholder.png",
  footerLogoUrl: "/logo-placeholder.png",
  mainSocials: [
    { platform: "YouTube", url: "https://www.youtube.com/@SaadeAalaRadio" },
    { platform: "Spotify", url: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" },
    { platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
  ],
  hosts: {
    harshdeep: {
      id: "harshdeep",
      name: "Harshdeep Singh",
      role: "Lead Anchor & Chaos Director",
      photoUrl: "/hosts/harshdeep.png",
      journey: "From running wild production sets to co-founding Saade Aala Radio, Harshdeep brings unfiltered energy.",
      quote: "Tension nahi leni, story poori sun ke jaani aa!",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
    sarabjeet: {
      id: "sarabjeet",
      name: "Sarabjeet Singh",
      role: "Co-Host & Comeback King",
      photoUrl: "/hosts/sarabjeet.png",
      journey: "Sarabjeet is the anchor of reality—until he snaps with hilarious one-liners.",
      quote: "Ehne gall shuru kiti si, khatam main karunga!",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
    sandeep: {
      id: "sandeep",
      name: "Sandeep Singh",
      role: "Co-Host & Cunning Strategist",
      photoUrl: "/hosts/sandeep.png",
      journey: "The quiet genius behind the craziest takes.",
      quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
  },
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
};

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"logos" | "socials" | "hosts" | "editor" | "stories" | "inbox">("editor");

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
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") setIsAuthenticated(true);
    else alert("Incorrect passcode!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => cb(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Story Edit Loader
  const startEditingStory = (story: StoryPost) => {
    setEditingStoryId(story.id);
    setStoryTitle(story.title);
    setStoryAuthor(story.author);
    setStorySummary(story.summary);
    setThumbnailUrl(story.thumbnailUrl);
    setSeoTitle(story.seoTitle);
    setSeoDescription(story.seoDescription);
    setSearchTags(story.searchTags.join(", "));
    if (editorRef.current) editorRef.current.innerHTML = story.contentHtml;
    setActiveTab("editor");
  };

  const handleSaveOrPublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    const contentHtml = editorRef.current?.innerHTML || "";
    if (!storyTitle || !contentHtml) return alert("Title and content required.");

    let updatedStories = [...config.stories];

    if (editingStoryId) {
      // Edit existing story
      updatedStories = updatedStories.map((s) =>
        s.id === editingStoryId
          ? {
              ...s,
              title: storyTitle,
              author: storyAuthor,
              summary: storySummary,
              thumbnailUrl,
              contentHtml,
              seoTitle,
              seoDescription,
              searchTags: searchTags.split(",").map((t) => t.trim()).filter(Boolean),
            }
          : s
      );
    } else {
      // Create new story
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

    saveConfig({ ...config, stories: updatedStories }, editingStoryId ? "✨ Story updated successfully!" : "🚀 Story published!");
    
    // Reset Form
    setEditingStoryId(null);
    setStoryTitle("");
    setStorySummary("");
    setThumbnailUrl("");
    setSeoTitle("");
    setSeoDescription("");
    setSearchTags("");
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const deleteStory = (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    const updated = config.stories.filter((s) => s.id !== id);
    saveConfig({ ...config, stories: updated }, "🗑️ Story deleted.");
  };

  // Q&A Answer & Approval
  const handleAnswerQuestion = (qId: string, answerText: string) => {
    const updatedQuestions = config.questions.map((q) =>
      q.id === qId ? { ...q, answer: answerText } : q
    );
    saveConfig({ ...config, questions: updatedQuestions }, "💬 Host reply saved!");
  };

  const toggleQuestionApproval = (qId: string) => {
    const updatedQuestions = config.questions.map((q) =>
      q.id === qId ? { ...q, isApproved: !q.isApproved } : q
    );
    saveConfig({ ...config, questions: updatedQuestions }, "Status updated!");
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
      <main className="w-full max-w-[800px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-3 border-b border-[#27272A]">
          <div>
            <span className="text-lg font-black text-[#FFC800]">SAADE AALA CMS</span>
            <span className="text-xs text-[#A1A1AA] block">Master Control Panel</span>
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
        <div className="grid grid-cols-6 gap-1 bg-[#141417] p-1.5 rounded-2xl border border-[#27272A] text-center">
          {[
            { id: "editor", label: "✍️ Write Story" },
            { id: "stories", label: "📚 Manage Stories" },
            { id: "inbox", label: "💬 Fan Q&A Inbox" },
            { id: "hosts", label: "🎙️ Hosts" },
            { id: "logos", label: "🖼️ Logos" },
            { id: "socials", label: "🌐 Links" },
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

        {/* TAB: WRITE & EDIT STORY */}
        {activeTab === "editor" && (
          <form onSubmit={handleSaveOrPublishStory} className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">
                {editingStoryId ? "✏️ Edit Existing Story" : "✍️ Write New Story"}
              </h2>
              {editingStoryId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingStoryId(null);
                    setStoryTitle("");
                    setStorySummary("");
                    if (editorRef.current) editorRef.current.innerHTML = "";
                  }}
                  className="text-xs text-red-400 underline font-bold"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <input
              type="text"
              required
              placeholder="Story Title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#FFC800]"
            />

            <div className="flex gap-3">
              <select
                value={storyAuthor}
                onChange={(e) => setStoryAuthor(e.target.value)}
                className="w-1/2 bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Harshdeep Singh">Harshdeep Singh</option>
                <option value="Sarabjeet Singh">Sarabjeet Singh</option>
                <option value="Sandeep Singh">Sandeep Singh</option>
              </select>

              <div className="w-1/2 flex items-center gap-2 bg-[#09090B] border border-[#27272A] px-3 py-2 rounded-xl">
                <span className="text-[10px] text-[#A1A1AA]">Thumbnail:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => setThumbnailUrl(url))}
                  className="text-[10px] text-[#A1A1AA] w-full"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Short Summary / Teaser"
              value={storySummary}
              onChange={(e) => setStorySummary(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />

            {/* WYSIWYG Content Area */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[200px] bg-[#09090B] border border-[#27272A] rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#FFC800] overflow-y-auto"
            />

            <div className="flex flex-col gap-2 pt-3 border-t border-[#27272A]">
              <span className="text-[10px] font-extrabold text-[#FFC800] uppercase">🔍 SEO & Search Meta Tags</span>
              <input
                type="text"
                placeholder="Search Tags (comma separated)"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl active:scale-95 transition-all">
              {editingStoryId ? "UPDATE STORY 💾" : "PUBLISH STORY 🚀"}
            </button>
          </form>
        )}

        {/* TAB: MANAGE PUBLISHED STORIES */}
        {activeTab === "stories" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Published Short Stories ({config.stories.length})</h2>
            <div className="flex flex-col gap-3">
              {config.stories.map((story) => (
                <div key={story.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex justify-between items-center">
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-[10px] text-[#FFC800] font-bold">{story.author} • {story.date}</span>
                    <h3 className="text-sm font-black text-white">{story.title}</h3>
                    <p className="text-xs text-[#A1A1AA] line-clamp-1">{story.summary}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEditingStory(story)}
                      className="px-3 py-1.5 bg-[#FFC800] text-black text-xs font-bold rounded-xl"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteStory(story.id)}
                      className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-xl border border-red-500/30"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: FAN Q&A INBOX */}
        {activeTab === "inbox" && (
          <section className="bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Fan Question Inbox ({config.questions.length})</h2>
            
            <div className="flex flex-col gap-4">
              {config.questions.map((q) => (
                <div key={q.id} className="bg-[#09090B] border border-[#27272A] p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#FFC800]">👤 {q.fanName} <span className="text-[#A1A1AA] font-normal">asked {config.hosts[q.hostId]?.name || q.hostId}</span></span>
                    <span className="text-[10px] text-[#71717A]">{q.timestamp}</span>
                  </div>

                  <p className="text-xs text-white font-medium bg-[#141417] p-3 rounded-xl border border-[#27272A]">
                    "{q.question}"
                  </p>

                  {/* Host Reply Box */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#A1A1AA]">Host Reply:</label>
                    <textarea
                      rows={2}
                      defaultValue={q.answer}
                      onBlur={(e) => handleAnswerQuestion(q.id, e.target.value)}
                      placeholder="Write host response..."
                      className="bg-[#141417] border border-[#27272A] rounded-xl p-2.5 text-xs text-white outline-none focus:border-[#FFC800] resize-none"
                    />
                  </div>

                  {/* Publish Switch */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#27272A]">
                    <span className="text-[10px] text-[#A1A1AA]">
                      Status: <strong className={q.isApproved ? "text-green-400" : "text-yellow-400"}>{q.isApproved ? "Visible on Team Page" : "Hidden"}</strong>
                    </span>
                    <button
                      onClick={() => toggleQuestionApproval(q.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        q.isApproved ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#FFC800] text-black"
                      }`}
                    >
                      {q.isApproved ? "Hide Question" : "Approve & Publish ➔"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}