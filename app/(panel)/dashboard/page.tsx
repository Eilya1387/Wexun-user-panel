"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { user, stats, support } from "../../data/mockData";
import {
  Wifi,
  Download,
  Upload,
  Clock,
  Users,
  MessageCircle,
  ChevronRight,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1100;
    let startTime: number | null = null;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function DashboardPage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const usagePercent = useMemo(
    () => (user.dataUsed / user.dataLimit) * 100,
    []
  );

  useEffect(() => {
    if (!progressRef.current || !shimmerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left",
          delay: 0.25,
        }
      );

      gsap.to(shimmerRef.current, {
        x: "220%",
        duration: 1.6,
        ease: "power1.inOut",
        repeat: -1,
        repeatDelay: 2,
        delay: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  const statItems = [
    {
      label: "دانلود کل",
      value: 128,
      suffix: " GB",
      icon: Download,
      iconClass: "text-sky-400",
      panelClass: "from-sky-500/12 to-transparent",
    },
    {
      label: "آپلود کل",
      value: 23,
      suffix: " GB",
      icon: Upload,
      iconClass: "text-emerald-400",
      panelClass: "from-emerald-500/12 to-transparent",
    },
    {
      label: "روز باقیمانده",
      value: stats.daysLeft,
      suffix: " روز",
      icon: Clock,
      iconClass: "text-amber-400",
      panelClass: "from-amber-500/12 to-transparent",
    },
    {
      label: "دستگاه آنلاین",
      value: user.activeConnections,
      suffix: `/${user.maxConnections}`,
      icon: Users,
      iconClass: "text-violet-400",
      panelClass: "from-violet-500/12 to-transparent",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4 pt-2"
    >
      {/* Hero card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-5 backdrop-blur-2xl"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -top-10 left-0 h-28 w-28 rounded-full bg-wexun-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/8 blur-2xl" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-gradient-to-br from-wexun-primary/35 to-white/8 text-xl font-black text-white shadow-[0_10px_30px_rgba(108,99,255,0.18)]">
              {user.avatar}
            </div>
          </div>

          <div className="min-w-0 ">
            <div className="flex items-center  gap-2">
              <h2 className="truncate text-lg font-bold text-white">
                {user.username}
              </h2>
            </div>

            <p className="mt-1 text-xs text-white/45">
              پنل مدیریت و بررسی وضعیت سرویس
            </p>
          </div>
        </div>
      </motion.div>

      {/* Usage card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-5 backdrop-blur-2xl"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Wifi size={16} className="text-wexun-primary" />
              مصرف دیتا
            </div>
            <p className="mt-1 text-xs text-white/40">
              بررسی لحظه‌ای میزان استفاده سرویس
            </p>
          </div>

          <div className="text-left">
            <p className="text-sm font-mono font-bold text-white">
              <span className="text-wexun-primary">{user.dataUsed}</span>
              <span className="text-white/40"> / {user.dataLimit} GB</span>
            </p>
          </div>
        </div>

        <div className="relative h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-wexun-primary via-purple-400 to-wexun-secondary"
            style={{ width: `${usagePercent}%` }}
          >
            <div
              ref={shimmerRef}
              className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <p className="text-white/40">
            <span className="text-white/75">{usagePercent.toFixed(0)}%</span>{" "}
            مصرف شده
          </p>
          <p className="text-white/40">
            <span className="text-wexun-accent">
              {(user.dataLimit - user.dataUsed).toFixed(1)} GB
            </span>{" "}
            باقیمانده
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-3"
      >
        {statItems.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/6 p-4 backdrop-blur-2xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.panelClass} pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/7">
                <item.icon size={18} className={item.iconClass} />
              </div>

              <p className="text-xs text-white/45">{item.label}</p>

              <p className={`mt-1 text-2xl font-black ${item.iconClass}`}>
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Support */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-5 backdrop-blur-2xl"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-wexun-primary/15 border border-wexun-primary/20">
            <MessageCircle size={15} className="text-wexun-primary" />
          </div>
          پشتیبانی WeXun
        </div>

        <div className="space-y-2">
          {[
            {
              href: `https://t.me/${support.telegram.replace("@", "")}`,
              label: "کانال تلگرام",
              value: support.telegram,
              icon: Sparkles,
            },
            {
              href: `https://t.me/${support.support}`,
              label: "پشتیبانی آنلاین",
              value: `@${support.support}`,
              icon: MessageCircle,
            },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.985 }}
              whileHover={{ y: -1 }}
              className="flex items-center justify-between rounded-[22px] border border-white/8 bg-black/10 px-4 py-3 transition-colors duration-300 hover:border-wexun-primary/20 hover:bg-wexun-primary/8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/6">
                  <item.icon size={15} className="text-white/70" />
                </div>
                <div>
                  <p className="text-sm text-white/80">{item.label}</p>
                  <p className="mt-0.5 text-[11px] font-mono text-white/35">
                    {item.value}
                  </p>
                </div>
              </div>

              <ChevronRight size={16} className="text-white/25" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
