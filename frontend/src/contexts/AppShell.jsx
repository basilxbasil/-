import { NavLink } from "react-router-dom";
import { Home, Search, PlusCircle, MessageSquare, User } from "lucide-react";

export default function AppShell({ children, hideNav = false }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased pb-20 selection:bg-[var(--brand)] selection:text-white">
      <div className="max-w-md mx-auto min-h-screen bg-[var(--bg)] flex flex-col relative shadow-md">
        <main className="flex-1 w-full">{children}</main>

        {!hideNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur border-t border-[var(--line)] py-2 px-4 flex justify-around items-center z-40" data-testid="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-[var(--brand)] font-semibold" : "text-[var(--ink-3)]"}`} data-testid="nav-home">
              <Home className="w-5 h-5" />
              <span>الرئيسية</span>
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-[var(--brand)] font-semibold" : "text-[var(--ink-3)]"}`} data-testid="nav-search">
              <Search className="w-5 h-5" />
              <span>البحث</span>
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-[var(--brand)] font-semibold" : "text-[var(--ink-3)]"}`} data-testid="nav-create">
              <PlusCircle className="w-5 h-5" />
              <span>أضف إعلان</span>
            </NavLink>
            <NavLink to="/chats" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-[var(--brand)] font-semibold" : "text-[var(--ink-3)]"}`} data-testid="nav-chats">
              <MessageSquare className="w-5 h-5" />
              <span>المحادثات</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-[var(--brand)] font-semibold" : "text-[var(--ink-3)]"}`} data-testid="nav-profile">
              <User className="w-5 h-5" />
              <span>حسابي</span>
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
}
