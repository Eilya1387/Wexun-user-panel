// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import GlobalIntro from "./components/GlobalIntro";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeXun Panel",
  description: "WeXun User Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} bg-app`}>
        <ThemeProvider>
          <GlobalIntro />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
