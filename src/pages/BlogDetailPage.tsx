import React from 'react';
import { ArrowLeft, Clock, User, Share2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { INITIAL_BLOG_POSTS } from '../services/seedData';

export const BlogDetailPage: React.FC = () => {
  const { pageParam, navigateTo, showToast } = useStore();

  const post = INITIAL_BLOG_POSTS.find((p) => p.id === pageParam) || INITIAL_BLOG_POSTS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard');
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation back */}
        <button
          onClick={() => navigateTo('blog')}
          className="flex items-center gap-1.5 text-xs text-[#006B5B] uppercase tracking-wider font-semibold hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gazette</span>
        </button>

        {/* Category & Meta */}
        <div className="flex items-center gap-2 text-xs text-[#006B5B] font-semibold uppercase tracking-[0.2em] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{post.category}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-4 my-6 border-y border-neutral-200 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-900">{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-neutral-700 hover:text-black"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-sm overflow-hidden shadow-xl mb-10 border border-[#D4AF37]/30">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Prose Body */}
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-5 text-sm sm:text-base font-light">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Author Footer Box */}
        <div className="mt-14 p-6 bg-white border border-[#006B5B]/15 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#006B5B] font-semibold block">
              Editorial Contributor
            </span>
            <h4 className="font-serif text-lg font-bold text-neutral-900 mt-0.5">{post.author}</h4>
            <p className="text-xs text-neutral-500">Haute Couture Historian & Stylist, Emerald Haya Dubai</p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-5 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded"
          >
            Shop The Edit
          </button>
        </div>
      </div>
    </div>
  );
};
