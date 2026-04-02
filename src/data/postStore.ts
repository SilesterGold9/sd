import publishedPosts from './posts.json';

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  isDraft?: boolean;
}

const DRAFTS_KEY = 'groteskfolio_drafts';

export function getPublishedPosts(): BlogPostData[] {
  return publishedPosts as BlogPostData[];
}

export function getDrafts(): BlogPostData[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as BlogPostData[]).map(p => ({ ...p, isDraft: true }));
  } catch {
    return [];
  }
}

export function getAllPosts(): BlogPostData[] {
  const published = getPublishedPosts();
  const drafts = getDrafts();
  // Drafts override published posts with same slug (preview mode)
  const publishedFiltered = published.filter(
    p => !drafts.some(d => d.slug === p.slug)
  );
  return [...drafts, ...publishedFiltered];
}

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

export function saveDraft(post: BlogPostData): void {
  const drafts = getDrafts().filter(d => d.slug !== post.slug);
  drafts.unshift({ ...post, isDraft: true });
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function deleteDraft(slug: string): void {
  const drafts = getDrafts().filter(d => d.slug !== slug);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
