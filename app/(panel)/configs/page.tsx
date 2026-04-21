"use client";

import { useMemo, useState } from "react";
import { configs } from "../../data/mockData";
import {
  Copy,
  CheckCircle2,
  Wifi,
  WifiOff,
  Server,
  Shield,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ConfigsPage() {
  const [copied, setCopied] = useState<number | null>(null);

  const activeCount = useMemo(
    () => configs.filter((c) => c.status === "active").length,
    []
  );

  const handleCopy = async (id: number, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">کانفیگ‌های من</h2>
          <p className="mt-1 text-xs text-white/45">
            لیست کانفیگ‌های آماده اتصال
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65 backdrop-blur-xl">
          <span className="text-white font-semibold">{activeCount}</span> فعال
        </div>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-4 backdrop-blur-2xl"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-wexun-primary/30 to-white/5 border border-white/10">
              <Shield size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">WeXun Config Center</p>
              <p className="mt-1 text-xs text-white/45">
                انتخاب، بررسی و کپی سریع کانفیگ‌ها
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400 border border-emerald-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            آماده اتصال
          </div>
        </div>
      </motion.div>

      {/* Config list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {configs.map((config) => {
          const isActive = config.status === "active";
          const isCopied = copied === config.id;
          const configLink = `${config.protocol}://${config.server}:${config.port}`;

          const pingColor =
            config.ping < 100
              ? "text-emerald-400"
              : config.ping < 200
              ? "text-amber-400"
              : "text-red-400";

          return (
            <motion.div
              key={config.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-4 backdrop-blur-2xl"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    {config.flag}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {config.name}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                          isActive
                            ? "bg-emerald-500/12 text-emerald-400"
                            : "bg-red-500/12 text-red-400"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {isActive ? <Wifi size={10} /> : <WifiOff size={10} />}
                          {isActive ? "فعال" : "غیرفعال"}
                        </span>
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px]">
                      <span className="rounded-full border border-white/10 bg-white/6 px-2 py-1 font-mono text-white/70">
                        {config.protocol}
                      </span>
                      <span className="truncate font-mono text-white/35">
                        {config.server}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle info */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-white/8 bg-black/10 px-3 py-3">
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-white/35">
                    <Server size={11} />
                    سرور
                  </div>
                  <p className="truncate text-xs font-mono text-white/80">
                    {config.server}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/10 px-3 py-3">
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-white/35">
                    <Activity size={11} />
                    پورت / پینگ
                  </div>
                  <p className="text-xs font-mono text-white/80">
                    {config.port} /{" "}
                    <span className={pingColor}>{config.ping}ms</span>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(config.id, configLink)}
                  className={`relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                    isCopied
                      ? "border-emerald-400/20 bg-emerald-500/12 text-emerald-400"
                      : "border-wexun-primary/20 bg-wexun-primary/12 text-wexun-primary hover:bg-wexun-primary/18"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 size={16} />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      کپی لینک کانفیگ
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 truncate text-[10px] font-mono text-white/28">
                {configLink}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
