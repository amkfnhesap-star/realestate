'use client';

import { useState } from 'react';

interface Props {
  photos: string[];
  title: string;
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

export default function PhotoGallery({ photos, title }: Props) {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i - 1 + photos.length) % photos.length);
  }
  function next() {
    setActive((i) => (i + 1) % photos.length);
  }

  return (
    <div dir="ltr">
      {/* Main photo */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-100 shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[active]}
          alt={`${title} — photo ${active + 1}`}
          className="w-full h-full object-cover"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-brand-100/80 hover:bg-brand-100 text-brand-800 p-2 rounded-full shadow transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-100/80 hover:bg-brand-100 text-brand-800 p-2 rounded-full shadow transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>
            <div className="absolute bottom-3 right-3 bg-brand-900/70 text-brand-800 text-xs px-2.5 py-1 rounded-full">
              {active + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                i === active ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
