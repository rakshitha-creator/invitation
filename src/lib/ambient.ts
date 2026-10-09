"use client";
/**
 * Original ambient music, synthesised live with the Web Audio API.
 * A warm tanpura-like drone (Sa–Pa) plus slow plucked phrases in a
 * pentatonic (Bhupali-flavoured) scale. No audio file, nothing licensed.
 */
type Ambient = { ctx: AudioContext; master: GainNode; stop: () => void };

let current: Ambient | null = null;

const BASE = 146.83; // D3 as "Sa"
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19]; // Sa Re Ga Pa Dha Sa' Re' Ga' Pa'
const hz = (semi: number) => BASE * Math.pow(2, semi / 12);

export function startAmbient(volume = 0.5): Ambient | null {
  if (typeof window === "undefined") return null;
  if (current) return current;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);

  // gentle reverb from a generated impulse response
  const conv = ctx.createConvolver();
  const len = ctx.sampleRate * 3.2;
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  conv.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2400;
  master.connect(lp).connect(ctx.destination);
  master.connect(conv).connect(wet).connect(lp);

  // drone
  const drone = ctx.createGain();
  drone.gain.value = 0.14;
  drone.connect(master);
  const oscs: OscillatorNode[] = [];
  for (const [semi, det, g] of [
    [-12, -4, 0.5],
    [-12, 3, 0.5],
    [-5, 0, 0.35],
    [0, 2, 0.25],
  ] as const) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = hz(semi);
    o.detune.value = det;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 520;
    f.Q.value = 3;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07 + Math.random() * 0.05;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 180;
    lfo.connect(lfoG).connect(f.frequency);
    const gg = ctx.createGain();
    gg.gain.value = g;
    o.connect(f).connect(gg).connect(drone);
    o.start();
    lfo.start();
    oscs.push(o, lfo);
  }

  // plucked phrases
  let step = 0;
  let deg = 4;
  const pluck = (t: number, freq: number, vel: number) => {
    const o = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o.type = "triangle";
    o2.type = "sine";
    o.frequency.value = freq;
    o2.frequency.value = freq * 2.001;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22 * vel, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 2.6);
    const g2 = ctx.createGain();
    g2.gain.value = 0.25;
    o.connect(g);
    o2.connect(g2).connect(g);
    g.connect(master);
    o.start(t);
    o2.start(t);
    o.stop(t + 2.8);
    o2.stop(t + 2.8);
  };
  // a soft temple bell every so often (inharmonic partials, long decay)
  const bell = (t: number) => {
    for (const [ratio, amp, dec] of [[1, 0.12, 5], [2.76, 0.05, 3], [5.4, 0.025, 1.8], [8.93, 0.012, 1.1]] as const) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = 523.25 * ratio;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(amp, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + dec + 0.1);
    }
  };
  let bellIn = 3;
  const timer = window.setInterval(() => {
    bellIn -= 1;
    if (bellIn <= 0) {
      bell(ctx.currentTime + 0.05);
      bellIn = 12 + Math.floor(Math.random() * 8);
    }
    const now = ctx.currentTime;
    // phrase of 4 beats then a rest — feels like a slow alaap
    const pos = step % 6;
    if (pos < 4) {
      deg = Math.max(0, Math.min(SCALE.length - 1, deg + [-1, 1, -2, 2, 0][Math.floor(Math.random() * 5)]));
      pluck(now + 0.05, hz(SCALE[deg]), pos === 0 ? 1 : 0.7);
      if (pos === 3 && Math.random() > 0.5) pluck(now + 0.4, hz(SCALE[Math.max(0, deg - 1)]), 0.5);
    }
    step++;
  }, 900);

  const stop = () => {
    window.clearInterval(timer);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    window.setTimeout(() => {
      oscs.forEach((o) => {
        try { o.stop(); } catch {}
      });
      ctx.close();
    }, 1500);
    current = null;
  };
  current = { ctx, master, stop };
  return current;
}

export function getAmbient() {
  return current;
}
