import BottomNav from "../components/BottomNav";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-app relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-wexun-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-wexun-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <header className="sticky top-0 z-40 px-4 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gradient">WeXun</h1>
      </header>

      <main className="px-4 pb-28">{children}</main>

      <BottomNav />
    </div>
  );
}
