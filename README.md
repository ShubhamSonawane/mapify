## Mapify – Internal Talent Copilot

Mapify is a modern Next.js 14 (App Router) demo that helps you quickly find the best colleagues for a given skill or project. It uses a Siri-like, glassmorphism UI and a small in-memory API layer – perfect for demos and hackathons.

### Tech stack

- Next.js 16 / App Router
- TypeScript
- Tailwind CSS (v4, via `@import "tailwindcss"` in `app/globals.css`)

### Key features

- **Landing search (`/`)** – full-screen Siri-inspired experience with:
	- Dark gradient background and radial glow.
	- Glassmorphism card with title and subtitle.
	- Pill-shaped search bar with magnifying-glass icon and glowing focus state.
	- Example prompt chips you can click to populate the search.
	- “Thinking…” pulsing dots animation while results load.
	- Animated transition when results appear under the card.

- **Profiles (`/profiles`)** – internal talent map:
	- Responsive grid of glass cards showing name, role, location, experience, skills, and certifications.
	- Floating **+ Add profile** button in the bottom-right.
	- Modal form with validation for adding new profiles.

- **API routes** (mock backend, in-memory):
	- `GET /api/profiles` – returns current profiles.
	- `POST /api/profiles` – appends a new profile to the in-memory list.
	- `POST /api/search` – accepts `{ query: string }` and returns top matches with `matchScore` and `aiExplanation`.

The API is intentionally simple so it can later be swapped for a real service or AI-powered backend.

### Project structure (high level)

- `app/layout.tsx` – wraps everything with the gradient background layout.
- `app/page.tsx` – landing + search experience.
- `app/profiles/page.tsx` – profiles grid and add-profile modal.
- `app/api/profiles/route.ts` – profiles list + create.
- `app/api/search/route.ts` – search across profiles.
- `components/Layout.tsx` – base layout with gradient + centered content.
- `components/SearchBar.tsx` – pill input, example chips, Siri-style loader.
- `components/ProfileCard.tsx` – reusable talent card with optional match score.
- `components/ResultsList.tsx` – renders search results below the landing card.
- `components/AddProfileModal.tsx` – modal for creating new profiles.
- `lib/mockData.ts` – in-memory profile store + simple search logic.

## Getting started

From the `mapify-app` directory:

```powershell
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

### Scripts

```powershell
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production build
npm run lint   # Run ESLint
```

## Notes

- All profile data is in-memory only (no database). Restarting the dev server resets any added profiles.
- The search endpoint performs a simple keyword match across skills, role, bio, and related fields, then adds a fake `matchScore` and `aiExplanation` string to mimic an AI-powered search.
- The UI is intentionally minimal and fluid to be easy to tweak during a demo.
