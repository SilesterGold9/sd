import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, PenSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPostBySlug } from '../data/postStore';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-border">
      <div
        className="h-full bg-accent-strong transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const { t } = useLanguage();

  const post = getPostBySlug(slug ?? '');

  if (!post) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl text-heading font-display mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-accent font-mono hover:text-accent-strong transition-colors">
          ← Back to articles
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 min-h-screen bg-bg">
      <ReadingProgress />

      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link to="/blog" className="inline-flex items-center text-sm font-mono text-muted hover:text-heading mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            {t.blog.back}
          </Link>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">{post.category}</span>
            <span className="text-xs font-mono text-subtle">{post.date}</span>
            {post.isDraft && (
              <span className="text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <PenSquare size={10} /> Draft Preview
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-heading leading-tight">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose-custom"
        >
          <ReactMarkdown
            components={{
              h1: (props) => <h1 className="text-3xl md:text-4xl font-bold font-display text-heading mt-16 mb-8 first:mt-0 leading-tight" {...props} />,
              h2: (props) => <h2 className="text-2xl md:text-3xl font-bold font-display text-heading mt-14 mb-6 border-b border-border pb-3" {...props} />,
              h3: (props) => <h3 className="text-xl font-bold font-display text-accent mt-10 mb-4" {...props} />,
              p: (props) => <p className="text-body text-lg leading-relaxed mb-6" {...props} />,
              ul: (props) => <ul className="list-disc pl-6 text-body mb-6 space-y-2" {...props} />,
              ol: (props) => <ol className="list-decimal pl-6 text-body mb-6 space-y-2" {...props} />,
              li: (props) => <li className="text-body font-sans leading-relaxed" {...props} />,
              strong: (props) => <strong className="text-heading font-bold" {...props} />,
              em: (props) => <em className="text-muted" {...props} />,
              a: (props) => <a className="text-accent underline decoration-accent/40 hover:decoration-accent hover:text-accent-strong transition-colors" target="_blank" rel="noreferrer" {...props} />,
              blockquote: (props) => (
                <blockquote className="border-l-4 border-accent-strong pl-6 my-8 text-muted italic bg-surface/50 py-4 rounded-r-lg" {...props} />
              ),
              hr: () => <hr className="border-border my-12" />,
              img: (props) => <img className="rounded-xl border border-border my-8 w-full" loading="lazy" {...props} />,
              code: ({ className, children, ...props }) => {
                const isBlock = /language-(\w+)/.test(className || '');
                return isBlock ? (
                  <div className="my-8 rounded-xl overflow-hidden border border-border">
                    <div className="bg-surface px-4 py-2 border-b border-border">
                      <span className="text-xs font-mono text-subtle uppercase tracking-wider">
                        {(className || '').match(/language-(\w+)/)?.[1]}
                      </span>
                    </div>
                    <pre className="bg-bg p-6 overflow-x-auto">
                      <code className="text-body font-mono text-sm leading-relaxed">{children}</code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-surface text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </article>
  );
}
