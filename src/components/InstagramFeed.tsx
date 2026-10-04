import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DUBAI_IMAGE, HERO_IMAGE, KIMONO_IMAGE, ATELIER_IMAGE } from '../services/seedData';

export const InstagramFeed: React.FC = () => {
  const { settings, navigateTo, setSelectedCategoryFilter } = useStore();

  const posts = [
    { image: HERO_IMAGE, handle: '@emeraldhaya', tag: 'The Royal Emerald' },
    { image: DUBAI_IMAGE, handle: '@emeraldhaya', tag: 'Gilded Dubai Crepe' },
    { image: KIMONO_IMAGE, handle: '@emeraldhaya', tag: 'Open Kimono Layering' },
    { image: ATELIER_IMAGE, handle: '@emeraldhaya', tag: 'Hand Zardozi Atelier' }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#006B5B] text-xs font-semibold uppercase tracking-widest">
              <Instagram className="w-4 h-4" />
              <span>Follow the Modest Journey</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-[#111111] mt-1">
              @emeraldhayaofficial on Instagram
            </h2>
          </div>

          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 text-xs uppercase tracking-wider text-[#006B5B] font-semibold flex items-center gap-1 hover:underline"
          >
            <span>Follow Our Atelier</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCategoryFilter('All');
                navigateTo('shop');
              }}
              className="group relative aspect-square rounded-sm overflow-hidden bg-neutral-900 cursor-pointer shadow-sm"
            >
              <img
                src={post.image}
                alt="Emerald Haya Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                <Instagram className="w-6 h-6 text-[#D4AF37] mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider">{post.tag}</span>
                <span className="text-[10px] text-neutral-300 mt-1">Tap to Shop Design</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
