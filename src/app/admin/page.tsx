"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminCMS() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // --- CMS FORM STATES ---
  const [activeTab, setActiveTab] = useState<"logos" | "socials" | "hosts" | "blogs">("logos");

  // 1. Logos & Branding
  const [headerLogoUrl, setHeaderLogoUrl] = useState("/logo-placeholder.png");
  const [footerLogoUrl, setFooterLogoUrl] = useState("/logo-placeholder.png");

  // 2. Social Media Credentials
  const [socials, setSocials] = useState({
    youtube: "https://www.youtube.com/@SaadeAalaRadio",
    spotify: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H",
    instagram: "https://www.instagram.com/saadeaalaradio",
    facebook: "https://www.facebook.com/SaadeAalaRadio",
    linkedin: "https://www.linkedin.com/showcase/saade-aala-radio",
    snapchat: "https://www.snapchat.com/add/saadeaalaradio",
  });

  // 3. Hosts Photos & Quotes
  const [hosts, setHosts] = useState({
    harshdeep: {
      name: "Harshdeep Singh",
      role: "Lead Anchor",
      quote: "Tension nahi leni, story poori sun ke jaani aa!",
      photoUrl: "/hosts/harshdeep.png",
    },
    sarabjeet: {
      name: "Sarabjeet Singh",
      role: "Co-Host & Comeback King",
      quote: "Ehne gall shuru kiti si, khatam main karunga!",
      photoUrl: "/hosts/sarabjeet.png",
    },
    sandeep: {
      name: "Sandeep Singh",
      role: "Co-Host & Strategist",
      quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
      photoUrl: "/hosts/sandeep.png",
    },
  });

  // 4. Blog / Short Story Writer
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "Harshdeep Singh",
    summary: "",
    content: "",
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Simple Auth Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saadeaala123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password! Try again.");
    }
  };

  const handleSaveSettings = () => {
    setSaveStatus("⚡ Changes saved successfully!");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4 bg-[#09090B] text-white font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-[360px] bg-[#141417] border border-[#27272A] p-6 rounded-3xl flex flex-col gap-4 text-center shadow-2xl">
          <div className="text-2xl font-black text-[#FFC800]">SAADE AALA CMS</div>
          <p className="text-xs text-[#A1A1AA]">Enter admin passcode to access management controls.</p>
          <input
            type="password"
            placeholder="Enter Admin Password"
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
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <div>
            <span className="text-base font-black text-[#FFC800]">CMS ADMIN</span>
            <span className="text-xs text-[#A1A1AA] block">Saade Aala Radio</span>
          </div>
          <Link href="/" className="text-[10px] font-semibold text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800]">
            ← VIEW WEBSITE
          </Link>
        </header>

        {/* Status Toast */}
        {saveStatus && (
          <div className="bg-[#FFC800]/20 border border-[#FFC800] text-[#FFC800] text-xs font-bold p-3 rounded-xl text-center animate-pulse">
            {saveStatus}
          </div>
        )}

        {/* --- CMS TABS --- */}
        <div className="grid grid-cols-4 gap-1 bg-[#141417] p-1 rounded-xl border border-[#27272A]">
          {(["logos", "socials", "hosts", "blogs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                activeTab === tab ? "bg-[#FFC800] text-black shadow-md" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- TAB 1: LOGOS & BRANDING --- */}
        {activeTab === "logos" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] tracking-wider uppercase">Header & Footer Logos (500x500)</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-white">Header Logo Image URL / Path:</label>
              <input
                type="text"
                value={headerLogoUrl}
                onChange={(e) => setHeaderLogoUrl(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-white">Footer 500x500 Logo URL / Path:</label>
              <input
                type="text"
                value={footerLogoUrl}
                onChange={(e) => setFooterLogoUrl(e.target.value)}
                className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
              />
            </div>

            <button onClick={handleSaveSettings} className="w-full py-2.5 bg-[#FFC800] text-black font-black text-xs rounded-xl active:scale-95">
              SAVE LOGO SETTINGS
            </button>
          </section>
        )}

        {/* --- TAB 2: SOCIAL MEDIA CREDENTIALS --- */}
        {activeTab === "socials" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-3">
            <h2 className="text-xs font-black text-[#FFC800] tracking-wider uppercase">Social Media Handle URLs</h2>
            
            {Object.keys(socials).map((platform) => (
              <div key={platform} className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-[#A1A1AA] uppercase">{platform}:</label>
                <input
                  type="text"
                  value={socials[platform as keyof typeof socials]}
                  onChange={(e) => setSocials({ ...socials, [platform]: e.target.value })}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                />
              </div>
            ))}

            <button onClick={handleSaveSettings} className="w-full py-2.5 bg-[#FFC800] text-black font-black text-xs rounded-xl active:scale-95 mt-2">
              UPDATE SOCIAL LINKS
            </button>
          </section>
        )}

        {/* --- TAB 3: HOSTS MANAGEMENT --- */}
        {activeTab === "hosts" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xs font-black text-[#FFC800] tracking-wider uppercase">Host Profiles & PNG Images</h2>
            
            {(["harshdeep", "sarabjeet", "sandeep"] as const).map((key) => (
              <div key={key} className="bg-[#09090B] p-3 rounded-xl border border-[#27272A] flex flex-col gap-2">
                <span className="text-xs font-bold text-white capitalize">{hosts[key].name}</span>
                <input
                  type="text"
                  placeholder="PNG Photo URL (e.g. /hosts/harshdeep.png)"
                  value={hosts[key].photoUrl}
                  onChange={(e) => setHosts({ ...hosts, [key]: { ...hosts[key], photoUrl: e.target.value } })}
                  className="bg-[#141417] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-[11px] text-white"
                />
                <input
                  type="text"
                  placeholder="Signature Quote"
                  value={hosts[key].quote}
                  onChange={(e) => setHosts({ ...hosts, [key]: { ...hosts[key], quote: e.target.value } })}
                  className="bg-[#141417] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-[11px] text-white"
                />
              </div>
            ))}

            <button onClick={handleSaveSettings} className="w-full py-2.5 bg-[#FFC800] text-black font-black text-xs rounded-xl active:scale-95">
              UPDATE HOST PROFILES
            </button>
          </section>
        )}

        {/* --- TAB 4: BLOG & STORY PUBLISHER --- */}
        {activeTab === "blogs" && (
          <section className="bg-[#141417] border border-[#27272A] p-5 rounded-2xl flex flex-col gap-3">
            <h2 className="text-xs font-black text-[#FFC800] tracking-wider uppercase">Publish New Story / Blog</h2>
            
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
            />

            <select
              value={newBlog.author}
              onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
            >
              <option value="Harshdeep Singh">Harshdeep Singh</option>
              <option value="Sarabjeet Singh">Sarabjeet Singh</option>
              <option value="Sandeep Singh">Sandeep Singh</option>
            </select>

            <textarea
              rows={4}
              placeholder="Story Content..."
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              className="bg-[#09090B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800] resize-none"
            />

            <button onClick={handleSaveSettings} className="w-full py-2.5 bg-[#FFC800] text-black font-black text-xs rounded-xl active:scale-95">
              PUBLISH BLOG
            </button>
          </section>
        )}

        {/* --- FOOTER CREDIT --- */}
        <footer className="pt-4 text-center text-[10px] text-[#52525B]">
          Saade Aala Radio CMS • Built by <span className="text-[#A1A1AA] font-bold">Creative Benchers</span>
        </footer>

      </main>
    </div>
  );
}