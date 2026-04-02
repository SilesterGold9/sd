import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenSquare } from 'lucide-react';
import { getAllPosts } from '../data/postStore';

export function BlogList() {
  const { t } = useLanguage();
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center text-sm font-mono text-muted hover:text-heading mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Home
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold font-display text-heading mb-6">
                {t.blog.title}
              </h1>
              <p className="text-xl text-muted font-sans leading-relaxed max-w-2xl">
                {t.blog.description}
              </p>
            </div>
          </div>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-subtle font-mono">No posts yet.</div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group block p-8 rounded-2xl bg-surface border border-border hover:border-accent/50 transition-all"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="text-xs font-mono text-accent uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs font-mono text-subtle">{post.date}</span>
                    {post.isDraft && (
                      <span className="text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <PenSquare size={10} /> Draft
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-heading mb-4 group-hover:text-accent transition-colors font-display">
                    {post.title}
                  </h2>
                  <p className="text-muted mb-6 font-sans">
                    {post.summary}
                  </p>
                  <span className="text-sm font-mono font-bold text-heading group-hover:text-accent transition-colors inline-flex items-center gap-2">
                    {t.blog.readMore} →
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
