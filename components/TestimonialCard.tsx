'use client';

import type { Testimonial } from '@/lib/sampleData';

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-gold-300">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  );
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <div className="bg-brand-100 rounded-2xl p-6 border border-brand-200 hover:border-gold-400 transition-colors flex flex-col">
      <QuoteIcon />

      <p className="text-brand-500 text-sm leading-relaxed mt-3 mb-5 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Stars */}
      <div className="flex gap-0.5 text-gold-400 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-brand-200"
        />
        <div>
          <p className="font-semibold text-brand-800 text-sm">{testimonial.name}</p>
          <p className="text-brand-400 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
