import React from 'react';
import { ArrowRight, Clock, User, Sparkles } from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../services/seedData';
import { useStore } from '../context/StoreContext';

export const BlogPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block mb-1">
            Editorial & Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
            The Emerald Gazette
          </h1>
          <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
            Curated essays on Gulf textile heritage, master Korean Nida silk care, and modest couture styling guides.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog-detail', post.id)}
              className="group bg-white border border-[#006B5B]/15 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#01453D] text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-[#006B5B] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs text-[#006B5B] font-semibold uppercase tracking-wider">
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
