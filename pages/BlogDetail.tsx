
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useData();
  
  // Find post by slug
  const post = blogPosts.find(p => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center py-20 px-6">
        <h2 className="font-serif text-3xl text-emerald-950 mb-4">Không tìm thấy bài viết</h2>
        <Link to="/" className="text-amber-600 hover:underline">Quay về trang chủ</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#fcfbf9] pt-24 pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <span className="inline-block px-3 py-1 bg-amber-500 text-emerald-950 text-xs font-bold uppercase tracking-widest mb-4 rounded-sm">
                    {post.category}
                </span>
                <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-6">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-emerald-100/70 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} /> {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} /> {post.author}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white p-8 md:p-16 rounded-t-3xl shadow-xl border border-stone-100">
            {/* Excerpt */}
            <p className="font-serif text-xl md:text-2xl text-emerald-900 italic leading-relaxed mb-10 border-l-4 border-amber-500 pl-6">
                {post.excerpt}
            </p>

            {/* Main Content Render */}
            <div 
                className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-emerald-950 prose-a:text-amber-600 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
            >
            </div>
            
            <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-stone-500 hover:text-emerald-900 transition-colors font-bold text-sm uppercase tracking-wider">
                    <ArrowLeft size={16} /> Quay về trang chủ
                </Link>
                <button className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors">
                    <Share2 size={18} /> <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">Chia sẻ</span>
                </button>
            </div>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;
