"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playDrum, type DrumSound } from "@/lib/drum-audio";

const SoundContext = createContext<{ muted: boolean; unavailable: boolean; toggle: () => void; play: (sound: DrumSound) => void }>({ muted: false, unavailable: false, toggle: () => {}, play: () => {} });

export function DrumSoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => () => { void audio.current?.close().catch(() => {}); }, []);
  function play(sound: DrumSound) {
    if (muted) return;
    try {
      audio.current ??= new AudioContext();
      void playDrum(audio.current, sound).catch(() => setUnavailable(true));
    } catch { setUnavailable(true); }
  }
  function toggle() {
    setMuted(!muted);
    if (!muted) void audio.current?.suspend().catch(() => {});
  }
  return <SoundContext.Provider value={{ muted, unavailable, toggle, play }}>{children}</SoundContext.Provider>;
}

export const useDrumSound = () => useContext(SoundContext);

export function SoundToggle() {
  const { muted, toggle } = useDrumSound();
  return <button className="sound-toggle" type="button" aria-label={muted ? "Turn sound on" : "Mute sound"} aria-pressed={muted} onClick={toggle}>{muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}<span>{muted ? "Sound off" : "Sound on"}</span></button>;
}
