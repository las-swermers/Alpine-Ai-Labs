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

const immersiveReferences = [
  {
    site: "React Three Fiber",
    href: "https://r3f.docs.pmnd.rs/",
    highlight: "Run a real Three.js scene directly inside React components.",
    takeaway: "Best foundation for the cinematic monitor + camera choreography.",
    extract: ["Scene composition", "Camera control", "React component workflow"]
  },
  {
    site: "GSAP ScrollTrigger",
    href: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
    highlight: "Maps exact scroll position to animation progress for scrubbed timelines.",
    takeaway: "Lets us lock camera motion to scroll without drift or desync.",
    extract: ["Scrubbed timelines", "Section pinning", "Progress callbacks"]
  },
  {
    site: "drei RenderTexture",
    href: "https://github.com/pmndrs/drei",
    highlight: "Renders a second React scene onto a mesh material in real time.",
    takeaway: "Enables the monitor " +
      "screen-within-a-screen" +
      " handoff before fading into normal HTML.",
    extract: ["Live screen texture", "Scene-in-scene rendering", "Seamless DOM handoff"]
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

      <section id="immersive-proof" className="references-strip">
        <p className="eyebrow">Build confidence</p>
        <h2>Can we build the cinematic scroll experience? Yes.</h2>
        <p className="section-copy">
          We can ship this in phases by borrowing proven patterns from the ecosystem below, then adapting
          them to Alpine AI Labs branding, performance targets, and accessibility requirements.
        </p>

        <div className="reference-grid" aria-label="Technical references for immersive landing experience">
          {immersiveReferences.map((reference) => (
            <article className="reference-card" key={reference.site}>
              <div className="reference-topline">
                <span className="tier">Reference</span>
                <a href={reference.href} target="_blank" rel="noreferrer">
                  {reference.site}
                </a>
              </div>
              <p>{reference.highlight}</p>
              <strong>{reference.takeaway}</strong>
              <ul>
                {reference.extract.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
