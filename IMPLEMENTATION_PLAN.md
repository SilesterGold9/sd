# Implementation Plan: About Me & Achievements Section

## Overview
Create a proper full-page About section right after GlobeSection, featuring competition photos from AOCPC25 (national ICPC round) and certificates from local college rounds.

---

## Assets Inventory

### Competition Photos (`src/assets/aocpc25/`)
Select the strongest 5-6 images for the gallery:
- `MeWithTeam.jpg` — Silvestre with his ICPC team
- `MeDuringICPC.jpg` — Action shot during the competition
- `Podium.jpg` — Podium moment
- `Medal.jpg` — Medal close-up
- `Trophy.jpg` — Trophy close-up
- `AllCollegeTeams.jpg` — All college teams group photo

### Certificates (`src/assets/certificates/`)
- `FirstPlaceICPC.JPG` — 1st place, local round 2025
- `SecondPlaceAOCPC.JPG` — 2nd place, local round 2024
- `HonorableMentionAOCPC.JPG` — Honorable mention, local round 2024

---

## Task 1: Add Translation Keys
**File:** `src/translations/index.ts`

Add a new `about` key under both `en` and `pt` with:
- `title` — section heading (e.g., "Beyond the Code.")
- `intro` — personal paragraph about competitive programming journey
- `competitionTitle` — subtitle for photo gallery (e.g., "AOCPC 2025 — National Round")
- `competitionDescription` — context about the event, team, result
- `achievementsTitle` — subtitle for certificates (e.g., "Achievements")
- `achievementsDescription` — brief text about the local rounds
- `cert1` / `cert2` / `cert3` — labels for each certificate (title + year)

---

## Task 2: Create AboutSection Component
**File:** `src/components/AboutSection.tsx`

### Layout (top to bottom):
1. **Header** — Section title with accent underline (matches Projects.tsx style)
2. **Intro block** — Two-column: left = personal text from translations, right = featured photo (`MeWithTeam.jpg`)
3. **Competition gallery** — Horizontal scrollable row of ~6 photos with subtle rounded corners and hover scale effect
4. **Achievements** — Three certificate cards in a responsive grid (3-col → 1-col), each showing the certificate image with label and year

### Styling conventions (match existing):
- `py-24`, `container mx-auto px-6`
- `glass` class for cards
- `font-display` for headings, `font-mono` for labels, `font-sans` for body
- `text-heading`, `text-muted`, `text-accent` color tokens
- `motion.div` with `whileInView` for scroll animations
- `border-border`, `bg-surface` for section background

---

## Task 3: Wire Into Home Page
**File:** `src/pages/Home.tsx`

Import and place `<AboutSection />` right after `<GlobeSection />`:
```
Hero → GlobeSection → AboutSection → Projects → Skills
```

---

## Task 4: Verify
- Run `npx tsc --noEmit` and `npm run lint`
- Confirm images load correctly in dev mode
