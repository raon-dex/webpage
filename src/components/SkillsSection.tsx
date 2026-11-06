"use client";

import { useState } from "react";
import { Atom, AudioLines, Code2, Coffee, Flame, GitBranch, MessageSquare, Music2, Shield, Smile, Terminal, Bird, type LucideIcon } from "lucide-react";
import { useDrumSound } from "@/components/DrumSoundProvider";

type SkillKey = {
  name: string;
  label: string;
  icon: LucideIcon;
  description: string;
  blackKeyAfter?: number;
};

const keys: SkillKey[] = [
  { name: "Python", label: "PY", icon: Code2, description: "기초적인 파이썬 문법과 프로그래밍이 가능합니다." },
  { name: "PyTorch", label: "PT", icon: Flame, blackKeyAfter: 1, description: "Deep learning 모델을 구축하고 학습시킵니다." },
  { name: "TypeScript", label: "TS", icon: Code2, description: "JavaScript 애플리케이션에 타입 안정성을 추가합니다." },
  { name: "Hugging Face", label: "HF", icon: Smile, blackKeyAfter: 2, description: "대규모 벤치마크 업로드 이력이 있습니다." },
  { name: "Java", label: "JA", icon: Coffee, description: "Object-oriented application development." },
  { name: "React", label: "RE", icon: Atom, description: "재사용 가능한 컴포넌트로 인터랙티브한 인터페이스를 구축합니다." },
  { name: "NLP", label: "NL", icon: MessageSquare, blackKeyAfter: 4, description: "언어 데이터와 텍스트 모델과 작업합니다." },
  { name: "Next.js", label: "NX", icon: Terminal, description: "React로 전체 스택 웹 애플리케이션을 구축합니다." },
  { name: "AI Safety", label: "AI", icon: Shield, blackKeyAfter: 5, description: "AI 행동을 평가하고 개선하는 방법을 탐색합니다." },
  { name: "Swift", label: "SW", icon: Bird, description: "Apple 플랫폼을 위한 애플리케이션을 구축합니다." },
  { name: "Speech Processing", label: "SP", icon: AudioLines, blackKeyAfter: 6, description: "음성 신호와 오디오 모델을 탐색합니다." },
  { name: "Git", label: "GT", icon: GitBranch, description: "버전 관리와 협업을 위한 도구입니다." },
];

export default function SkillsSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  const [selectedIndex, setSelectedIndex] = useState(7);
  const { playNote } = useDrumSound();
  const selected = keys[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <section id="skills" className="portfolio-section skills-section page-width section-space" aria-labelledby="skills-title" tabIndex={-1}>
      <div className="section-heading skills-heading">
        <span className="eyebrow">02 / SKILLS</span>
        <Heading id="skills-title">Every key has a story.</Heading>
        <p>Press a key to explore my skills.</p>
        <Music2 className="skills-heading-note" aria-hidden="true" />
      </div>
      <div className="skills-piano-scroll">
        <div className="skills-piano" role="group" aria-label="Skills piano">
          {keys.map(({ name, label, icon: Icon, blackKeyAfter }, index) => (
            <button
              key={name}
              type="button"
              className={`skills-key ${blackKeyAfter ? "skills-key-black" : "skills-key-white"}`}
              style={blackKeyAfter ? { left: `${(blackKeyAfter / 7) * 100}%` } : undefined}
              aria-label={name}
              aria-pressed={index === selectedIndex}
              aria-controls="skill-detail"
              onClick={() => {
                setSelectedIndex(index);
                playNote(index);
              }}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="skills-scroll-hint">Swipe to explore more keys →</p>
      <div id="skill-detail" className="skills-detail" aria-live="polite">
        <SelectedIcon aria-hidden="true" />
        <div>
          <h3>{selected.name}</h3>
          <span className="skills-category">{selected.blackKeyAfter ? "ML / AI" : "Development"}</span>
          <p>{selected.description}</p>
        </div>
      </div>
    </section>
  );
}
