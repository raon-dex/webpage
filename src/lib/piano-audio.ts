export async function playPianoNote(context: AudioContext, semitone: number) {
  if (context.state === "suspended") await context.resume();
  if (context.state !== "running") return;

  const start = context.currentTime;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.value = 261.626 * 2 ** (semitone / 12);
  envelope.gain.setValueAtTime(0, start);
  envelope.gain.linearRampToValueAtTime(0.14, start + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.65);
  oscillator.connect(envelope);
  envelope.connect(context.destination);
  oscillator.onended = () => {
    oscillator.disconnect();
    envelope.disconnect();
  };
  oscillator.start(start);
  oscillator.stop(start + 0.65);
}
