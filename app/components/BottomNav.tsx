"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, MessageCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const navItems = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/configs", label: "کانفیگ‌ها", icon: Settings },
  {
    href: "https://t.me/Wexun_support",
    label: "پشتیبانی",
    icon: MessageCircle,
    external: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const controls = useAnimation();
  const bouncingRef = useRef(false);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const isAtBottom = scrollTop + viewport >= fullHeight - 6;

      if (isAtBottom && !bouncingRef.current && !cooldownRef.current) {
        bouncingRef.current = true;
        cooldownRef.current = true;

        await controls.start({
          y: [0, 10, -12, 0],
          scaleX: [1, 1.03, 0.985, 1],
          scaleY: [1, 0.9, 1.04, 1],
          transition: {
            duration: 0.7,
            times: [0, 0.22, 0.58, 1],
            ease: ["easeOut", "easeOut", "easeOut"],
          },
        });

        bouncingRef.current = false;

        setTimeout(() => {
          cooldownRef.current = false;
        }, 700);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.nav
      animate={controls}
      className="fixed bottom-4 left-0 right-0 z-50 px-4"
      style={{ transformOrigin: "bottom center" }}
    >
      <div className="mx-auto max-w-md">
        <div className="relative rounded-[28px] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="grid grid-cols-3 items-center p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.external && pathname === item.href;

              const inner = (
                <div className="relative flex h-[60px] flex-col items-center justify-center">
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-active"
                      className="absolute inset-0 rounded-[22px] border border-white/15 bg-gradient-to-b from-white/18 to-white/8"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <Icon
                      size={20}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-white -translate-y-0.5"
                          : "text-white/45 group-hover:text-white/80"
                      }`}
                    />
                    <span
                      className={`mt-1 text-[11px] font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/70"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-dot"
                      className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </div>
              );

              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[22px] focus:outline-none"
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[22px] focus:outline-none"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
