"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Fighter {
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  state: "idle" | "punch" | "kick" | "jump" | "block" | "hit";
  animFrame: number;
}

const HOSTS = [
  { id: "harshdeep", name: "Harshdeep", color: "#FFC800" },
  { id: "sarabjeet", name: "Sarabjeet", color: "#7000E0" },
  { id: "sandeep", name: "Sandeep", color: "#FF4500" },
];

export default function ArcadeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [playerHost, setPlayerHost] = useState(HOSTS[0]);
  const [opponentHost, setOpponentHost] = useState(HOSTS[1]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const gameState = useRef<{
    player: Fighter;
    ai: Fighter;
  }>({
    player: { name: "Harshdeep", color: "#FFC800", x: 60, y: 120, vx: 0, vy: 0, hp: 100, state: "idle", animFrame: 0 },
    ai: { name: "Sarabjeet", color: "#7000E0", x: 220, y: 120, vx: 0, vy: 0, hp: 100, state: "idle", animFrame: 0 },
  });

  const startGame = (p: typeof HOSTS[0], o: typeof HOSTS[0]) => {
    setPlayerHost(p);
    setOpponentHost(o);
    setWinner(null);

    gameState.current = {
      player: { name: p.name, color: p.color, x: 50, y: 120, vx: 0, vy: 0, hp: 100, state: "idle", animFrame: 0 },
      ai: { name: o.name, color: o.color, x: 230, y: 120, vx: 0, vy: 0, hp: 100, state: "idle", animFrame: 0 },
    };

    setGameStarted(true);
  };

  // Main 60FPS Game Loop
  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const p = gameState.current.player;
      const ai = gameState.current.ai;

      // Gravity & Physics
      if (p.y < 120) p.vy += 0.8;
      p.y += p.vy;
      if (p.y >= 120) { p.y = 120; p.vy = 0; if (p.state === "jump") p.state = "idle"; }

      if (ai.y < 120) ai.vy += 0.8;
      ai.y += ai.vy;
      if (ai.y >= 120) { ai.y = 120; ai.vy = 0; if (ai.state === "jump") ai.state = "idle"; }

      // Clear Screen (Octagon Ring Canvas)
      ctx.fillStyle = "#09090B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Floor / Ring Floor
      ctx.fillStyle = "#18181C";
      ctx.fillRect(0, 160, canvas.width, 40);
      ctx.strokeStyle = "#27272A";
      ctx.strokeRect(0, 160, canvas.width, 40);

      // Helper function to draw 8-bit Pixel Fighter Sprites
      const draw8BitFighter = (f: Fighter, isFacingRight: boolean) => {
        ctx.save();
        ctx.translate(f.x, f.y);

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(15, 42, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body Color (Turban/Head & Shorts Accent)
        ctx.fillStyle = f.color;
        ctx.fillRect(8, 0, 14, 10); // Head / Turban

        // Skin Tone
        ctx.fillStyle = "#E0A96D";
        ctx.fillRect(10, 10, 10, 8); // Face

        // MMA Shorts
        ctx.fillStyle = f.color;
        ctx.fillRect(8, 26, 14, 10);

        // Legs
        ctx.fillStyle = "#E0A96D";
        ctx.fillRect(10, 36, 4, 8);
        ctx.fillRect(16, 36, 4, 8);

        // Torso / Chest
        ctx.fillStyle = "#C88A4B";
        ctx.fillRect(8, 18, 14, 10);

        // Arms & Actions
        ctx.fillStyle = "#E0A96D";
        if (f.state === "punch") {
          ctx.fillRect(isFacingRight ? 18 : -8, 18, 16, 5); // Punch Arm Extended
        } else if (f.state === "kick") {
          ctx.fillStyle = "#E0A96D";
          ctx.fillRect(isFacingRight ? 18 : -10, 32, 16, 6); // Kick Leg Extended
        } else if (f.state === "block") {
          ctx.fillRect(isFacingRight ? 14 : 2, 14, 6, 12); // Guarding Arms
        } else {
          ctx.fillRect(4, 18, 5, 10); // Idle Arms
          ctx.fillRect(21, 18, 5, 10);
        }

        ctx.restore();
      };

      // Draw Player & AI
      draw8BitFighter(p, true);
      draw8BitFighter(ai, false);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [gameStarted]);

  // Action Handlers
  const handleAction = (action: "punch" | "kick" | "jump" | "block") => {
    const p = gameState.current.player;
    const ai = gameState.current.ai;

    if (action === "jump" && p.y === 120) {
      p.vy = -10;
      p.state = "jump";
    } else {
      p.state = action;
    }

    // Distance calculation for hits
    const distance = Math.abs(p.x - ai.x);

    if ((action === "punch" || action === "kick") && distance < 45) {
      if (ai.state !== "block") {
        ai.hp = Math.max(0, ai.hp - 12);
        ai.state = "hit";

        if (ai.hp <= 0) {
          setWinner(`${playerHost.name} KNOCKED OUT ${opponentHost.name}!`);
          setGameStarted(false);
          return;
        }
      }
    }

    // AI Counter Attack Logic
    setTimeout(() => {
      if (ai.hp > 0 && Math.random() > 0.4) {
        const dist = Math.abs(p.x - ai.x);
        if (dist < 45 && p.state !== "block") {
          p.hp = Math.max(0, p.hp - 10);
          p.state = "hit";

          if (p.hp <= 0) {
            setWinner(`${opponentHost.name} DEFEATED ${playerHost.name}!`);
            setGameStarted(false);
          }
        }
      }
      if (p.state !== "jump") p.state = "idle";
      if (ai.state !== "jump") ai.state = "idle";
    }, 300);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-mono select-none">
      <main className="w-full max-w-[440px] flex flex-col gap-5">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2 border-b border-[#27272A]">
          <Link href="/" className="flex items-center gap-1.5 no-underline">
            <span className="text-base font-bold text-[#FFC800]">SAADE AALA</span>
            <span className="text-base text-white">ARCADE</span>
          </Link>
          <Link
            href="/"
            className="text-[10px] font-bold text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full bg-white/5"
          >
            ← EXIT
          </Link>
        </header>

        {/* CHARACTER SELECTION */}
        {!gameStarted && !winner && (
          <section className="flex flex-col gap-4 bg-[#141417] border border-[#27272A] p-5 rounded-2xl text-center">
            <div className="inline-block mx-auto px-3 py-1 rounded-full text-[10px] font-bold text-[#FFC800] bg-[#FFC800]/10 border border-[#FFC800]/20">
              🥊 BENCHMARK MMA EDITION
            </div>

            <h1 className="text-sm font-bold text-white">Select Fighter & Opponent</h1>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-[#A1A1AA]">Your Host:</span>
              <div className="grid grid-cols-3 gap-2">
                {HOSTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setPlayerHost(h)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      playerHost.id === h.id ? "border-[#FFC800] bg-[#FFC800]/20 scale-105" : "border-[#27272A] bg-[#09090B]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: h.color }}>
                      {h.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-white">{h.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-[#A1A1AA]">AI Opponent:</span>
              <div className="grid grid-cols-3 gap-2">
                {HOSTS.filter(h => h.id !== playerHost.id).map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setOpponentHost(h)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      opponentHost.id === h.id ? "border-[#FF0000] bg-[#FF0000]/20 scale-105" : "border-[#27272A] bg-[#09090B]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: h.color }}>
                      {h.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-white">{h.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => startGame(playerHost, opponentHost)}
              className="mt-2 w-full py-3 bg-[#FFC800] text-black font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              ⚔️ ENTER OCTAGON
            </button>
          </section>
        )}

        {/* WINNER SCREEN */}
        {winner && (
          <div className="bg-[#141417] border-2 border-[#FFC800] p-6 rounded-2xl text-center flex flex-col gap-4">
            <span className="text-2xl">🏆</span>
            <h2 className="text-sm font-extrabold text-white">{winner}</h2>
            <button
              onClick={() => setWinner(null)}
              className="w-full py-3 bg-[#FFC800] text-black font-bold text-xs rounded-xl"
            >
              🔄 FIGHT AGAIN
            </button>
          </div>
        )}

        {/* 60FPS CANVAS ARENA */}
        {gameStarted && (
          <div className="flex flex-col gap-4">
            
            {/* Health Bars */}
            <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span style={{ color: playerHost.color }}>{playerHost.name}</span>
                <span style={{ color: opponentHost.color }}>{opponentHost.name}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#09090B] h-3 rounded-full overflow-hidden border border-[#27272A]">
                  <div
                    className="h-full transition-all duration-200"
                    style={{ width: `${gameState.current.player.hp}%`, backgroundColor: playerHost.color }}
                  />
                </div>
                <div className="flex-1 bg-[#09090B] h-3 rounded-full overflow-hidden border border-[#27272A]">
                  <div
                    className="h-full transition-all duration-200"
                    style={{ width: `${gameState.current.ai.hp}%`, backgroundColor: opponentHost.color }}
                  />
                </div>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full aspect-[4/3] bg-black rounded-2xl border-2 border-[#27272A] overflow-hidden flex items-center justify-center shadow-2xl">
              <canvas
                ref={canvasRef}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Arcade Controls */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction("punch")}
                className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
              >
                👊 PUNCH
              </button>
              <button
                onClick={() => handleAction("kick")}
                className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
              >
                🦶 KICK
              </button>
              <button
                onClick={() => handleAction("jump")}
                className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
              >
                🦘 JUMP
              </button>
              <button
                onClick={() => handleAction("block")}
                className="py-3 bg-[#141417] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-[#FFC800] active:scale-95"
              >
                🛡️ BLOCK
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}