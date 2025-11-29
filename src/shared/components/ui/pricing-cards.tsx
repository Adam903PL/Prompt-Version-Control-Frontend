'use client';

import { useState } from 'react';
import { ArrowRight, CircleCheck } from 'lucide-react';

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
      <div className="relative container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
            {heading}
          </h2>
          <p className="text-zinc-400 lg:text-xl">{description}</p>

          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>

          <div className="mt-2 flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan, i) => (
              <Card
                key={plan.id}
                className={`card-animate flex w-80 flex-col justify-between text-left border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 ${
                  i === 1 ? 'md:translate-y-2' : ''
                }`}
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
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
                    className="w-full rounded-lg bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  >
                    <a href={plan.button.url} target="_blank" rel="noreferrer">
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };
