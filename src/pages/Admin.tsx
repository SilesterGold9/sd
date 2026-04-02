import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import {
  ArrowLeft, PenSquare, Trash2, Eye, Download, Plus, Save, X, Lock,
  CheckCircle2, FileText, Clock
} from 'lucide-react';
import {
  getAllPosts, getDrafts, getPublishedPosts, saveDraft, deleteDraft,
  slugify, type BlogPostData
} from '../data/postStore';

// ──────────────────────────────────────────────
// Password gate
// ──────────────────────────────────────────────
const ADMIN_PASSWORD = 'groteskfolio16';

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const attempt = () => {
    if (value === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
            <Lock size={28} className="text-accent" />
          </div>
        </div>
        <h1 className="text-3xl font-bold font-display text-heading text-center mb-2">Admin Area</h1>
        <p className="text-muted font-mono text-sm text-center mb-8">Enter your password to continue</p>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={value}
            autoFocus
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            className={`w-full bg-surface border rounded-xl px-4 py-3 text-heading font-mono text-sm outline-none transition-all
              ${error ? 'border-red-500 animate-pulse' : 'border-border-strong focus:border-accent'}`}
          />
          <button
            onClick={attempt}
            className="w-full bg-accent-strong hover:bg-accent-strong/90 text-white font-bold font-mono py-3 rounded-xl transition-colors"
          >
            Unlock
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm font-mono text-center mt-3">Incorrect password</p>
        )}
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Empty post template
// ──────────────────────────────────────────────
function emptyPost(): BlogPostData {
  return {
    slug: '',
    title: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: '',
    summary: '',
    content: '# My New Post\n\nStart writing here...',
    isDraft: true,
  };
}

// ──────────────────────────────────────────────
// Editor view
// ──────────────────────────────────────────────
function PostEditor({
  initial,
  onSave,
  onClose,
}: {
  initial: BlogPostData;
  onSave: (post: BlogPostData) => void;
  onClose: () => void;
}) {
  const [post, setPost] = useState<BlogPostData>({ ...initial });
  const [saved, setSaved] = useState(false);
  const [exported, setExported] = useState(false);

  const update = (field: keyof BlogPostData, val: string) => {
    setPost(prev => {
      const next = { ...prev, [field]: val };
      if (field === 'title') next.slug = slugify(val);
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    saveDraft(post);
    onSave(post);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const snippet = JSON.stringify(
      { slug: post.slug, title: post.title, date: post.date, category: post.category, summary: post.summary, content: post.content },
      null,
      2
    );
    navigator.clipboard.writeText(snippet).then(() => {
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col" data-color-mode="dark">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg/80 backdrop-blur-sm shrink-0">
        <button onClick={onClose} className="flex items-center gap-2 text-muted hover:text-heading transition-colors font-mono text-sm">
          <X size={16} /> Close
        </button>
        <h2 className="font-display font-bold text-heading truncate max-w-xs">{post.title || 'New Post'}</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-sm font-mono text-body hover:text-heading border border-border-strong hover:border-border px-3 py-1.5 rounded-lg transition-all"
          >
            {exported ? <><CheckCircle2 size={14} className="text-green-400" /> Copied!</> : <><Download size={14} /> Export JSON</>}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-sm font-mono font-bold bg-accent-strong hover:bg-accent-strong/90 text-white px-4 py-1.5 rounded-lg transition-all"
          >
            {saved ? <><CheckCircle2 size={14} /> Saved!</> : <><Save size={14} /> Save Draft</>}
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Meta sidebar */}
        <div className="w-72 shrink-0 border-r border-border bg-surface/50 p-6 space-y-5 overflow-y-auto">
          <div>
            <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Title</label>
            <input
              value={post.title}
              onChange={e => update('title', e.target.value)}
              placeholder="Post title..."
              className="w-full bg-surface border border-border-strong focus:border-accent rounded-lg px-3 py-2 text-heading text-sm font-sans outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Slug</label>
            <input
              value={post.slug}
              onChange={e => update('slug', e.target.value)}
              placeholder="url-friendly-slug"
              className="w-full bg-surface border border-border-strong focus:border-accent rounded-lg px-3 py-2 text-accent text-sm font-mono outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Category</label>
            <input
              value={post.category}
              onChange={e => update('category', e.target.value)}
              placeholder="e.g. Architecture"
              className="w-full bg-surface border border-border-strong focus:border-accent rounded-lg px-3 py-2 text-heading text-sm font-sans outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Date</label>
            <input
              value={post.date}
              onChange={e => update('date', e.target.value)}
              placeholder="April 1, 2026"
              className="w-full bg-surface border border-border-strong focus:border-accent rounded-lg px-3 py-2 text-heading text-sm font-mono outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Summary</label>
            <textarea
              value={post.summary}
              onChange={e => update('summary', e.target.value)}
              placeholder="Short description shown in article list..."
              rows={4}
              className="w-full bg-surface border border-border-strong focus:border-accent rounded-lg px-3 py-2 text-heading text-sm font-sans outline-none transition-colors resize-none"
            />
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-mono text-subtle leading-relaxed">
              Hit <span className="text-accent">Save Draft</span> to preview at <span className="text-accent">/blog/{post.slug || '...'}</span>.<br /><br />
              When ready to publish, hit <span className="text-accent">Export JSON</span> and paste into <code className="bg-bg px-1 rounded">src/data/posts.json</code>.
            </p>
          </div>
        </div>

        {/* Markdown Editor */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <MDEditor
            value={post.content}
            onChange={val => update('content', val ?? '')}
            height="100%"
            preview="live"
            style={{ minHeight: '100%', background: 'transparent', border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Admin Dashboard
// ──────────────────────────────────────────────
function AdminDashboard() {
  const [, setPosts] = useState<BlogPostData[]>(getAllPosts);
  const [editing, setEditing] = useState<BlogPostData | null>(null);

  const refresh = useCallback(() => setPosts(getAllPosts()), []);

  const handleDelete = (slug: string) => {
    if (confirm('Delete this draft?')) {
      deleteDraft(slug);
      refresh();
    }
  };

  const handleSave = () => {
    refresh();
  };

  const published = getPublishedPosts();
  const drafts = getDrafts();

  return (
    <>
      <div className="min-h-screen bg-bg pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <Link to="/" className="inline-flex items-center text-sm font-mono text-muted hover:text-heading mb-4 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
              </Link>
              <h1 className="text-4xl font-bold font-display text-heading">Blog Admin</h1>
              <p className="text-muted font-mono text-sm mt-1">
                {drafts.length} draft{drafts.length !== 1 ? 's' : ''} · {published.length} published
              </p>
            </div>
            <button
              onClick={() => setEditing(emptyPost())}
              className="flex items-center gap-2 bg-accent-strong hover:bg-accent-strong/90 text-white font-bold font-mono px-5 py-3 rounded-xl transition-all shadow-[0_0_20px_var(--color-glow-strong)] hover:shadow-[0_0_30px_var(--color-glow-strong)]"
            >
              <Plus size={18} /> New Post
            </button>
          </div>

          {/* Drafts */}
          <section className="mb-12">
            <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14} /> Drafts
            </h2>
            {drafts.length === 0 ? (
              <div className="p-8 rounded-2xl bg-surface/50 border border-dashed border-border-strong text-center text-subtle font-mono text-sm">
                No drafts yet. Hit <strong className="text-accent">New Post</strong> to start writing.
              </div>
            ) : (
              <div className="space-y-3">
                {drafts.map(post => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-5 rounded-xl bg-surface border border-amber-500/20 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{post.category || 'Uncategorized'}</span>
                        <span className="text-xs font-mono text-subtle">{post.date}</span>
                      </div>
                      <p className="text-heading font-display font-semibold truncate">{post.title || '(Untitled)'}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-muted hover:text-heading hover:bg-bg transition-all"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => setEditing(post)}
                        className="p-2 rounded-lg text-muted hover:text-accent hover:bg-bg transition-all"
                        title="Edit"
                      >
                        <PenSquare size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-bg transition-all"
                        title="Delete draft"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Published */}
          <section>
            <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText size={14} /> Published
            </h2>
            <div className="space-y-3">
              {published.map(post => (
                <div
                  key={post.slug}
                  className="flex items-center justify-between p-5 rounded-xl bg-surface border border-border"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">{post.category}</span>
                      <span className="text-xs font-mono text-subtle">{post.date}</span>
                    </div>
                    <p className="text-heading font-display font-semibold truncate">{post.title}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-muted hover:text-heading hover:bg-bg transition-all"
                      title="View post"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => setEditing({ ...post, isDraft: true })}
                      className="p-2 rounded-lg text-muted hover:text-accent hover:bg-bg transition-all"
                      title="Edit (creates a draft copy)"
                    >
                      <PenSquare size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Full-screen editor overlay */}
      <AnimatePresence>
        {editing && (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PostEditor
              initial={editing}
              onSave={handleSave}
              onClose={() => { setEditing(null); refresh(); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ──────────────────────────────────────────────
// Main export — password gates the dashboard
// ──────────────────────────────────────────────
export function Admin() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? (
    <AdminDashboard />
  ) : (
    <PasswordGate onUnlock={() => setUnlocked(true)} />
  );
}
