import { NewsletterForm } from "./components/newsletter-form";


const audienceCards = [
  {
    title: "Teachers",
    body: "Prompt techniques for lesson planning, differentiation, feedback, and saving hours on admin work."
  },
  {
    title: "Counselors",
    body: "AI tools for documentation, resource drafting, and supporting students without overload."
  },
  {
    title: "Administrators",
    body: "Build in-house AI tools, evaluate platforms, and lead school-wide AI strategy and rollout."
  }
];

const services = [
  {
    tier: "Training",
    title: "Prompt workshops",
    body: "Hands-on sessions covering how to write effective prompts for your specific role and school tasks."
  },
  {
    tier: "Training",
    title: "Live webinars",
    body: "Regular online sessions on AI tools, trends, and practical integration in your school."
  },
  {
    tier: "Workshop",
    title: "In-person training",
    body: "Full-day and half-day sessions at your school, tailored to your team’s goals and tech comfort level."
  },
  {
    tier: "Workshop",
    title: "AI tool walkthroughs",
    body: "Deep dives into specific platforms for real school use cases and workflows."
  },
  {
    tier: "Custom",
    title: "In-house app builds",
    body: "Custom AI-powered tools specific to your school’s workflows, privacy standards, and student needs."
  }
];

const growthPathPoints = [
  { label: "Planning", value: 14 },
  { label: "Pilot", value: 24 },
  { label: "Training", value: 38 },
  { label: "Workflow adoption", value: 52 },
  { label: "Schoolwide rollout", value: 70 },
  { label: "Continuous improvement", value: 88 }
];

const graphWidth = 680;
const graphHeight = 260;
const xGap = graphWidth / (growthPathPoints.length - 1);
const growthPolyline = growthPathPoints
  .map((point, index) => {
    const x = index * xGap;
    const y = graphHeight - (point.value / 100) * (graphHeight - 30) - 15;
    return `${x},${y}`;
  })
  .join(" ");

export default function HomePage() {
  const newsletterSignupHref = "#newsletter-signup";
  const externalKitSignupHref = process.env.NEXT_PUBLIC_KIT_COLLECTION_URL?.trim() || "";

  return (
    <main className="page">
      <header className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Alpine AI Labs</span>
        </div>
        <nav className="nav-links">
          <a href="#services">Explore training options</a>
          <a href="#audience">Find your school role</a>
          <a href="/product">View product</a>
        </nav>
        <a className="btn btn-secondary" href={newsletterSignupHref}>
          Get AI tips in your inbox
        </a>
      </header>

      <section className="hero" id="newsletter-signup">
        <p className="pill">Built by educators for educators</p>
        <h1>
          AI training for schools <span>without the overwhelm</span>
        </h1>
        <p className="lead">
          Practical workshops, webinars, and tools built by a counselor, a teacher, and a tech director
          who work in schools every day.
        </p>
        <div className="cta-row">
          <NewsletterForm />
          <a className="btn btn-secondary" href="#services">
            Compare services
          </a>
        </div>
      </section>

      <section id="services" className="services-strip">
        <p className="eyebrow">What we offer</p>
        <h2>Practical services for real school teams</h2>
        <div className="service-carousel" aria-label="Services carousel">
          {services.map((service) => (
            <article className="offer-card service-slide" key={service.title}>
              <span className="tier">{service.tier}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="momentum" aria-labelledby="momentum-heading">
        <p className="eyebrow">Consulting momentum</p>
        <h2 id="momentum-heading">A clear growth path, even before benchmark stats</h2>
        <p className="section-copy">
          We focus on helping schools move from early exploration to confident implementation.
          This roadmap view replaces client statistics and visualizes how your AI maturity can grow over time.
        </p>
        <div className="graph-card">
          <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} role="img" aria-label="Alpine consulting growth graph">
            <defs>
              <linearGradient id="momentum-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#112346" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="momentum-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.32)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.03)" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((line) => (
              <line
                key={line}
                x1="0"
                y1={35 + line * 56}
                x2={graphWidth}
                y2={35 + line * 56}
                className="graph-grid"
              />
            ))}
            <polyline
              className="graph-fill"
              points={`0,${graphHeight - 12} ${growthPolyline} ${graphWidth},${graphHeight - 12}`}
            />
            <polyline className="graph-line" points={growthPolyline} />
            {growthPathPoints.map((point, index) => {
              const x = index * xGap;
              const y = graphHeight - (point.value / 100) * (graphHeight - 30) - 15;

              return (
                <g key={point.label}>
                  <circle cx={x} cy={y} r="6" className="graph-node" />
                  <text x={x} y={graphHeight} textAnchor="middle" className="graph-label">
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      <section id="audience">
        <p className="eyebrow">Who we help</p>
        <h2>AI skills for every role in your school</h2>
        <p className="section-copy">
          Whether you’re in the classroom, the counseling office, or the server room — we have practical
          training that fits your context.
        </p>
        <div className="three-grid">
          {audienceCards.map((card) => (
            <article className="panel" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="footer-cta">
        <h2>Ready to bring AI into your school?</h2>
        <p>Join our newsletter for live tips, tools, and workshop announcements.</p>
        <a className="btn btn-accent" href={newsletterSignupHref}>
          Start with free AI updates
        </a>
        <a className="btn btn-secondary" href="/product">
          Explore Alpine product platform
        </a>
        {externalKitSignupHref ? (
          <a className="btn btn-secondary" href={externalKitSignupHref} target="_blank" rel="noreferrer">
            Choose your best-fit starter kit
          </a>
        ) : null}
      </section>

      <footer className="footer">
        <span>Alpine AI Labs · Switzerland</span>
        <a href="mailto:hello@alpineailabs.com">hello@alpineailabs.com</a>
      </footer>
    </main>
  );
}
