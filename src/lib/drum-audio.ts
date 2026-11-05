export type DrumSound = "kick" | "snare" | "tom" | "crash" | "ride";

// Short, synthesized percussion: no media downloads or autoplay.
export async function playDrum(context: AudioContext, sound: DrumSound) {
  if (context.state === "suspended") await context.resume();
  if (context.state !== "running") return;
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.value = 0.18;
  output.connect(context.destination);
  const duration = sound === "crash" ? 0.8 : sound === "ride" ? 0.5 : 0.3;
  let sources = 0;
  const finish = () => { if (--sources === 0) output.disconnect(); };
  if (sound === "kick" || sound === "tom" || sound === "snare") {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.frequency.setValueAtTime(sound === "kick" ? 145 : sound === "tom" ? 240 : 180, now);
    oscillator.frequency.exponentialRampToValueAtTime(sound === "kick" ? 42 : sound === "tom" ? 85 : 90, now + 0.18);
    envelope.gain.setValueAtTime(sound === "snare" ? 0.4 : 1, now);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(envelope);
    envelope.connect(output);
    sources++;
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); finish(); };
    oscillator.start(now);
    oscillator.stop(now + duration);
  }
  if (sound === "snare" || sound === "crash" || sound === "ride") {
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
