"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Retro Web Audio Synthesizer
const playSynthSound = (type: "punch" | "kick" | "block" | "jump" | "ko" | "special" | "lightning" | "fire") => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "punch") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "kick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "block") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === "jump") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "fire" || type === "special") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "lightning") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "ko") {
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.2);
      });
    }
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
};

interface VisualParticle {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  type?: "fire" | "lightning" | "normal";
}

interface Fighter {
  id: string;
  name: string;
  color: string;
  shirtColor: string;
  pantsColor: string;
  heightOffset: number; // Height adjustment
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  comboHits: number; // Tracks 3 consecutive hits for special unlock
  speed: number;
  state: "idle" | "punch" | "kick" | "jump" | "block" | "hit" | "special" | "walk";
  specialName: string;
}

const HOSTS = [
  {
    id: "harshdeep",
    name: "Harshdeep",
    color: "#FFC800",
    shirtColor: "#18181B", // Black shirt
    pantsColor: "#2563EB", // Blue pants
    heightOffset: -8,       // Tallest fighter
    speed: 3.5,
    special: "SUPER SANGRUR PUNCH",
  },
  {
    id: "sarabjeet",
    name: "Sarabjeet",
    color: "#7000E0",
    shirtColor: "#EAB308", // Yellow shirt
    pantsColor: "#09090B", // Black pants
    heightOffset: 2,        // Shorter fighter
    speed: 2.2,
    special: "JANDPUR JAB",
  },
  {
    id: "sandeep",
    name: "Sandeep",
    color: "#FF4500",
    shirtColor: "#FAFAFA", // White shirt
    pantsColor: "#D4A373", // Beige pants
    heightOffset: 2,        // Shorter fighter
    speed: 4.0,
    special: "AWESOME AMBALA KICK",
  },
];

export default function ArcadeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [playerHost, setPlayerHost] = useState(HOSTS[0]);
  const [opponentHost, setOpponentHost] = useState(HOSTS[1]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [screenShake, setScreenShake] = useState(false);

  const particles = useRef<VisualParticle[]>([]);

  const gameState = useRef<{
    player: Fighter;
    ai: Fighter;
  }>({
    player: {
      id: "harshdeep",
      name: "Harshdeep",
      color: "#FFC800",
      shirtColor: "#18181B",
      pantsColor: "#2563EB",
      heightOffset: -8,
      x: 40,
      y: 120,
      vx: 0,
      vy: 0,
      hp: 100,
      comboHits: 0,
      speed: 3.5,
      state: "idle",
      specialName: "SUPER SANGRUR PUNCH",
    },
    ai: {
      id: "sarabjeet",
      name: "Sarabjeet",
      color: "#7000E0",
      shirtColor: "#EAB308",
      pantsColor: "#09090B",
      heightOffset: 2,
      x: 230,
      y: 120,
      vx: 0,
      vy: 0,
      hp: 100,
      comboHits: 0,
      speed: 2.2,
      state: "idle",
      specialName: "JANDPUR JAB",
    },
  });

  const triggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 300);
  };

  const addParticle = (x: number, y: number, text: string, color: string, type: "fire" | "lightning" | "normal" = "normal") => {
    particles.current.push({ x, y, text, color, life: 35, type });
  };

  const startGame = (p: typeof HOSTS[0], o: typeof HOSTS[0]) => {
    setPlayerHost(p);
    setOpponentHost(o);
    setWinner(null);

    gameState.current = {
      player: {
        id: p.id,
        name: p.name,
        color: p.color,
        shirtColor: p.shirtColor,
        pantsColor: p.pantsColor,
        heightOffset: p.heightOffset,
        x: 40,
        y: 120 + p.heightOffset,
        vx: 0,
        vy: 0,
        hp: 100,
        comboHits: 0,
        speed: p.speed,
        state: "idle",
        specialName: p.special,
      },
      ai: {
        id: o.id,
        name: o.name,
        color: o.color,
        shirtColor: o.shirtColor,
        pantsColor: o.pantsColor,
        heightOffset: o.heightOffset,
        x: 230,
        y: 120 + o.heightOffset,
        vx: 0,
        vy: 0,
        hp: 100,
        comboHits: 0,
        speed: o.speed,
        state: "idle",
        specialName: o.special,
      },
    };

    setGameStarted(true);
  };

  // 60FPS Game Loop with Clever Reactive AI
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

      const groundLevelP = 120 + p.heightOffset;
      const groundLevelAI = 120 + ai.heightOffset;

      // Player Movement Bounds
      p.x += p.vx;
      if (p.x < 10) p.x = 10;
      if (p.x > ai.x - 22) p.x = ai.x - 22;

      // --- ADVANCED SMART AI LOGIC ---
      const dist = Math.abs(p.x - ai.x);

      // 1. AI Defends/Dodges when Player is attacking
      if ((p.state === "punch" || p.state === "kick" || p.state === "special") && dist < 48) {
        const aiDecision = Math.random();
        if (aiDecision > 0.4) {
          ai.state = "block"; // 60% chance to block player attack
        } else if (aiDecision > 0.25 && ai.y === groundLevelAI) {
          ai.vy = -10; // Jump dodge
          ai.state = "jump";
        }
      } else if (ai.state === "block" && p.state === "idle") {
        ai.state = "idle";
      }

      // 2. AI Adaptive Offensive Positioning
      if (ai.state !== "block") {
        if (ai.id === "harshdeep") {
          // Athletic: Stays out of range, steps in for quick snipes
          if (dist < 42 && Math.random() > 0.75) {
            ai.x += ai.speed; // Retreat
          } else if (dist > 55 && Math.random() > 0.8) {
            ai.x -= ai.speed; // Approach
          }
        } else if (ai.id === "sarabjeet") {
          // Heavy Tank: Holds center, slow pressure
          if (dist > 32 && Math.random() > 0.85) {
            ai.x -= ai.speed;
          }
        } else if (ai.id === "sandeep") {
          // Cunning: Fast dash-in, hit & jump-out
          if (dist > 35 && Math.random() > 0.7) {
            ai.x -= ai.speed;
          } else if (dist < 28 && Math.random() > 0.75) {
            ai.x += ai.speed * 1.2;
          }
        }
      }

      if (ai.x > 250) ai.x = 250;

      // Gravity Physics
      if (p.y < groundLevelP) p.vy += 0.8;
      p.y += p.vy;
      if (p.y >= groundLevelP) {
        p.y = groundLevelP;
        p.vy = 0;
        if (p.state === "jump") p.state = "idle";
      }

      if (ai.y < groundLevelAI) ai.vy += 0.8;
      ai.y += ai.vy;
      if (ai.y >= groundLevelAI) {
        ai.y = groundLevelAI;
        ai.vy = 0;
        if (ai.state === "jump") ai.state = "idle";
      }

      // Clear Arena Canvas
      ctx.fillStyle = "#09090B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Octagon Mat & Cage Line
      ctx.fillStyle = "#18181C";
      ctx.fillRect(0, 160, canvas.width, 40);
      ctx.strokeStyle = "#27272A";
      ctx.strokeRect(0, 160, canvas.width, 40);

      // Draw Pixel Fighter
      const drawFighter = (f: Fighter, isFacingRight: boolean) => {
        ctx.save();
        ctx.translate(f.x, f.y);

        // Height adjustment factor
        const torsoHeight = f.id === "harshdeep" ? 14 : 10;
        const legHeight = f.id === "harshdeep" ? 10 : 7;

        // Ground Shadow
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(15, 38 + legHeight, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Turban / Hair Accent
        ctx.fillStyle = f.color;
        ctx.fillRect(8, 0, 14, 10);

        // Skin Tone Face
        ctx.fillStyle = "#E0A96D";
        ctx.fillRect(10, 10, 10, 8);

        // Custom Shirt
        ctx.fillStyle = f.shirtColor;
        ctx.fillRect(8, 18, 14, torsoHeight);

        // Custom Pants
        ctx.fillStyle = f.pantsColor;
        ctx.fillRect(8, 18 + torsoHeight, 14, 8);

        // Legs
        ctx.fillStyle = "#E0A96D";
        ctx.fillRect(10, 26 + torsoHeight, 4, legHeight);
        ctx.fillRect(16, 26 + torsoHeight, 4, legHeight);

        // Action Frames (Arms)
        ctx.fillStyle = "#E0A96D";
        if (f.state === "punch") {
          ctx.fillRect(isFacingRight ? 18 : -8, 18, 16, 5);
        } else if (f.state === "kick") {
          ctx.fillRect(isFacingRight ? 18 : -10, 24 + torsoHeight, 16, 6);
        } else if (f.state === "special") {
          ctx.fillStyle = f.id === "sandeep" ? "#00E5FF" : "#FFC800";
          ctx.fillRect(isFacingRight ? 18 : -16, 14, 24, 14);
        } else if (f.state === "block") {
          ctx.fillRect(isFacingRight ? 14 : 2, 14, 6, 12);
        } else {
          ctx.fillRect(4, 18, 5, 10);
          ctx.fillRect(21, 18, 5, 10);
        }

        ctx.restore();
      };

      drawFighter(p, true);
      drawFighter(ai, false);

      // Render FX Particles
      particles.current.forEach((part, index) => {
        ctx.fillStyle = part.color;
        ctx.font = "bold 10px monospace";
        ctx.fillText(part.text, part.x, part.y);

        if (part.type === "fire") {
          ctx.fillStyle = "#FF4500";
          ctx.fillRect(part.x + (Math.random() * 10 - 5), part.y + 4, 4, 4);
        } else if (part.type === "lightning") {
          ctx.strokeStyle = "#00E5FF";
          ctx.beginPath();
          ctx.moveTo(part.x, part.y - 10);
          ctx.lineTo(part.x + 5, part.y);
          ctx.lineTo(part.x - 3, part.y + 5);
          ctx.stroke();
        }

        part.y -= 0.8;
        part.life -= 1;
        if (part.life <= 0) particles.current.splice(index, 1);
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [gameStarted]);

  // Movement Controls
  const startMove = (dir: "left" | "right") => {
    const p = gameState.current.player;
    p.vx = dir === "left" ? -p.speed : p.speed;
    p.state = "walk";
  };

  const stopMove = () => {
    const p = gameState.current.player;
    p.vx = 0;
    if (p.state === "walk") p.state = "idle";
  };

  // Combat Handlers
  const handleAction = (action: "punch" | "kick" | "jump" | "block" | "special") => {
    const p = gameState.current.player;
    const ai = gameState.current.ai;

    if (action === "jump" && p.y === 120 + p.heightOffset) {
      playSynthSound("jump");
      p.vy = -10.5;
      p.state = "jump";
      return;
    }

    if (action === "block") {
      playSynthSound("block");
      p.state = "block";
      return;
    }

    if (action === "special" && p.comboHits < 3) return;

    p.state = action;

    const distance = Math.abs((p.x + 15) - (ai.x + 15));

    // SPECIAL ATTACK UNLOCKED AT 3 HITS
    if (action === "special" && distance < 48) {
      p.comboHits = 0; // Reset streak
      triggerShake();

      if (p.id === "harshdeep") {
        playSynthSound("fire");
        ai.hp = Math.max(0, ai.hp - 35);
        addParticle(ai.x, ai.y, "🔥 SANGRUR DOUBLE PUNCH! -35", "#FFC800", "fire");
      } else if (p.id === "sarabjeet") {
        playSynthSound("punch");
        ai.hp = Math.max(0, ai.hp - 35);
        addParticle(ai.x, ai.y, "🥊 JANDPUR DOUBLE JAB! -35", "#7000E0", "normal");
      } else if (p.id === "sandeep") {
        playSynthSound("lightning");
        ai.hp = Math.max(0, ai.hp - 45);
        addParticle(ai.x, ai.y, "⚡ AMBALA LIGHTNING KICK! -45", "#00E5FF", "lightning");
      }

      ai.state = "hit";
      if (ai.hp <= 0) {
        playSynthSound("ko");
        setWinner(`${playerHost.name} KNOCKED OUT ${opponentHost.name}!`);
        setGameStarted(false);
        return;
      }
    } 
    // REGULAR ATTACKS
    else if ((action === "punch" || action === "kick") && distance < 42) {
      if (ai.state !== "block") {
        let dmg = action === "punch" ? 12 : 16;
        playSynthSound(action);
        
        p.comboHits = Math.min(3, p.comboHits + 1); // Increment hit streak
        ai.hp = Math.max(0, ai.hp - dmg);
        ai.state = "hit";
        addParticle(ai.x + 10, ai.y, `-${dmg}`, "#FFC800");

        if (ai.hp <= 0) {
          playSynthSound("ko");
          setWinner(`${playerHost.name} KNOCKED OUT ${opponentHost.name}!`);
          setGameStarted(false);
          return;
        }
      } else {
        playSynthSound("block");
        p.comboHits = 0; // Block resets streak
        addParticle(ai.x + 10, ai.y, "BLOCKED!", "#A1A1AA");
      }
    } else if (action === "punch" || action === "kick") {
      p.comboHits = 0; // Whiffing attack resets streak
    }

    // AI SMART COUNTER-ATTACK REACTION
    setTimeout(() => {
      const currentDist = Math.abs((p.x + 15) - (ai.x + 15));
      if (ai.hp > 0 && currentDist < 42 && Math.random() > 0.35) {
        if (p.state !== "block") {
          let aiDmg = ai.id === "sarabjeet" ? 18 : 12; // Sarabjeet hits hard
          playSynthSound("punch");
          p.hp = Math.max(0, p.hp - aiDmg);
          p.comboHits = 0; // Getting hit resets your streak!
          p.state = "hit";
          addParticle(p.x + 10, p.y, `-${aiDmg}`, "#FF0000");

          if (p.hp <= 0) {
            playSynthSound("ko");
            setWinner(`${opponentHost.name} DEFEATED ${playerHost.name}!`);
            setGameStarted(false);
          }
        } else {
          playSynthSound("block");
          addParticle(p.x + 10, p.y, "BLOCKED!", "#A1A1AA");
        }
      }

      if (p.state !== "jump" && p.state !== "walk") p.state = "idle";
      if (ai.state !== "jump") ai.state = "idle";
    }, 260);
  };

  return (
    <div className={`flex justify-center min-h-screen px-4 py-6 bg-[#09090B] text-[#FAFAFA] font-mono select-none ${screenShake ? "animate-bounce" : ""}`}>
      <main className="w-full max-w-[440px] flex flex-col gap-4">
        
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
            <span className="text-3xl">🏆</span>
            <h2 className="text-sm font-extrabold text-white leading-relaxed">{winner}</h2>
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
          <div className="flex flex-col gap-3">
            
            {/* Health & Special Meters */}
            <div className="bg-[#141417] border border-[#27272A] rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="flex justify-between text-xs font-bold">
                <span style={{ color: playerHost.color }}>{playerHost.name}</span>
                <span style={{ color: opponentHost.color }}>{opponentHost.name}</span>
              </div>

              {/* Health Bars */}
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

              {/* 3-Hit Consecutive Streak Power Bar */}
              <div className="flex items-center justify-between text-[10px] text-[#A1A1AA]">
                <span>CONSECUTIVE HIT STREAK</span>
                <span className="text-[#FFC800] font-bold">
                  {gameState.current.player.comboHits >= 3 ? "🔥 SUPER POWER UNLOCKED!" : `${gameState.current.player.comboHits} / 3 HITS`}
                </span>
              </div>
              <div className="w-full bg-[#09090B] h-2 rounded-full overflow-hidden border border-[#27272A]">
                <div
                  className="h-full transition-all duration-300 bg-gradient-to-r from-[#FFC800] to-[#FF0000]"
                  style={{ width: `${(gameState.current.player.comboHits / 3) * 100}%` }}
                />
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

            {/* CONTROLS */}
            <div className="flex flex-col gap-2">
              
              {/* Special Move Trigger Button */}
              <button
                onClick={() => handleAction("special")}
                disabled={gameState.current.player.comboHits < 3}
                className={`w-full py-3 rounded-xl text-xs font-black tracking-wider transition-all shadow-lg ${
                  gameState.current.player.comboHits >= 3
                    ? "bg-gradient-to-r from-[#FFC800] to-[#FF4500] text-black active:scale-95 animate-pulse cursor-pointer"
                    : "bg-[#141417] text-[#52525B] border border-[#27272A] cursor-not-allowed"
                }`}
              >
                🔥 {playerHost.special} (UNLOCKED AT 3 HITS)
              </button>

              <div className="flex gap-2">
                {/* D-PAD Movement */}
                <div className="flex-1 grid grid-cols-2 gap-1.5 bg-[#141417] border border-[#27272A] p-2 rounded-2xl">
                  <button
                    onMouseDown={() => startMove("left")}
                    onMouseUp={stopMove}
                    onTouchStart={() => startMove("left")}
                    onTouchEnd={stopMove}
                    className="py-4 bg-[#09090B] border border-[#27272A] active:bg-[#FFC800] active:text-black rounded-xl text-xs font-bold text-white flex items-center justify-center"
                  >
                    ◀ LEFT
                  </button>
                  <button
                    onMouseDown={() => startMove("right")}
                    onMouseUp={stopMove}
                    onTouchStart={() => startMove("right")}
                    onTouchEnd={stopMove}
                    className="py-4 bg-[#09090B] border border-[#27272A] active:bg-[#FFC800] active:text-black rounded-xl text-xs font-bold text-white flex items-center justify-center"
                  >
                    RIGHT ▶
                  </button>
                </div>

                {/* Combat Action Buttons */}
                <div className="flex-1 grid grid-cols-2 gap-1.5 bg-[#141417] border border-[#27272A] p-2 rounded-2xl">
                  <button
                    onClick={() => handleAction("punch")}
                    className="py-2.5 bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                  >
                    👊 PUNCH
                  </button>
                  <button
                    onClick={() => handleAction("kick")}
                    className="py-2.5 bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                  >
                    🦶 KICK
                  </button>
                  <button
                    onClick={() => handleAction("jump")}
                    className="py-2.5 bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-white active:scale-95"
                  >
                    🦘 JUMP
                  </button>
                  <button
                    onClick={() => handleAction("block")}
                    className="py-2.5 bg-[#09090B] border border-[#27272A] hover:border-[#FFC800] rounded-xl text-xs font-bold text-[#FFC800] active:scale-95"
                  >
                    🛡️ BLOCK
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}