"use client";

import Link from "next/link";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface Story {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  content: string;
  accentColor: string;
  comments: Comment[];
}

const INITIAL_STORIES: Story[] = [
  {
    id: "sirsa-incident",
    title: "The Unfiltered Truth Behind The Sirsa Trip",
    author: "Harshdeep Singh",
    date: "JUL 20, 2026",
    readTime: "3 min read",
    thumbnail: "🚘",
    summary: "We thought it was just a 2-hour drive. 14 hours later, we were stranded with no battery, a mysterious dhaba owner, and Sarabjeet losing his mind.",
    content: "It all started when Sandeep said 'Short cut pata hai mujhe'. That sentence alone has caused 90% of our life problems. By 11 PM, the GPS was completely dead, the road turned into gravel, and we found ourselves at a roadside dhaba where the tea tasted like motor oil. Sarabjeet spent 45 minutes arguing with a goat while Harshdeep tried to livestream on 1% battery. Look out for Episode 42 where we dive deep into this insanity!",
    accentColor: "#FFC800",
    comments: [
      {
        id: "c1",
        author: "Aman_Mohali",
        text: "Sandeep's shortcuts need to be banned by supreme court 😂",
        timestamp: "2 hours ago",
        likes: 12,
      },
      {
        id: "c2",
        author: "Gurpreet_S",
        text: "Part 2 of this story in podcast was hilarious!",
        timestamp: "5 hours ago",
        likes: 8,
      },
    ],
  },
  {
    id: "mic-disaster",
    title: "When The Recording Studio Flooded Mid-Episode",
    author: "Sarabjeet Singh",
    date: "JUL 12, 2026",
    readTime: "2 min read",
    thumbnail: "🎙️",
    summary: "A heavy monsoon downpour, a leaking roof right above the soundboard, and why Sandeep kept recording while sitting on a plastic chair on top of a table.",
    content: "We were 30 minutes into recording a guest episode when water started dripping directly onto Harshdeep's laptop. Instead of stopping, Sandeep grabbed an umbrella, held it over the mixer, and screamed 'Keep talking, the audio is fire!'. That's why you can hear thunder and water splashing in the background of Episode 38.",
    accentColor: "#7000E0",
    comments: [
      {
        id: "c3",
        author: "Simran_K",
        text: "Sandeep holding an umbrella over the audio mixer is peak commitment ☔",
        timestamp: "1 day ago",
        likes: 19,
      },
    ],
  },
];

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Comment state
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Story Editor Modal state
  const [showEditor, setShowEditor] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorAuthor, setEditorAuthor] = useState("Harshdeep Singh");
  const [editorSummary, setEditorSummary] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStory || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: newCommentAuthor.trim() || "Anonymous Listener",
      text: newCommentText.trim(),
      timestamp: "Just now",
      likes: 0,
    };

    const updatedStories = stories.map((s) => {
      if (s.id === selectedStory.id) {
        return { ...s, comments: [newComment, ...s.comments] };
      }
      return s;
    });

    setStories(updatedStories);
    setSelectedStory({
      ...selectedStory,
      comments: [newComment, ...selectedStory.comments],
    });
    setNewCommentText("");
    setNewCommentAuthor("");
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorTitle.trim() || !editorContent.trim()) return;

    const newStory: Story = {
      id: `story-${Date.now()}`,
      title: editorTitle,
      author: editorAuthor,
      date: "JUST NOW",
      readTime: "2 min read",
      thumbnail: "📝",
      summary: editorSummary || editorContent.slice(0, 90) + "...",
      content: editorContent,
      accentColor: "#10B981",
      comments: [],
    };

    setStories([newStory, ...stories]);
    setShowEditor(false);
    setEditorTitle("");
    setEditorSummary("");
    setEditorContent("");
    alert("✨ Story published successfully!");
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#FFC800] selection:text-black">
      <main className="w-full max-w-[440px] flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-black tracking-tighter text-[#FFC800]">
              SAADE AALA
            </span>
            <span className="text-xl font-light tracking-widest text-white">
              RADIO
            </span>
          </Link>
          <Link
            href="/"
            className="text-[10px] font-semibold tracking-wider text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5 hover:border-[#FFC800] hover:text-[#FFC800] transition-colors"
          >
            ← HOME
          </Link>
        </header>

        {/* --- PAGE BANNER & WRITE BUTTON --- */}
        <section className="flex justify-between items-end border-b border-[#27272A] pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20 mb-1">
              📖 BACKSTAGE & TALES
            </div>
            <h1 className="text-lg font-black text-white">Short Stories & Blogs</h1>
          </div>
          <button
            onClick={() => setShowEditor(true)}
            className="px-3 py-1.5 bg-[#FFC800] text-black font-extrabold text-[11px] rounded-xl active:scale-95 transition-all shadow-md"
          >
            + WRITE STORY
          </button>
        </section>

        {/* --- STORIES LIST VIEW --- */}
        {!selectedStory && (
          <section className="flex flex-col gap-4">
            {stories.map((story) => (
              <article
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-[#141417] border border-[#27272A] hover:border-[#FFC800]/50 p-4 rounded-2xl flex flex-col gap-3 cursor-pointer transition-all active:scale-[0.98] group shadow-lg"
              >
                {/* Thumbnail & Meta */}
                <div className="flex gap-3 items-start">
                  <div className="w-16 h-16 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {story.thumbnail}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#FFC800] tracking-wider uppercase">
                      {story.author} • {story.readTime}
                    </span>
                    <h2 className="text-sm font-black text-white group-hover:text-[#FFC800] transition-colors leading-snug truncate">
                      {story.title}
                    </h2>
                    <p className="text-[11px] text-[#A1A1AA] line-clamp-2 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="flex justify-between items-center text-[10px] text-[#71717A] pt-2 border-t border-white/5 font-mono">
                  <span>{story.date}</span>
                  <span className="text-[#FFC800] font-bold">
                    💬 {story.comments.length} Comments ➔
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* --- SINGLE STORY DETAILED VIEW --- */}
        {selectedStory && (
          <section className="flex flex-col gap-5 animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedStory(null)}
              className="self-start text-xs font-bold text-[#FFC800] hover:underline flex items-center gap-1"
            >
              ← BACK TO ALL STORIES
            </button>

            <article className="bg-[#141417] border border-[#27272A] p-5 rounded-3xl flex flex-col gap-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-2xl">
                  {selectedStory.thumbnail}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#FFC800] uppercase">
                    By {selectedStory.author}
                  </span>
                  <h1 className="text-base font-black text-white leading-tight">
                    {selectedStory.title}
                  </h1>
                  <span className="text-[10px] text-[#71717A]">
                    {selectedStory.date} • {selectedStory.readTime}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#D4D4D8] leading-relaxed border-t border-b border-[#27272A] py-4 whitespace-pre-line">
                {selectedStory.content}
              </div>

              {/* Comments Thread Section */}
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="text-xs font-black text-white tracking-wider uppercase">
                  💬 Community Discussion ({selectedStory.comments.length})
                </h3>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="flex flex-col gap-2 bg-[#09090B] p-3 rounded-2xl border border-[#27272A]">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Join the discussion or drop a reaction..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="bg-[#141417] border border-[#27272A] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFC800] resize-none"
                  />
                  <button
                    type="submit"
                    className="self-end px-4 py-1.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl active:scale-95 transition-transform"
                  >
                    POST COMMENT 💬
                  </button>
                </form>

                {/* Existing Comments */}
                <div className="flex flex-col gap-2 mt-1">
                  {selectedStory.comments.length === 0 ? (
                    <p className="text-[11px] text-[#71717A] text-center py-2">
                      No comments yet. Be the first to start the conversation!
                    </p>
                  ) : (
                    selectedStory.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[#09090B] border border-[#27272A] p-3 rounded-xl flex flex-col gap-1"
                      >
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-[#FFC800]">
                            👤 {comment.author}
                          </span>
                          <span className="text-[#71717A]">{comment.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#E4E4E7]">
                          {comment.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </article>
          </section>
        )}

        {/* --- STORY EDITOR MODAL --- */}
        {showEditor && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4">
            <div className="w-full max-w-[400px] bg-[#141417] border border-[#27272A] rounded-3xl p-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">
                  ✍️ Write Short Story / Blog
                </h3>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-xs font-bold text-[#A1A1AA] hover:text-white"
                >
                  ✕ CLOSE
                </button>
              </div>

              <form onSubmit={handleCreateStory} className="flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder="Story Title (e.g. Behind The Scenes Ep 5)"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                />
                
                <select
                  value={editorAuthor}
                  onChange={(e) => setEditorAuthor(e.target.value)}
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                >
                  <option value="Harshdeep Singh">Harshdeep Singh</option>
                  <option value="Sarabjeet Singh">Sarabjeet Singh</option>
                  <option value="Sandeep Singh">Sandeep Singh</option>
                  <option value="Community Writer">Community Writer</option>
                </select>

                <input
                  type="text"
                  placeholder="Short Summary / Teaser"
                  value={editorSummary}
                  onChange={(e) => setEditorSummary(e.target.value)}
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800]"
                />

                <textarea
                  rows={5}
                  required
                  placeholder="Write your story content here..."
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFC800] resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  PUBLISH STORY 🚀
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- FOOTER SECTION --- */}
        <footer className="mt-4 pt-6 border-t border-[#27272A] flex flex-col items-center gap-5 text-center">
          <div className="w-24 h-24 aspect-square rounded-2xl bg-[#141417] border-2 border-dashed border-[#27272A] flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-mono text-[#FFC800] font-bold">500 x 500</span>
            <span className="text-[9px] text-[#A1A1AA]">LOGO HERE</span>
          </div>

          <nav className="flex items-center justify-center gap-4 text-xs font-semibold text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#FFC800] transition-colors">
              Home
            </Link>
            <Link href="/team" className="hover:text-[#FFC800] transition-colors">
              Team
            </Link>
            <Link href="/game" className="hover:text-[#FFC800] transition-colors">
              Game
            </Link>
            <Link href="/stories" className="text-[#FFC800] font-bold">
              Stories
            </Link>
          </nav>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-[#A1A1AA]">
              Contact us:{" "}
              <a
                href="mailto:saadeaalaradio@gmail.com"
                className="text-white hover:text-[#FFC800] transition-colors underline font-medium"
              >
                saadeaalaradio@gmail.com
              </a>
            </p>
            <p className="text-[10px] text-[#52525B] tracking-wide pt-1">
              Created by <span className="text-[#A1A1AA] font-bold">Creative Benchers</span>
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}