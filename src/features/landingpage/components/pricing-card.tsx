import React from 'react';
import { Check } from 'lucide-react';

export interface PricingCardProps {
  title: string;
  price: string;
  desc: string;
  features: string[];
  buttonText: string;
}

export const PricingCard = ({
  title,
  price,
  desc,
  features,
  buttonText,
}: PricingCardProps) => (
  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="flex items-end gap-1 mb-4">
      <span className="text-4xl font-bold">{price}</span>
      {price !== 'Custom' && <span className="text-gray-500 text-sm">/mo</span>}
    </div>
    <p className="text-gray-400 mb-8 text-sm h-10">{desc}</p>

    <ul className="space-y-4 mb-8">
      {features.map((feat, i) => (
        <li key={i} className="flex gap-3 text-sm text-gray-300">
          <Check size={18} className="text-white shrink-0" /> {feat}
        </li>
      ))}
    </ul>

    <button className="w-full py-3 bg-white/10 border border-white/10 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all">
      {buttonText}
    </button>
  </div>
);
