export type GuitarEffect = "drive" | "echo" | "tremolo" | "fuzz";

// Open E major, from the low E string to the high E string.
const chord = [82.41, 123.47, 164.81, 207.65, 246.94, 329.63];

export async function playGuitarChord(context: AudioContext, effect: GuitarEffect | null) {
  if (context.state !== "running") await context.resume();
  if (context.state !== "running") return;

  const now = context.currentTime;
  const duration = effect === "echo" ? 1.25 : 0.85;

  const tone = context.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(effect === "drive" ? 3400 : 2300, now);
  tone.frequency.exponentialRampToValueAtTime(440, now + duration);

  const volume = context.createGain();
  volume.gain.setValueAtTime(0.001, now);
  volume.gain.linearRampToValueAtTime(effect === "drive" || effect === "fuzz" ? 0.022 : 0.038, now + 0.024);
  volume.gain.exponentialRampToValueAtTime(0.001, now + duration);
  tone.connect(volume);
  const voices = chord.map((frequency, index) => {
    const voice = context.createOscillator();
    voice.type = effect === "fuzz" ? "square" : effect === "drive" ? "sawtooth" : "triangle";
    voice.frequency.value = frequency;
    voice.connect(tone);
    voice.start(now + index * 0.009);
    voice.stop(now + duration);
    return voice;
  });
  const [string] = voices;

  const output = context.createGain();
  volume.connect(output).connect(context.destination);

  if (effect === "echo") {
    const delay = context.createDelay();
    delay.delayTime.value = 0.23;
    const feedback = context.createGain();
    feedback.gain.value = 0.38;
    volume.connect(delay).connect(feedback);
    feedback.connect(delay);
    feedback.connect(output);
    string.onended = () => {
      window.setTimeout(() => {
        delay.disconnect();
        feedback.disconnect();
        output.disconnect();
      }, 900);
    };
  } else if (effect === "tremolo") {
    const pulse = context.createOscillator();
    const depth = context.createGain();
    output.gain.value = 0.6;
    pulse.frequency.value = 8;
    depth.gain.value = 0.38;
    pulse.connect(depth).connect(output.gain);
    pulse.start(now);
    pulse.stop(now + duration);
    string.onended = () => output.disconnect();
  } else {
    string.onended = () => output.disconnect();
  }

}
