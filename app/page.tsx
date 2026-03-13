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
    title: "Tech directors",
    body: "Build in-house AI tools, evaluate platforms, and lead school-wide AI strategy and rollout."
  }
];

const offers = [
  {
    tier: "Free",
    title: "Prompt workshops",
    body: "Hands-on sessions covering how to write effective prompts for your specific role and school tasks."
  },
  {
    tier: "Free",
    title: "Live webinars",
    body: "Regular online sessions on AI tools, trends, and how to integrate them practically in your school."
  },
  {
    tier: "Workshop",
    title: "In-person training",
    body: "Full-day and half-day sessions at your school, tailored to your team’s goals and tech comfort level."
  },
  {
    tier: "Workshop",
    title: "AI tool walkthroughs",
    body: "Deep dives into specific platforms — ChatGPT, Claude, Canva AI, Copilot — for school use cases."
  },
  {
    tier: "Custom",
    title: "In-house app builds",
    body: "We design and build custom AI-powered tools specific to your school’s workflows and student needs."
  },
  {
    tier: "Custom",
    title: "School AI strategy",
    body: "Consulting to help leadership build an AI policy, adoption roadmap, and staff training plan."
  }
];

const team = [
  {
    initials: "SC",
    title: "School counselor",
    body: "Student support, documentation, and mental health workflow expertise"
  },
  {
    initials: "TC",
    title: "Classroom teacher",
    body: "Lesson design, differentiation, and day-to-day classroom AI integration"
  },
  {
    initials: "TD",
    title: "Technology director",
    body: "Infrastructure, platforms, data privacy, and custom tool development"
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
        <a className="btn btn-secondary" href="#signup">
          Join the newsletter
        </a>
      </header>

      <section className="hero">
        <p className="pill">📍 Switzerland</p>
        <h1>AI training for schools — without the overwhelm</h1>
        <p className="lead">
          Practical workshops, webinars, and tools built by a counselor, a teacher, and a tech director
          who work in schools every day.
        </p>
        <div id="signup" className="form-shell">
          <NewsletterForm />
        </div>
      </section>

      <section className="trust-row">
        <p>▪ Built by working educators</p>
        <p>▪ Practical workshops available</p>
        <p>▪ No fluff, background required</p>
      </section>

      <section>
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

      <section className="light-section">
        <p className="eyebrow">What we offer</p>
        <h2>From prompting basics to custom tools</h2>
        <p className="section-copy">
          A full spectrum of AI training — start free, go deeper when you’re ready.
        </p>
        <div className="three-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <span className="tier">{offer.tier}</span>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="light-section team-section">
        <p className="eyebrow">Our team</p>
        <h2>Built by educators, for educators</h2>
        <p className="section-copy">We’re not consultants who read about schools. We work in one.</p>
        <div className="three-grid">
          {team.map((member) => (
            <article className="team-card" key={member.title}>
              <span className="initials">{member.initials}</span>
              <h3>{member.title}</h3>
              <p>{member.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="footer-cta">
        <h2>Ready to bring AI into your school?</h2>
        <p>Join our newsletter for live tips, tools, and workshop announcements.</p>
        <a className="btn btn-secondary" href="#signup">
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
