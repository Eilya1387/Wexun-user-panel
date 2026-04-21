"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { user } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1000)); // simulate loading

    if (username === user.username && password === user.password) {
      router.push("/dashboard");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-wexun-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-wexun-secondary/20 rounded-full blur-[120px]" />

      <div className={`w-full max-w-md z-10 ${theme === "dark" ? "glass" : "glass-light"} rounded-3xl p-8`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">WeXun</h1>
          <p className="text-white/50 dark:text-white/50 text-gray-500 text-sm">
            به پنل کاربری خوش آمدید
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm text-white/70 dark:text-white/70 text-gray-600 mb-1 block">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری خود را وارد کنید"
              className="w-full bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white dark:text-white text-gray-800 placeholder-white/30 focus:outline-none focus:border-wexun-primary transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-white/70 dark:text-white/70 text-gray-600 mb-1 block">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
                className="w-full bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white dark:text-white text-gray-800 placeholder-white/30 focus:outline-none focus:border-wexun-primary transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-wexun-primary to-purple-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                ورود به پنل
              </>
            )}
          </button>
        </form>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/40 space-y-1">
          <p>
            تلگرام:{" "}
            <a
              href="https://t.me/Wexun"
              target="_blank"
              className="text-wexun-primary hover:underline"
            >
              @Wexun
            </a>
          </p>
          <p>
            پشتیبانی:{" "}
            <a
              href="https://t.me/Wexun_support"
              target="_blank"
              className="text-wexun-primary hover:underline"
            >
              @Wexun_support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}