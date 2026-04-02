# Implementation Plan: Social Links & About Section Update

## Overview
Update social media links with real URLs and improve the about section content in the GlobeSection.

---

## Task 1: Update Social Media Links in Contact.tsx
**File:** `src/components/Contact.tsx`

- Set GitHub link to `https://github.com/SilesterGold9`
- Set LinkedIn link to `https://www.linkedin.com/in/silvestre-dourado`
- Remove the Twitter icon/link entirely
- Remove `TwitterIcon` from the import (cleanup)

---

## Task 2: Improve About Section Content
**File:** `src/translations/index.ts`

Update the `globe` section for both English (`en`) and Portuguese (`pt`) with richer, more detailed descriptions about Silvestre's skills, experience, and what makes his work distinctive.

### English (`en.globe`)
- Keep existing titles ("Global Vision, Local Precision.")
- Rewrite `description` with more substance: tech stack, approach, values
- Rewrite `descriptionMobile` as a condensed version

### Portuguese (`pt.globe`)
- Keep existing titles
- Translate the new descriptions to Portuguese

---

## Verification
- Run `npm run lint` and `npx tsc --noEmit` to ensure no errors introduced
