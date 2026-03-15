const productPillars = [
  {
    title: "Unified school dashboard",
    body: "Bring SIS, LMS, admissions, wellbeing, and operations data into one decision workspace.",
    label: "Platform"
  },
  {
    title: "Role-based AI assistant",
    body: "Ask natural-language questions and get answers tuned for leaders, counselors, and teachers.",
    label: "Assistant"
  },
  {
    title: "Responsible rollout workflows",
    body: "Use phased implementation playbooks that align with privacy and school governance standards.",
    label: "Implementation"
  }
];

const roadmap = [
  "Connect your existing platforms",
  "Establish baseline operational signals",
  "Enable role-based AI workflows",
  "Scale decision support across departments"
];

export default function ProductPage() {
  return (
    <main className="page product-page">
      <header className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Alpine AI Labs</span>
        </div>
        <nav className="nav-links">
          <a href="/">Consulting</a>
          <a href="#platform">Platform</a>
          <a href="#roadmap">Roadmap</a>
        </nav>
        <a className="btn btn-secondary" href="#waitlist">
          Join waitlist
        </a>
      </header>

      <section className="hero product-hero" id="platform">
        <p className="pill">Alpine product</p>
        <h1>
          One decision layer for your school <span>without replacing your stack</span>
        </h1>
        <p className="lead">
          The Alpine platform connects the systems you already use and turns fragmented data into practical,
          school-ready decisions.
        </p>
        <div className="cta-row">
          <a className="btn btn-accent" href="#waitlist">
            Request early access
          </a>
          <a className="btn btn-secondary" href="/">
            Back to consulting
          </a>
        </div>
      </section>

      <section>
        <p className="eyebrow">Product pillars</p>
        <h2>Built around educator workflows and leadership decisions</h2>
        <div className="three-grid">
          {productPillars.map((pillar) => (
            <article className="panel" key={pillar.title}>
              <span className="tier">{pillar.label}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="services-strip">
        <p className="eyebrow">Implementation roadmap</p>
        <h2>How schools grow with Alpine</h2>
        <ol className="roadmap-list">
          {roadmap.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="footer-cta" id="waitlist">
        <h2>Be a founding Alpine product partner</h2>
        <p>Join the product waitlist to shape features, workflows, and launch priorities.</p>
        <a className="btn btn-accent" href="mailto:hello@alpineailabs.com?subject=Alpine%20Product%20Waitlist">
          Email to join waitlist
        </a>
      </section>
    </main>
  );
}
