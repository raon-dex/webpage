"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const recordAudioSrc = process.env.NEXT_PUBLIC_ABOUT_RECORD_AUDIO_URL;

export default function AboutSection({ heading: Heading = "h1" }: { heading?: "h1" | "h2" }) {
  const ExperienceHeading = Heading === "h1" ? "h2" : "h3";
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function toggleRecord() {
    const audio = audioRef.current;
    if (!audio) {
      setPlaying((current) => !current);
      return;
    }
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setAudioError(false);
    try {
      await audio.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setAudioError(true);
    }
  }

  return (
    <section id="about" className="portfolio-section about-record-section page-width section-space" aria-labelledby="about-title" tabIndex={-1}>
      <div className="about-turntable" data-playing={playing}>
        <svg viewBox="0 0 300 224" aria-hidden="true" className="about-turntable-art">
          <g shapeRendering="crispEdges">
            <path d="M12 14h276v6h8v182h-8v8H12v-8H4V20h8Z" fill="#493426" />
            <path d="M16 22h268v6h6v162H10V28h6Z" fill="#b4815e" />
            <path d="M16 22h268v6H16Z" fill="#e4b790" />
            <path d="M10 190h280v10h-8v4H18v-4h-8Z" fill="#76503b" />
            <path d="M16 32h268v148H16Z" fill="#dec5a4" />
            <path d="M18 173h264v7H18Z" fill="#c6a685" />
            <path d="M25 204h32v12H25Zm218 0h32v12h-32Z" fill="#493426" />
            <path d="M246 162h22v8h-22Z" fill="#6d5647" />
            <path d="M246 162h9v8h-9Z" fill={playing ? "#8daa83" : "#bda38a"} />
          </g>
          <circle cx="119" cy="106" r="70" fill="#b49a7c" />
          <g className="about-record-disc">
            <circle cx="119" cy="106" r="65" fill="#242823" stroke="#111410" strokeWidth="3" />
            <g fill="none" stroke="#555951" strokeWidth="1.5">
              <circle cx="119" cy="106" r="57" />
              <circle cx="119" cy="106" r="49" />
              <circle cx="119" cy="106" r="40" />
              <path d="M69 90a52 52 0 0 1 22-28m54 88a51 51 0 0 0 22-25" stroke="#85897c" strokeWidth="3" />
            </g>
            <circle cx="119" cy="106" r="26" fill="#8daa83" stroke="#53694e" strokeWidth="2" />
            <text x="119" y="100" textAnchor="middle" fill="#243620">SIDE A</text>
            <circle cx="119" cy="106" r="2.5" fill="#f5e8d4" />
            <path d="M109 115h20" stroke="#53694e" strokeWidth="2" />
          </g>
          <circle cx="251" cy="58" r="17" fill="#493426" />
          <g className="about-tonearm">
            <path d="M251 58v62l-11 15v11" fill="none" stroke="#493426" strokeWidth="8" />
            <path d="M251 58v62l-11 15v11" fill="none" stroke="#f0dfc4" strokeWidth="4" />
            <path d="M233 137h13v12h-13Z" fill="#494840" />
            <path d="M233 147h6v3h-6Z" fill="#252922" />
          </g>
          <circle cx="251" cy="58" r="10" fill="#a98d70" stroke="#493426" strokeWidth="2" />
        </svg>
        <button type="button" className="about-record-button" onClick={toggleRecord}>
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          {recordAudioSrc
            ? (playing ? "음악 일시정지" : "음악 재생")
            : (playing ? "STOP" : "PLAY")}
        </button>
        {recordAudioSrc && (
          <audio
            ref={audioRef}
            src={recordAudioSrc}
            preload="none"
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => {
              setPlaying(false);
              setAudioError(true);
            }}
          />
        )}
        {audioError && <p role="status" className="about-record-error">음원을 재생할 수 없어요.</p>}
      </div>
      <div className="about-liner-notes">
        <div className="section-heading about-record-copy">
          <span className="about-side-label">SIDE A</span>
          <Heading id="about-title">ABOUT ME.</Heading>
          <p>AI Researcher · Software Engineer</p>
          <p lang="ko">안녕하세요, 김하준입니다! 👋</p>
          <p lang="ko">
            🔬 <strong>AI를 연구하고</strong>,{" "}
            💻 <strong>소프트웨어를 개발하며</strong>,{" "}
            🥁 <strong>취미는 드럼입니다!</strong>
          </p>
          <p lang="ko">기술과 음악을 사랑하는 개발자의 이야기를 소개합니다!</p>
        </div>
        <section className="about-experience" aria-labelledby="experience-title">
          <span className="about-side-label">SIDE B</span>
          <ExperienceHeading id="experience-title">Experience</ExperienceHeading>
          <ol className="about-experience-tracks" lang="ko">
            <li>
              <strong>연구실 경험</strong>
              <p>소속, 활동 기간, 연구 주제를 추가할 예정이에요.</p>
            </li>
            <li>
              <strong>회사 인턴 경험</strong>
              <p>회사, 근무 기간, 맡았던 일을 추가할 예정이에요.</p>
            </li>
          </ol>
        </section>
      </div>
    </section>
  );
}
