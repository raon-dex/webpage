import Image from "next/image";

const quests = [
  {
    topic: "PROMPT-LEVEL VULNERABILITIES",
    title: "Embedded Jailbreak Templates (EJT)",
    description: "Exploring how embedded instructions can challenge model safeguards, and how to evaluate resistance to adversarial prompts.",
    icon: "scroll-text",
    tags: ["LLM", "Jailbreak", "Evaluation"],
  },
  {
    topic: "TRUSTWORTHY LANGUAGE MODELS",
    title: "LLM Safety & Security",
    description: "Examining the boundaries of safe model behavior, with a focus on alignment, robustness, and responsible deployment.",
    icon: "shield-check",
    tags: ["AI Safety", "Alignment", "Security"],
  },
  {
    topic: "CLEARER SIGNALS",
    title: "AI-based Noise Reduction",
    description: "Exploring learning-based approaches to separate useful audio from background noise and improve listening clarity.",
    icon: "audio-lines",
    tags: ["Audio AI", "Deep Learning", "Signals"],
  },
];

export default function ResearchSection() {
  return (
    <section className="research-section" id="research" aria-labelledby="research-title">
      <div className="research-heading">
        <span className="research-eyebrow">02 / THE QUEST LOG</span>
        <h2 id="research-title">Research Quest</h2>
        <p>Questions worth asking. Problems worth exploring.</p>
      </div>
      <div className="research-grid">
        {quests.map((quest) => (
          <article className="research-card" key={quest.title}>
            <div className="research-card-header">
              <span>RESEARCH QUEST</span>
              <Image src="/images/research/plus.svg" width={14} height={14} alt="" />
            </div>
            <div className="research-card-body">
              <div className="research-topic">
                <Image src={`/images/research/${quest.icon}.svg`} width={28} height={28} alt="" />
                <span>{quest.topic}</span>
              </div>
              <h3>{quest.title}</h3>
              <p>{quest.description}</p>
              <ul className="research-tags" aria-label="Research topics">
                {quest.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="research-status"><span aria-hidden="true" />Status: details coming soon</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
