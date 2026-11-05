import Image from "next/image";

const curiosityStats = ["AI Safety", "NLP", "LLM", "Software Engineering"];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-introduction">
        <span className="about-eyebrow">01 / MEET THE CHARACTER</span>
        <h2>About Me</h2>
        <p>A researcher&apos;s curiosity. An engineer&apos;s instinct to build.</p>
        <p>My world sits at the intersection of thoughtful AI and practical software, with a particular interest in making intelligent systems safer and more useful.</p>
        <div className="about-location"><span aria-hidden="true">⌂</span> SOONGSIL UNIVERSITY</div>
      </div>
      <div className="character-window">
        <div className="character-titlebar">
          <span>character.profile</span>
          <span className="character-controls" aria-hidden="true"><i /><i /></span>
        </div>
        <div className="character-body">
          <div className="character-identity">
            <div className="character-portrait">
              <Image src="/images/character-portrait.png" alt="Pixel-art portrait of Kim Hajun" width={188} height={176} sizes="188px" />
            </div>
            <h3>Kim Hajun</h3>
            <p>Soongsil University / AI Software</p>
          </div>
          <div className="character-details">
            <span className="character-class">CLASS / RESEARCHER + BUILDER</span>
            <h4>Curiosity stats</h4>
            <div className="character-stats">
              {curiosityStats.map((name) => (
                <div className="character-stat" key={name}>
                  <span className="stat-label">{name}</span>
                  <span className="stat-meter" aria-hidden="true">
                    {Array.from({ length: 8 }, (_, i) => <span key={i} className={i < 5 ? "meter-segment filled" : "meter-segment"} />)}
                  </span>
                  <span className="stat-status">EXPLORING</span>
                </div>
              ))}
            </div>
            <p className="stat-note">Interest categories, not proficiency scores.</p>
            <div className="character-tags"><span>Thoughtful AI</span><span>Useful software</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

