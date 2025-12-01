import React from 'react';
import { Laptop, ShieldCheck, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

export const ArchitectureSection = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Zero Friction Deployment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            PVC operates as a transparent proxy or local sidecar. It does not
            require installing agents on end devices.
          </motion.p>
        </div>

        {/* Architecture Schema */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* Node 1: User / Local Env */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 z-20"
          >
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Laptop size={40} className="text-gray-300" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">
                Developers & Apps
              </div>
              <div className="text-xs text-gray-500 font-mono">
                IDE / CLI / Slack
              </div>
            </div>
          </motion.div>

          {/* Connection Line 1 (Animated) */}
          <div className="relative h-16 md:h-px w-px md:w-32 bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '50%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 w-1/2 animate-[shimmer_2s_infinite]"
            ></motion.div>
          </div>

          {/* Node 2: PVC Core (Centerpiece) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative z-20 group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-32 h-32 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center relative shadow-2xl">
              <ShieldCheck size={48} className="text-white mb-2" />
              <div className="text-[10px] font-mono text-gray-400 bg-white/10 px-2 py-0.5 rounded border border-white/5">
                PVC PROXY
              </div>

              {/* Orbiting element (Analysis) */}
              <div className="absolute w-full h-full rounded-full border border-dashed border-gray-600 animate-[spin_10s_linear_infinite] opacity-30"></div>
            </div>
          </motion.div>

          {/* Connection Line 2 (Animated) */}
          <div className="relative h-16 md:h-px w-px md:w-32 bg-gray-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '50%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50 w-1/2 animate-[shimmer_2s_infinite_0.5s]"
            ></motion.div>
          </div>

          {/* Node 3: External AI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 z-20"
          >
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Cloud size={40} className="text-gray-300" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">LLM Providers</div>
              <div className="text-xs text-gray-500 font-mono">
                OpenAI / Claude / Custom
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Details underneath */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <TechDetail
            title="Sidecar / Docker"
            desc="Deploy as a container in your VPC. No data leaves your infrastructure until verified."
            delay={0.6}
          />
          <TechDetail
            title="< 20ms Latency"
            desc="Built in Rust. The inspection overhead is negligible for chat interactions."
            delay={0.7}
          />
          <TechDetail
            title="E2E Encryption"
            desc="TLS 1.3 everywhere. We never store prompt content in plain text unless configured."
            delay={0.8}
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
};

interface TechDetailProps {
  title: string;
  desc: string;
  delay?: number;
}

const TechDetail = ({ title, desc, delay = 0 }: TechDetailProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col gap-2 p-4 border-l border-white/10 hover:border-white/50 transition-colors bg-white/[0.02] backdrop-blur-sm rounded-r-lg"
  >
    <h4 className="text-white font-semibold font-mono text-sm">{title}</h4>
    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
  </motion.div>
);
