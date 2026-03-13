import { NewsletterForm } from "./components/newsletter-form";

const roles = ["Teachers", "Counselors", "Tech Directors", "School Leaders"];

export default function HomePage() {
  return (
    <main className="page">
      <div className="noise" />
      <section className="hero card">
        <p className="kicker">EST. 2024 // BOULDER, CO</p>
        <h1>Build AI tools your school will actually use.</h1>
        <p className="lead">
          We help K-12 teams design and deploy practical AI workflows for planning, communication,
          student support, and operations—without adding complexity.
        </p>
        <div className="actions">
          <a className="btn btn-primary" href="#subscribe">
            Book a planning call
          </a>
          <a className="btn btn-secondary" href="#process">
            See implementation process
          </a>
        </div>
      </section>

      <section className="roles card">
        {roles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </section>

      <section className="grid">
        <article className="card feature feature-large">
          <p className="kicker">LAB SYSTEM // 01</p>
          <h2>Plan faster with district-safe AI workflows</h2>
          <p>
            Replace one-off prompting with reusable systems for lesson planning, parent communication,
            and student support triage.
          </p>
        </article>
        <article className="card feature">
          <p className="kicker">LAB SYSTEM // 02</p>
          <h3>Show the logic, not the hype</h3>
          <p>Blueprint-style visuals and policy-first implementation that school teams can trust.</p>
        </article>
        <article className="card feature code-block">
          <p className="kicker">WORKFLOW PREVIEW</p>
          <pre>{`if (request === "parent_email") {
  tone = "supportive + clear";
  policyCheck = true;
  output = draftMessage(studentContext);
}`}</pre>
        </article>
      </section>

      <section id="process" className="card process">
        <h2>Assess → Prototype → Train → Launch</h2>
        <p>
          We map your current workflows, build targeted prototypes, train your team with clear
          guardrails, and launch with measurable outcomes.
        </p>
      </section>

      <section id="subscribe" className="card subscribe">
        <h2>Get practical AI playbooks for schools</h2>
        <p>No fluff. Just tested workflows and implementation notes from the field.</p>
        <NewsletterForm />
      </section>
    </main>
  );
}
