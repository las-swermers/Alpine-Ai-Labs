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

export default function HomePage() {
  return (
    <main className="page">
      <header className="nav">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Alpine AI Labs</span>
        </div>
        <nav className="nav-links">
          <a href="#services">Workshops</a>
          <a href="#audience">For schools</a>
        </nav>
        <a className="btn btn-secondary" href="#signup">
          Join the newsletter
        </a>
      </header>

      <section className="hero" id="signup">
        <p className="pill">Built by educators for educators</p>
        <h1>
          AI training for schools <span>without the overwhelm</span>
        </h1>
        <p className="lead">
          Practical workshops, webinars, and tools built by a counselor, a teacher, and a tech director
          who work in schools every day.
        </p>
        <div className="cta-row">
          <a className="btn btn-accent" href="#signup-form">
            Get your free AI toolkit
          </a>
          <a className="btn btn-secondary" href="#services">
            Explore workshops
          </a>
        </div>
        <div id="signup-form" className="form-shell">
          <NewsletterForm />
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
        <a className="btn btn-accent" href="#signup">
          Get started free
        </a>
      </section>

      <footer className="footer">
        <span>Alpine AI Labs · Switzerland</span>
        <a href="mailto:hello@alpineailabs.com">hello@alpineailabs.com</a>
      </footer>
    </main>
  );
}
