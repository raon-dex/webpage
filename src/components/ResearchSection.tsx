const research = [
  { title: "Embedded Jailbreak Templates", description: "Understanding how embedded instructions challenge model safeguards and evaluating resistance to adversarial prompts." },
  { title: "LLM Safety & Security", description: "Exploring alignment, robustness, and the boundaries of safe model behavior." },
  { title: "AI-based Noise Reduction", description: "Separating useful audio from background noise with learning-based approaches." },
];

export default function ResearchSection() {
  return (
    <section className="research-section page-width section-space" id="research" aria-labelledby="research-title">
      <div className="section-heading">
        <span className="eyebrow">02 / RESEARCH</span>
        <h1 id="research-title">Questions worth<br />exploring.</h1>
        <p>Safer models. Clearer signals.<br />A few questions I keep coming back to.</p>
      </div>
      <div className="research-list">
        {research.map((item, index) => (
          <article className="research-item" key={item.title}>
            <span className="item-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
