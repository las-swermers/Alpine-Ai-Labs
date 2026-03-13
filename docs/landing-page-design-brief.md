# Alpine AI Labs — Landing Page Design & Style Brief

## Decision
Yes — and we should tighten the execution to avoid generic "AI SaaS" aesthetics.

This brief now uses an **"Alpine Pro" anti-slop direction**: technical, grounded, and premium.

## Brand Positioning Snapshot
**Brand idea:** _The Elevated Lab_
**Core tension to resolve:** advanced AI capability without hype or visual gimmicks.
**Positioning outcome:** modern and innovative, but still practical, trustworthy, and school-ready.

## Tone & Messaging Guardrails
Use this as the voice standard for headlines and body copy:

- **Confident, not flashy** (show concrete outcomes over buzzwords).
- **Professional, not corporate-cold** (plain language over jargon).
- **Optimistic, not utopian** (AI as educator leverage, not replacement).
- **Built-by-practitioners** (signal lived school experience early).

### Primary Value Promise
"Practical AI systems for schools—designed with educators, implemented responsibly, and built to last."

## Headline Options (Recommended)
Pick one hero line now, A/B test later:

1. **Build AI tools your school will actually use.**
2. **From AI curiosity to classroom-ready systems.**
3. **Practical AI for educators, counselors, and school leaders.**
4. **Your school’s AI lab for real-world implementation.**

### Subheadline Formula
> We help K-12 teams design and deploy practical AI workflows—lesson planning, communication, student support, and operations—without adding complexity.

## Visual System (Alpine Pro / Anti-Slop)

### 1) Aesthetic Direction
- **Technical Brutalism + High-Altitude Minimalism** (clean layout, visible structure, intentional restraint).
- **Texture over glossy gradients** (subtle grain/noise + topographic line motifs).
- **Asymmetry with discipline** (offset bento layout, but strict spacing system).
- **No generic AI tropes** (no blobs, sparkles, or rainbow glows).

### 2) Color Palette (Technical Earth)
Use near-neutral base tones with one functional action color.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Base Dark | Zinc 950 | `#09090B` | Dark theme background |
| Base Light | Zinc 50 | `#FAFAFA` | Light theme background |
| Neutral Text | Slate 800 | `#1E293B` | Primary body/headline text |
| Primary Action | Global Blue | `#2563EB` | Primary button, links, key states |
| Optional Alt Action | Safety Orange | `#F97316` | Use only if replacing blue globally |
| Accent Line | Alpine Cyan | `#22D3EE` | Sparse line highlights/instrument states |

**Rule:** pick **one** action color (Global Blue _or_ Safety Orange), never both on the same page.

### 3) Typography (Blueprint Feel)
- **Headings:** Inter ExtraBold or Geist Bold
- **Body:** Inter, Geist, or Outfit (readability-first)
- **Mono labels:** JetBrains Mono or IBM Plex Mono

Type rhythm baseline:
- Hero H1: 52–68px desktop, 36–44px mobile
- Section H2: 30–40px
- Body: 17–19px, line-height 1.6+

Label treatment:
- Use small uppercase mono labels for metadata (e.g., `EST. 2024 // BOULDER, CO`).
- Track spacing: `0.08em–0.14em` for label clarity.

## Component Guide

### Lab Card Pattern
- Border: `1px solid` neutral line (`rgba(148,163,184,0.25)` light / `rgba(148,163,184,0.18)` dark)
- Background: flat neutral plane (not heavy gradient)
- Radius: `0.75rem` to `1rem` (defined corners, not bubbly)
- Shadow: minimal and directional
- Hover: border intensity increase + `translateY(-2px)`

### Buttons
- **Primary:** solid action color, high-contrast text, subtle inset border
- **Secondary:** transparent/neutral with 1px border
- **Hover behavior:** fast and tight (no floaty/bouncy easing)
- Transition target: `120–180ms`

### Iconography & Media
- Icons: Lucide React, thin-stroke, consistent 18–22px sizes
- Photography: high-contrast mountain/editorial textures over staged stock imagery
- Diagrams: wireframe/blueprint visuals over glossy mockups

## Motion & Interaction (Snap, Not Slime)
- Use Framer Motion springs with tighter physics (`stiffness: 280–320`, `damping: 26–32`).
- Reveal pattern: quick fade + 12–20px translateY.
- Hover: instrument-like response (border illuminate, slight lift).
- Prefer `transform` + `opacity` for performance.
- Respect `prefers-reduced-motion` globally.

## Technical Stack
- **Framework:** Next.js on Vercel
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Kit Newsletter Integration on Vercel (Recommended)

### Decision
**Use Kit through your own backend endpoint (Next.js Route Handler / Serverless Function), not direct browser API calls.**

### Why
- Protects Kit API credentials.
- Enables validation, rate limits, bot checks, consent logging, and analytics.
- Keeps your UI fully custom (your own fields, buttons, and success states).

### Implementation Pattern
1. Custom form in React (`email`, optional `name`, hidden honeypot).
2. `POST /api/subscribe` in Next.js validates and sanitizes input.
3. Server route calls Kit API with secret from Vercel environment variable.
4. Apply source tag (e.g., `landing_hero`) for segmentation.
5. Return clean JSON state to frontend (`ok`, `already_subscribed`, `error`).

### Vercel Environment Variables (from your Kit dashboard)
- `KIT_API_KEY` → use the **V3 Legacy `Your API Key`** for server-side integrations.
- `KIT_API_SECRET` → use the paired **V3 Legacy `API Secret`**.
- `KIT_FORM_ID` or `KIT_TAG_ID` (based on your Kit flow).

### Which key should you create/use?
- For this custom-site + Vercel backend setup, use **V3 Legacy key pair** (`Your API Key` + `API Secret`).
- Keep both values in Vercel Project Settings → Environment Variables.
- Do **not** expose these in client-side code.
- V4 personal-use keys are not the default choice for this server-to-server newsletter capture flow.

### Required UX/Compliance Behaviors
- Consent copy near submit button.
- Friendly duplicate-email handling.
- Clear success + fallback error message.
- Spam defenses: honeypot + per-IP rate limit.

## Suggested Landing Page Structure
1. **Hero** (headline, subheadline, single dominant CTA)
2. **Credibility strip** (teachers, counselors, tech directors)
3. **Use-case bento** (asymmetrical but grid-disciplined)
4. **Build logic section** (code/tool blueprint style, not “AI magic”)
5. **Implementation process** (Assess → Prototype → Train → Launch)
6. **Outcomes/testimonials**
7. **Newsletter capture + final CTA**

## Anti-Slop Quality Gate (must pass)
- [ ] No purple/teal rainbow gradients
- [ ] No generic AI sparkles/brain imagery
- [ ] One action color only
- [ ] Layout has intentional asymmetry, but clear visual hierarchy
- [ ] Labels/metadata use mono treatment for “lab document” tone
- [ ] Interactions feel crisp (<200ms), not bouncy

## Build-Ready Acceptance Checklist
- [ ] Palette tokens implemented globally
- [ ] Typography stack wired with fallback fonts
- [ ] Reusable `LabCard` and button variants created
- [ ] Motion system supports reduced motion
- [ ] Kit integration implemented in server route on Vercel
- [ ] Lighthouse accessibility score >= 90
- [ ] Mobile-first layout validated at common breakpoints
