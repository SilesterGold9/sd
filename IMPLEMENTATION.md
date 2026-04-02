# Blog Admin UI — Writing Experience

Since this is a static portfolio (no backend/database), there are a few real approaches to consider.

## Options Comparison

| Approach | Pros | Cons |
|---|---|---|
| **Admin panel + localStorage** | Simple, no setup, instant | Posts only live in your browser; you'd need to export & commit them |
| **Admin panel + GitHub API** | Posts persist permanently via GitHub Gists/repo | Needs a GitHub token, slightly more complex |
| **Headless CMS (Contentful/Sanity)** | Best for production, rich media support | External account, API keys, overkill for personal blog |

## Recommended: Admin Panel + JSON Export Workflow

> [!IMPORTANT]
> The cleanest "no-backend" approach is an **`/admin` route** with:
> 1. A **password gate** (simple, client-side — just to prevent random visitors from stumbling in)
> 2. A **rich Markdown editor** (`@uiw/react-md-editor` — a popular, well-maintained editor with live preview)
> 3. Posts persisted to **`localStorage`** so they survive page refreshes during your writing session
> 4. A **"Publish" button** that exports your post as a properly formatted entry, plus a one-click **copy-to-clipboard** of the updated `posts.json`, which you'd paste into the project to permanently commit the post

This gives you a **real writing UI** and a minimal "save + commit" publishing workflow — which is actually how many developer blogs work (e.g. Ghost, Astro, Jekyll).

## Proposed Changes

### [NEW] `src/data/posts.json`
- Move hardcoded blog posts from `BlogList.tsx` into a JSON file. This becomes the "source of truth" for published posts.

### [NEW] `src/pages/Admin.tsx`
- `/admin` route with a **password gate** (`useState` + simple env-var or hardcoded PIN)
- A **post list** showing drafts (from localStorage) and published posts (from `posts.json`)
- A **Create / Edit** view containing:
  - Title, Category, Date fields
  - `@uiw/react-md-editor` for writing Markdown with a live split-pane preview
  - **Save Draft** button → writes to localStorage
  - **Export Post** button → copies a JSON snippet to clipboard for committing into `posts.json`

### [MODIFY] `src/pages/BlogList.tsx` + `BlogPost.tsx`
- Merge posts from `posts.json` + any saved drafts found in localStorage (so you can preview your work-in-progress articles before committing them)

### [MODIFY] `src/App.tsx`
- Add `/admin` route

### Dependencies
- `npm install @uiw/react-md-editor` (~180kb gzipped, lazy-loaded so it doesn't affect blog reader performance)

## Open Questions

> [!NOTE]
> What would you like as the admin password? It's just a simple client-side gate — more of a "don't accidentally click in" guard than real security. It can be anything simple like `"silvestre123"` or similar.

> [!TIP]
> Since next step after writing is "commit the JSON to git", would you also like me to add a `npm run new-post` CLI helper that scaffolds a new draft file for you directly? This could be an alternative or complement to the UI approach.
