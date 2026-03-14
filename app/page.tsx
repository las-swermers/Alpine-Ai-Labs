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

const immersiveFeatures = [
  {
    title: "Neural architecture",
    body: "Cinematic hero experience that transitions from immersive visuals into fully accessible HTML.",
    detail: "> CAMERA_SYNC_READY_"
  },
  {
    title: "Ultra-low latency",
    body: "Scroll-linked animation patterns tuned for smooth interaction and fast runtime delivery.",
    stat: "12ms"
  },
  {
    title: "Enterprise security",
    body: "Performance and accessibility guardrails to keep launch quality high while visuals stay premium."
  },
  {
    title: "Drop-in implementation",
    body: "Ship in phases: prototype visuals first, then harden with analytics, SEO, and conversion layers.",
    cta: "View rollout plan"
  }
];

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
          <a href="#experience">See the immersive concept</a>
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

      <section id="experience" className="bento-strip">
        <p className="eyebrow">Immersive concept preview</p>
        <h2>Designed to feel cinematic, then hand off to usable content</h2>
        <p className="section-copy">
          This layout mirrors the premium bento direction you shared: dark glass cards, asymmetric grid sizing,
          subtle glows, and concise product-style messaging.
        </p>

        <div className="bento-grid" aria-label="Immersive feature highlights">
          <article className="bento-card bento-card-large">
            <div>
              <h3>{immersiveFeatures[0].title}</h3>
              <p>{immersiveFeatures[0].body}</p>
            </div>
            <div className="terminal-chip">{immersiveFeatures[0].detail}</div>
          </article>

          <article className="bento-card">
            <h3>{immersiveFeatures[1].title}</h3>
            <p>{immersiveFeatures[1].body}</p>
            <div className="bento-stat">{immersiveFeatures[1].stat}</div>
          </article>

          <article className="bento-card">
            <h3>{immersiveFeatures[2].title}</h3>
            <p>{immersiveFeatures[2].body}</p>
          </article>

          <article className="bento-card bento-card-wide">
            <div>
              <h3>{immersiveFeatures[3].title}</h3>
              <p>{immersiveFeatures[3].body}</p>
            </div>
            <button type="button" className="btn bento-button">{immersiveFeatures[3].cta}</button>
          </article>
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
