export type DrumSound = "kick" | "snare" | "tom" | "midTom" | "lowTom" | "crash" | "ride" | "hihat";

const pitches = { kick: [145, 42], snare: [180, 90], tom: [240, 85], midTom: [190, 70], lowTom: [150, 55] } as const;

// Short, synthesized percussion: no media downloads or autoplay.
export async function playDrum(context: AudioContext, sound: DrumSound) {
  if (context.state === "suspended") await context.resume();
  if (context.state !== "running") return;
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.value = 0.18;
  output.connect(context.destination);
  const duration = sound === "crash" ? 0.8 : sound === "ride" ? 0.5 : sound === "hihat" ? 0.12 : 0.3;
  let sources = 0;
  const finish = () => { if (--sources === 0) output.disconnect(); };
  if (sound === "kick" || sound === "snare" || sound === "tom" || sound === "midTom" || sound === "lowTom") {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const [attack, tail] = pitches[sound];
    oscillator.frequency.setValueAtTime(attack, now);
    oscillator.frequency.exponentialRampToValueAtTime(tail, now + 0.18);
    envelope.gain.setValueAtTime(sound === "snare" ? 0.4 : 1, now);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(envelope);
    envelope.connect(output);
    sources++;
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); finish(); };
    oscillator.start(now);
    oscillator.stop(now + duration);
  }
  if (sound === "snare" || sound === "crash" || sound === "ride" || sound === "hihat") {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = context.createBufferSource();
    noise.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = sound === "snare" ? 1200 : sound === "ride" ? 7000 : 4500;
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(sound === "snare" ? 0.85 : 0.6, now);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(filter);
    filter.connect(envelope);
    envelope.connect(output);
    sources++;
    noise.onended = () => { noise.disconnect(); filter.disconnect(); envelope.disconnect(); finish(); };
    noise.start(now);
    noise.stop(now + duration);
  }
}
