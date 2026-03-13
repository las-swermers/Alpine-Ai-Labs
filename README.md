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
3. Add Kit credentials to `.env.local` (`KIT_API_KEY` and either `KIT_FORM_ID` or `KIT_TAG_ID`). `KIT_API_SECRET` is optional. Legacy `CONVERTKIT_*` variable names are also supported.
   - Optional: set `NEXT_PUBLIC_KIT_COLLECTION_URL` if you want to show a direct Kit signup link in addition to the popup.
4. Run the app:
   ```bash
   npm run dev
   ```


## Downloadable resources
- Files served from `public/ai-download-docs/` are linked in the popup toolkit flow.
- Replace the placeholder `.txt` files with your final PDFs/docs while keeping filenames stable, or update the links in `app/components/newsletter-form.tsx`.
