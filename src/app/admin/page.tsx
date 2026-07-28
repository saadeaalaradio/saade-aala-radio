"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { initialSiteConfig, HostProfile, SocialLink, StoryPost } from "../../lib/siteData";

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"logos" | "socials" | "hosts" | "editor">("logos");
  
  const [config, setConfig] = useState(initialSiteConfig);
  const [saveMessage, setSaveMessage] = useState("");

  // Editor State
  const editorRef = useRef<HTMLDivElement>(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyAuthor, setStoryAuthor] = useState("Harshdeep Singh");
  const [storySummary, setStorySummary] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [searchTags, setSearchTags] = useState("");

  // Simple Auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const triggerSave = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Image Helper
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Rich Text Commands
  const formatText = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const insertTable = () => {
    const rows = prompt("Number of rows:", "2");
    const cols = prompt("Number of columns:", "2");
    if (!rows || !cols) return;

    let tableHtml = `<table style="width:100%; border-collapse:collapse; margin:10px 0; border:1px solid #27272A;">`;
    for (let i = 0; i < parseInt(rows); i++) {
      tableHtml += `<tr>`;
      for (let j = 0; j < parseInt(cols); j++) {
        tableHtml += `<td style="border:1px solid #27272A; padding:8px; text-align:left;">Cell</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</table><br/>`;
    formatText("insertHTML", tableHtml);
  };

  const insertLink = () => {
    const url = prompt("Enter Link URL:", "https://");
    if (url) formatText("createLink", url);
  };

  const insertInlineImage = () => {
    const url = prompt("Enter Image URL or upload via URL:", "https://");
    if (url) formatText("insertImage", url);
  };

  // Publish Story
  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    const contentHtml = editorRef.current?.innerHTML || "";

    if (!storyTitle || !contentHtml) {
      alert("Please provide at least a title and content for the story.");
      return;
    }

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

    setConfig({ ...config, stories: [newPost, ...config.stories] });
    triggerSave("✨ Story & Blog published with SEO Tags!");

    // Reset Form
    setStoryTitle("");
    setStorySummary("");
    setThumbnailUrl("");
    setSeoTitle("");
    setSeoDescription("");
    setSearchTags("");
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 bg-[#09090B] text-white font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-[360px] bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 text-center shadow-2xl">
          <div className="text-2xl font-black text-[#FFC800]">SAADE AALA CMS</div>
          <p className="text-xs text-[#A1A1AA]">Enter admin passcode to manage website content.</p>
          <input
            type="password"
            placeholder="Enter Admin Passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC800]"
          />
          <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl active:scale-95 transition-all">
            UNLOCK DASHBOARD 🔐
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans">
      <main className="w-full max-w-[480px] flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <div>
            <span className="text-base font-black text-[#FFC800]">SAADE AALA CMS</span>
            <span className="text-[10px] text-[#A1A1AA] block">Master Control Panel</span>
          </div>
          <Link href="/" className="text-[10px] font-semibold text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800]">
            ← VIEW LIVE SITE
          </Link>
        </header>

        {saveMessage && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center">
            {saveMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-[#141417] p-1 rounded-xl border border-[#27272A]">
          {(["logos", "socials", "hosts", "editor"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[10px] font-extrabold uppercase rounded-lg transition-all ${
                activeTab === tab ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: LOGO UPLOADS */}
        {activeTab === "logos" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-5">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Header & Footer Logo Uploads</h2>
            
            {/* Header Logo */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white">Header Logo Image</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-black border border-[#27272A] flex items-center justify-center overflow-hidden">
                  <img src={config.headerLogoUrl} alt="Header Preview" className="w-full h-full object-contain" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => setConfig({ ...config, headerLogoUrl: url }))}
                  className="text-xs text-[#A1A1AA] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:bg-[#FFC800] file:text-black file:font-bold"
                />
              </div>
            </div>

            {/* Footer Logo */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#27272A]">
              <label className="text-xs font-bold text-white">Footer 500x500 Logo Image</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-black border border-[#27272A] flex items-center justify-center overflow-hidden">
                  <img src={config.footerLogoUrl} alt="Footer Preview" className="w-full h-full object-contain" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => setConfig({ ...config, footerLogoUrl: url }))}
                  className="text-xs text-[#A1A1AA] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:bg-[#FFC800] file:text-black file:font-bold"
                />
              </div>
            </div>

            <button onClick={() => triggerSave("Header & Footer Logos Updated!")} className="w-full py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl">
              SAVE LOGOS
            </button>
          </section>
        )}

        {/* TAB 2: MAIN SOCIAL MEDIA LINKS */}
        {activeTab === "socials" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Saade Aala Radio Links</h2>

            {config.mainSocials.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => {
                    const updated = [...config.mainSocials];
                    updated[idx].platform = e.target.value;
                    setConfig({ ...config, mainSocials: updated });
                  }}
                  className="w-1/3 bg-[#09090B] border border-[#27272A] rounded-xl px-2.5 py-2 text-xs text-white"
                  placeholder="Platform"
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => {
                    const updated = [...config.mainSocials];
                    updated[idx].url = e.target.value;
                    setConfig({ ...config, mainSocials: updated });
                  }}
                  className="flex-1 bg-[#09090B] border border-[#27272A] rounded-xl px-2.5 py-2 text-xs text-white"
                  placeholder="URL"
                />
                <button
                  onClick={() => {
                    const updated = config.mainSocials.filter((_, i) => i !== idx);
                    setConfig({ ...config, mainSocials: updated });
                  }}
                  className="text-xs text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => setConfig({ ...config, mainSocials: [...config.mainSocials, { platform: "New Platform", url: "https://" }] })}
              className="py-2 bg-white/5 border border-dashed border-[#27272A] text-xs font-bold text-[#FFC800] rounded-xl"
            >
              + ADD NEW SOCIAL LINK
            </button>

            <button onClick={() => triggerSave("Social links updated!")} className="w-full py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl mt-2">
              SAVE SOCIAL LINKS
            </button>
          </section>
        )}

        {/* TAB 3: EDIT HOST PROFILES */}
        {activeTab === "hosts" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-6">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Host Profiles & Custom Socials</h2>

            {Object.keys(config.hosts).map((hostKey) => {
              const host = config.hosts[hostKey];
              return (
                <div key={hostKey} className="bg-[#09090B] p-4 rounded-2xl border border-[#27272A] flex flex-col gap-3">
                  <span className="text-xs font-extrabold text-[#FFC800] uppercase">{host.name}</span>

                  {/* Host Photo Upload */}
                  <div className="flex items-center gap-3">
                    <img src={host.photoUrl} alt={host.name} className="w-12 h-12 rounded-xl object-cover bg-black border border-[#27272A]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => {
                          const updated = { ...config.hosts };
                          updated[hostKey].photoUrl = url;
                          setConfig({ ...config, hosts: updated });
                        })
                      }
                      className="text-[10px] text-[#A1A1AA]"
                    />
                  </div>

                  <input
                    type="text"
                    value={host.role}
                    onChange={(e) => {
                      const updated = { ...config.hosts };
                      updated[hostKey].role = e.target.value;
                      setConfig({ ...config, hosts: updated });
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="Role"
                  />

                  <textarea
                    rows={2}
                    value={host.journey}
                    onChange={(e) => {
                      const updated = { ...config.hosts };
                      updated[hostKey].journey = e.target.value;
                      setConfig({ ...config, hosts: updated });
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white resize-none"
                    placeholder="Short Journey Paragraph"
                  />

                  <input
                    type="text"
                    value={host.quote}
                    onChange={(e) => {
                      const updated = { ...config.hosts };
                      updated[hostKey].quote = e.target.value;
                      setConfig({ ...config, hosts: updated });
                    }}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
                    placeholder="Signature Quote"
                  />
                </div>
              );
            })}

            <button onClick={() => triggerSave("Host profiles saved!")} className="w-full py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl">
              SAVE HOST PROFILES
            </button>
          </section>
        )}

        {/* TAB 4: ADVANCED STORY EDITOR WITH SEO TAGS */}
        {activeTab === "editor" && (
          <form onSubmit={handlePublishStory} className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] uppercase tracking-wider">Advanced Story Editor</h2>

            <input
              type="text"
              required
              placeholder="Story Title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#FFC800] outline-none"
            />

            <div className="flex gap-2">
              <select
                value={storyAuthor}
                onChange={(e) => setStoryAuthor(e.target.value)}
                className="w-1/2 bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Harshdeep Singh">Harshdeep Singh</option>
                <option value="Sarabjeet Singh">Sarabjeet Singh</option>
                <option value="Sandeep Singh">Sandeep Singh</option>
              </select>

              {/* Story Thumbnail Upload */}
              <div className="w-1/2 flex items-center gap-2 bg-[#09090B] border border-[#27272A] px-2 py-1 rounded-xl">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => setThumbnailUrl(url))}
                  className="text-[9px] text-[#A1A1AA] w-full"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Short Summary / Teaser"
              value={storySummary}
              onChange={(e) => setStorySummary(e.target.value)}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
            />

            {/* RICH TEXT TOOLBAR */}
            <div className="flex flex-wrap gap-1 bg-[#09090B] p-2 rounded-xl border border-[#27272A]">
              <button type="button" onClick={() => formatText("formatBlock", "<h2>")} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-white rounded hover:text-[#FFC800]">H2</button>
              <button type="button" onClick={() => formatText("formatBlock", "<h3>")} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-white rounded hover:text-[#FFC800]">H3</button>
              <button type="button" onClick={() => formatText("bold")} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-white rounded hover:text-[#FFC800]">B</button>
              <button type="button" onClick={() => formatText("italic")} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-white rounded hover:text-[#FFC800]">I</button>
              <button type="button" onClick={insertLink} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-[#FFC800] rounded">🔗 Link</button>
              <button type="button" onClick={insertInlineImage} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-[#FFC800] rounded">🖼️ Photo</button>
              <button type="button" onClick={insertTable} className="px-2 py-1 text-[10px] font-bold bg-[#141417] text-[#FFC800] rounded">📊 Table</button>
            </div>

            {/* WYSIWYG Editable Canvas */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[160px] bg-[#09090B] border border-[#27272A] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FFC800] overflow-y-auto"
            />

            {/* SEO & SEARCH TAGS BLOCK */}
            <div className="flex flex-col gap-2 pt-3 border-t border-[#27272A]">
              <span className="text-[10px] font-extrabold text-[#FFC800] uppercase">🔍 SEO & Search Meta Tags</span>
              
              <input
                type="text"
                placeholder="Meta SEO Title"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Meta Description"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Search Tags (comma separated, e.g. comedy, sirsa, podcast)"
                value={searchTags}
                onChange={(e) => setSearchTags(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl active:scale-95 transition-all">
              🚀 PUBLISH STORY WITH SEO TAGS
            </button>
          </form>
        )}

      </main>
    </div>
  );
}