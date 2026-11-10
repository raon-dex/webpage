const padNotes = [0, 3, 5, 7, 10, 12, 15, 17];

export async function playLaunchpad(context: AudioContext, index: number) {
  if (context.state !== "running") await context.resume();
  if (context.state !== "running") return;

  const now = context.currentTime;
  const end = now + 0.24;
  const pitch = 330 * 2 ** (padNotes[index % padNotes.length] / 12);
  const oscillator = context.createOscillator();
  oscillator.type = index % 2 === 0 ? "triangle" : "sine";
  oscillator.frequency.setValueAtTime(pitch * 0.75, now);
  oscillator.frequency.exponentialRampToValueAtTime(pitch * 1.65, now + 0.065);
  oscillator.frequency.exponentialRampToValueAtTime(pitch, end);

  const envelope = context.createGain();
  envelope.gain.setValueAtTime(0.001, now);
  envelope.gain.exponentialRampToValueAtTime(0.13, now + 0.012);
  envelope.gain.exponentialRampToValueAtTime(0.001, end);
  oscillator.connect(envelope).connect(context.destination);
  oscillator.onended = () => envelope.disconnect();
  oscillator.start(now);
  oscillator.stop(end);
}
