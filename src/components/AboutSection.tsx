import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="about-section page-width section-space" aria-labelledby="about-title">
      <div className="section-heading">
        <span className="eyebrow">01 / ABOUT</span>
        <h1 id="about-title">Curious by nature.<br />A builder at heart.</h1>
      </div>
      <div className="about-copy">
        <div className="about-identity">
          <Image src="/images/character-portrait.png" alt="Pixel portrait of Kim Hajun" width={88} height={88} sizes="88px" />
          <div><h3>Kim Hajun</h3><p>Soongsil University<br />AI Software</p></div>
        </div>
        <p>I explore the space between thoughtful AI and practical software, with a particular interest in making intelligent systems safer and more useful.</p>
        <div className="curiosity-stats">
          <h3>Curiosity stats</h3>
          {["AI Safety", "NLP", "LLM", "Software Engineering"].map((name) => (
            <div className="curiosity-row" key={name}>
              <span>{name}</span>
              <span className="curiosity-meter" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <i key={index} className={index < 5 ? "filled" : ""} />)}</span>
              <span className="curiosity-status">EXPLORING</span>
            </div>
          ))}
          <p>Interest categories, not proficiency scores.</p>
        </div>
      </div>
    </section>
  );
}
