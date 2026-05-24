'use client';

import type { Agent } from '@/lib/sampleData';

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86A16 16 0 0 0 15.14 16l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.5v-.58Z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

interface Props {
  agent: Agent;
  contactLabel?: string;
}

export default function AgentCard({ agent, contactLabel = 'Contact' }: Props) {
  return (
    <div className="bg-brand-100 rounded-2xl overflow-hidden border border-brand-200 hover:border-gold-400 transition-all hover:shadow-lg">
      {/* Photo */}
      <div className="h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-brand-800 mb-0.5">{agent.name}</h3>
        <p className="text-gold-600 text-sm font-medium mb-1">{agent.role}</p>
        <p className="text-brand-500 text-xs mb-3">{agent.specialization}</p>

        <div className="flex items-center gap-1.5 text-brand-500 text-xs mb-1.5">
          <GlobeIcon />
          <span>{agent.languagesSpoken.join(' · ')}</span>
        </div>

        <div className="flex items-center gap-1.5 text-brand-500 text-xs mb-1.5">
          <PhoneIcon />
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="hover:text-brand-700 transition-colors">
            {agent.phone}
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-brand-500 text-xs mb-4">
          <MailIcon />
          <a href={`mailto:${agent.email}`} className="hover:text-brand-700 transition-colors">
            {agent.email}
          </a>
        </div>

        <a
          href={`mailto:${agent.email}`}
          className="block text-center border border-gold-400 text-gold-400 py-2 rounded-xl text-sm font-medium hover:bg-gold-400 hover:text-brand-900 transition-colors"
        >
          {contactLabel}
        </a>
      </div>
    </div>
  );
}
