"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playDrum, type DrumSound } from "@/lib/drum-audio";
import { playPianoNote } from "@/lib/piano-audio";
import { playGuitarChord, type GuitarEffect } from "@/lib/guitar-audio";
import { playLaunchpad } from "@/lib/launchpad-audio";

const SoundContext = createContext<{
  muted: boolean;
  unavailable: boolean;
  toggle: () => void;
  play: (sound: DrumSound) => void;
  playNote: (semitone: number) => void;
  playChord: (effect: GuitarEffect | null) => void;
  playPad: (index: number) => void;
}>({ muted: false, unavailable: false, toggle: () => {}, play: () => {}, playNote: () => {}, playChord: () => {}, playPad: () => {} });

export function DrumSoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => () => { void audio.current?.close().catch(() => {}); }, []);
  function playAudio(start: (context: AudioContext) => Promise<void>) {
    if (muted) return;
    try {
      audio.current ??= new AudioContext();
      void start(audio.current).catch(() => setUnavailable(true));
    } catch { setUnavailable(true); }
  }
  function toggle() {
    setMuted(!muted);
    if (!muted) void audio.current?.suspend().catch(() => {});
  }
  return (
    <SoundContext.Provider value={{
      muted,
      unavailable,
      toggle,
      play: (sound) => playAudio((context) => playDrum(context, sound)),
      playNote: (semitone) => playAudio((context) => playPianoNote(context, semitone)),
      playChord: (effect) => playAudio((context) => playGuitarChord(context, effect)),
      playPad: (index) => playAudio((context) => playLaunchpad(context, index)),
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useDrumSound = () => useContext(SoundContext);

export function SoundToggle() {
  const { muted, toggle } = useDrumSound();
  return <button className="sound-toggle" type="button" aria-label={muted ? "Turn sound on" : "Mute sound"} aria-pressed={muted} onClick={toggle}>{muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}<span>{muted ? "Sound off" : "Sound on"}</span></button>;
}
