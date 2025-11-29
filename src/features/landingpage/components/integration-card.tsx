import React from 'react';

export interface IntegrationCardProps {
  name: string;
  status: string;
  icon: React.ReactNode;
  active?: boolean;
}

export const IntegrationCard = ({
  name,
  status,
  icon,
  active,
}: IntegrationCardProps) => (
  <div
    className={`p-6 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
      active
        ? 'bg-white text-black border-white'
        : 'bg-white/5 border-white/10 text-gray-400 grayscale hover:grayscale-0 hover:bg-white/10'
    }`}
  >
    <div
      className={`p-2 rounded-full ${active ? 'bg-black/10' : 'bg-white/10'}`}
    >
      {icon}
    </div>
    <span className="font-semibold">{name}</span>
    <span
      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
        active ? 'bg-black text-white' : 'bg-white/10 text-gray-500'
      }`}
    >
      {status}
    </span>
  </div>
);
