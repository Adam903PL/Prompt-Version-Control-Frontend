'use client';

import { useState } from 'react';
import { ArrowRight, CircleCheck } from 'lucide-react';

import { motion } from 'framer-motion';

import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Switch } from '@/shared/components/ui/switch';

interface PricingFeature {
  text: string;
}
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  popular?: boolean;
  button: {
    text: string;
    url: string;
  };
}
interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing2 = ({
  heading = 'Plans & Pricing',
  description = 'Choose the plan that matches your workflow and scale with ease.',
  plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For individuals just getting started',
      monthlyPrice: '$12',
      yearlyPrice: '$9',
      features: [
        { text: '1 project' },
        { text: 'Basic analytics' },
        { text: 'Email support' },
        { text: '500MB storage' },
      ],
      button: {
        text: 'Get Started',
        url: 'https://21st.dev',
      },
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'For teams building serious products',
      monthlyPrice: '$39',
      yearlyPrice: '$29',
      popular: true,
      features: [
        { text: 'Unlimited projects' },
        { text: 'Team collaboration tools' },
        { text: 'Priority chat support' },
        { text: 'Advanced analytics' },
      ],
      button: {
        text: 'Upgrade Now',
        url: 'https://21st.dev',
      },
    },
  ],
}: Pricing2Props) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 md:py-32 text-zinc-50 overflow-hidden isolate">
      {/* Content */}
      <div className="relative container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-pretty text-4xl font-bold lg:text-6xl"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 lg:text-xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 text-lg"
          >
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </motion.div>

          <div className="mt-2 flex flex-col items-stretch justify-center gap-6 md:flex-row">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`relative flex w-80 flex-col justify-between text-left border bg-zinc-900/70 backdrop-blur rounded-xl overflow-hidden ${
                  plan.popular
                    ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] md:-translate-y-4 z-10'
                    : 'border-zinc-800 md:translate-y-2'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">
                    MOST POPULAR
                  </div>
                )}
                <Card className="border-0 bg-transparent h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      <p className="text-zinc-50">{plan.name}</p>
                    </CardTitle>
                    <p className="text-sm text-zinc-400">{plan.description}</p>
                    <span className="text-4xl font-bold text-white">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice.startsWith('$') &&
                      plan.yearlyPrice.startsWith('$') && (
                        <p className="text-zinc-500">
                          Billed{' '}
                          {isYearly
                            ? `$${Number(plan.yearlyPrice.slice(1)) * 12}`
                            : `$${Number(plan.monthlyPrice.slice(1)) * 12}`}{' '}
                          annually
                        </p>
                      )}
                  </CardHeader>

                  <CardContent>
                    <Separator className="mb-6 bg-zinc-800" />
                    {plan.id === 'growth' && (
                      <p className="mb-3 font-semibold text-zinc-200">
                        Everything in Starter, and:
                      </p>
                    )}
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-zinc-200"
                        >
                          <CircleCheck className="size-4 text-zinc-400" />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button
                      asChild
                      className={`w-full rounded-lg ${
                        plan.popular
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                      }`}
                    >
                      <a
                        href={plan.button.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {plan.button.text}
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };
