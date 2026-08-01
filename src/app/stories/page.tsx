"use client";

import { useState, useEffect } from "react";

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

export interface Comment {
  id: string;
  storyId: string;
  userName: string;
  text: string;
  timestamp: string;
}

const DEFAULT_STORIES: StoryPost[] = [
  {
    id: "story-1",
    title: "The Unfiltered Truth Behind The Sirsa Trip",
    author: "Harshdeep Singh",
    date: "JUL 20, 2026",
    readTime: "3 min read",
    thumbnailUrl: "/logo-placeholder.png",
    summary:
      "We thought it was a simple 2-hour drive. 14 hours later we were stranded in Sirsa with no phone battery, a flat tire, and zero regrets.",
    contentHtml: `
      <h2>The Great Shortcut Disaster</h2>
      <p>It all started when Sandeep looked up from his phone and uttered the five most dangerous words in Punjabi podcasting: <strong>"Mennu shortcut pata hai."</strong></p>
      <p>Two hours into what was supposed to be a straightforward highway drive to Sirsa, we found ourselves on a dirt tractor trail with zero cell coverage. Sarabjeet was already threatening to walk back to Mohali on foot.</p>
      <h3>When the Car Gave Up</h3>
      <p>By midnight, the fuel light had been blinking for 45 minutes. We pulled over near an old tube well, killed the ignition, and sat in dead silence—until Harshdeep started recording a voice note for the podcast intro.</p>
      <p>The lesson? Never let Sandeep navigate, always carry extra power banks, and always keep the mic running because the funniest moments happen when everything goes wrong.</p>
    `,
    seoTitle: "The Sirsa Trip Story - Saade Aala Radio",
    seoDescription:
      "Behind the scenes story of the crazy Sirsa trip by Saade Aala Radio hosts.",
    searchTags: ["sirsa", "travel", "comedy", "behind the scenes"],
  },
  {
    id: "story-2",
    title: "Why Microphones Always Fail At The Best Punchline",
    author: "Sarabjeet Singh",
    date: "JUL 15, 2026",
    readTime: "2 min read",
    thumbnailUrl: "/logo-placeholder.png",
    summary:
      "It is a universal law of studio recording: the exact second someone drops a legendary roast, the audio peaks or the mic cable cuts out.",
    contentHtml: `
      <h2>The Law of Podcast Murphy</h2>
      <p>We’ve recorded over 50 hours of unscripted banter, but if you ask the editor, 40% of our best comebacks live in audio purgatory.</p>
      <p>Last week during Episode #12, Sandeep was setting up a 5-minute roast. Just as he hit the punchline, Harshdeep bumped the XLR cable and muted the whole track. We tried re-enacting it, but real chaos can never be scripted twice!</p>
    `,
    seoTitle: "Studio Audio Fail - Saade Aala Radio",
    seoDescription:
      "Hilarious studio audio mishaps during Saade Aala Radio recordings.",
    searchTags: ["studio", "audio", "roast", "behind the scenes"],
  },
  {
    id: "story-3",
    title: "How We Came Up With The 'Ambala Kick' Special Move",
    author: "Sandeep Singh",
    date: "JUL 08, 2026",
    readTime: "4 min read",
    thumbnailUrl: "/logo-placeholder.png",
    summary:
      "The origin story of the iconic move featured in our 8-bit MMA Arcade mini-game.",
    contentHtml: `
      <h2>From Studio Debate to Arcade Move</h2>
      <p>People keep asking where the 'Ambala Kick' came from. It started during a heated debate about classic street fighter arcade games vs modern games.</p>
      <p>Harshdeep demonstrated a dramatic kick in the middle of the recording room, knocked over a studio light, and claimed it was a secret martial arts technique from Ambala. We immediately put it in the game!</p>
    `,
    seoTitle: "Ambala Kick Arcade Move Story",
    seoDescription:
      "The funny origin of the Ambala Kick move in Saade Aala Radio MMA game.",
    searchTags: ["mma", "arcade", "game", "stories"],
  },
];

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: "c-1",
    storyId: "story-1",
    userName: "Gurpreet_Ludhiana",
    text: "Sandeep's shortcuts are legendary 😂 Please tell me you recorded the audio at the tube well!",
    timestamp: "JUL 21, 2026",
  },
  {
    id: "c-2",
    storyId: "story-2",
    userName: "Simran_K",
    text: "Re-enacted comedy never hits the same! Raw audio cuts are the best.",
    timestamp: "JUL 16, 2026",
  },
];

export default function StoriesPage() {
  const [stories, setStories] = useState<StoryPost[]>(DEFAULT_STORIES);
  const [comments, setComments] = useState<Comment[]>(DEFAULT_COMMENTS);
  const [selectedFilter, setSelectedFilter] = useState<string>("Newest First");

  // Reader Modal State
  const [activeStory, setActiveStory] = useState<StoryPost | null>(null);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Load from CMS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("saade_aala_cms_config");
      if (saved) {
        try {
          const config = JSON.parse(saved);
          if (
            config.stories &&
            Array.isArray(config.stories) &&
            config.stories.length > 0
          ) {
            setStories(config.stories);
          }
        } catch (e) {
          console.error("Failed to parse config", e);
        }
      }
    }
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeStory) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      storyId: activeStory.id,
      userName: commentName.trim() || "Anonymous Reader",
      text: commentText.trim(),
      timestamp: "Just now",
    };

    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentText("");
  };

  // Filtering & Sorting Logic
  const getFilteredAndSortedStories = () => {
    let result = [...stories];

    // Filter by Author if Harsh, Sarab, or Sandeep is selected
    if (selectedFilter === "Harsh") {
      result = result.filter((s) =>
        s.author.toLowerCase().includes("harshdeep")
      );
    } else if (selectedFilter === "Sarab") {
      result = result.filter((s) =>
        s.author.toLowerCase().includes("sarabjeet")
      );
    } else if (selectedFilter === "Sandeep") {
      result = result.filter((s) =>
        s.author.toLowerCase().includes("sandeep")
      );
    }

    // "Newest First" or default reverse chronological sort
    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const displayedStories = getFilteredAndSortedStories();

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      {/* PAGE HERO */}
      <section className="max-w-[1100px] mx-auto px-4 md:px-8 pt-8 md:pt-12 text-center flex flex-col items-center gap-3">
        <span className="text-[10px] md:text-xs font-black text-[#FFC800] uppercase tracking-widest bg-[#FFC800]/10 border border-[#FFC800]/20 px-3 py-1 rounded-full">
          UNFILTERED STUDIO CHRONICLES
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white">
          Short Stories & Blogs
        </h1>
        <p className="text-xs md:text-sm text-[#A1A1AA] max-w-[550px] leading-relaxed">
          Behind the scenes, wild road trip tales, roast transcripts, and studio
          stories written by the hosts.
        </p>

        {/* FILTER BAR */}
        <div className="flex gap-2 overflow-x-auto max-w-full py-3 scrollbar-none">
          {["Newest First", "All Authors", "Harsh", "Sarab", "Sandeep"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all shrink-0 ${
                  selectedFilter === filter
                    ? "bg-[#FFC800] text-black border-[#FFC800] shadow-md"
                    : "bg-[#141417] text-[#A1A1AA] border-[#27272A] hover:border-[#FFC800]"
                }`}
              >
                {filter === "Newest First" ? "⚡ Newest First" : filter}
              </button>
            )
          )}
        </div>
      </section>

      {/* STORY CARDS GRID */}
      <section className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="bg-[#141417] border border-[#27272A] hover:border-[#FFC800]/60 p-5 rounded-3xl flex flex-col justify-between gap-4 cursor-pointer transition-all hover:-translate-y-1 shadow-xl group"
          >
            <div className="flex flex-col gap-3">
              {/* Thumbnail Container */}
              <div className="aspect-video w-full bg-[#09090B] border border-[#27272A] rounded-2xl overflow-hidden relative flex items-center justify-center">
                <img
                  src={story.thumbnailUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                  <span className="text-2xl mb-1">📖</span>
                  <span className="text-[10px] font-black text-[#FFC800] uppercase">
                    STORY THUMBNAIL
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#FFC800] font-bold">
                <span>✍️ {story.author}</span>
                <span className="text-[#71717A]">
                  {story.date} • {story.readTime}
                </span>
              </div>

              <h2 className="text-base font-black text-white group-hover:text-[#FFC800] transition-colors leading-snug">
                {story.title}
              </h2>

              <p className="text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                {story.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-[#27272A] flex justify-between items-center text-xs font-bold text-[#FFC800]">
              <span>Read Full Story ➔</span>
              <span className="text-[10px] text-[#A1A1AA]">
                💬 {comments.filter((c) => c.storyId === story.id).length}{" "}
                Comments
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* FULL ARTICLE READER MODAL */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-[650px] max-h-[85vh] bg-[#141417] border border-[#27272A] rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#27272A] pb-4">
              <div className="flex flex-col gap-1 pr-4">
                <span className="text-xs font-bold text-[#FFC800] uppercase">
                  ✍️ {activeStory.author} • {activeStory.date}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {activeStory.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="text-xs font-bold text-[#A1A1AA] bg-[#09090B] border border-[#27272A] px-3 py-1.5 rounded-xl shrink-0"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Story Content HTML */}
            <div
              className="prose prose-invert prose-xs md:prose-sm max-w-none text-xs md:text-sm text-[#D4D4D8] leading-relaxed flex flex-col gap-3 [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-[#FFC800] [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-white [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: activeStory.contentHtml }}
            />

            {/* Search Tags */}
            {activeStory.searchTags && activeStory.searchTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#27272A]">
                {activeStory.searchTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold text-[#A1A1AA] bg-[#09090B] border border-[#27272A] px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments Thread */}
            <div className="pt-4 border-t border-[#27272A] flex flex-col gap-4">
              <h3 className="text-sm font-black text-white">
                Community Discussion
              </h3>

              <form onSubmit={handleAddComment} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#FFC800]"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Leave a comment on this story..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#FFC800] resize-none"
                />
                <button
                  type="submit"
                  className="py-2 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl self-end px-5 shadow-md"
                >
                  POST COMMENT 💬
                </button>
              </form>

              <div className="flex flex-col gap-2.5 mt-2">
                {comments
                  .filter((c) => c.storyId === activeStory.id)
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-[#09090B] border border-[#27272A] p-3 rounded-xl flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-[#FFC800]">
                          👤 {comment.userName}
                        </span>
                        <span className="text-[#71717A]">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#D4D4D8]">{comment.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}