# Alpine-Ai-Labs
Mission statement  Practical AI training and consulting for K-12 educators, counselors, and tech directors — built by school professionals who actually work in schools.

## Planning
- See `docs/landing-page-design-brief.md` for approved design and style direction.

## Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. Add Kit credentials to `.env.local` (`KIT_API_KEY`, `KIT_API_SECRET`, and either `KIT_FORM_ID` or `KIT_TAG_ID`).
4. Run the app:
   ```bash
   npm run dev
   ```
