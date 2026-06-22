import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, MessageSquare, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AppShell({ children, hideNav = false }) {
  const location = useLocation();
  const { user } = useAuth();
  const p = location.pathname;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased max-w-md mx-auto shadow-xl relative pb-16 flex flex-col justify-between">
      <main className="w-full flex-1">{children}</main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[var(--line)] p-2 flex justify-around items-center z-50 shadow-md" data-testid="bottom-nav">
          <Link to="/" className="flex flex-col items-center text-center gap-0.5" data-active={p === "/"} style={{ color: p === "/" ? "var(--brand)" : "var(--ink-3)" }} data-testid="nav-home">
            <Home className="w-5 h-5" />
            <span className="text-[10px]">الرئيسية</span>
          </Link>
          <Link to="/search" className="flex flex-col items-center text-center gap-0.5" data-active={p === "/search"} style={{ color: p === "/search" ? "var(--brand)" : "var(--ink-3)" }} data-testid="nav-search">
            <Search className="w-5 h-5" />
            <span className="text-[10px]">البحث</span>
          </Link>
          <Link to="/create" className="flex flex-col items-center text-center gap-0.5" data-active={p === "/create"} style={{ color: p === "/create" ? "var(--brand)" : "var(--ink-3)" }} data-testid="nav-create-btn">
            <PlusCircle className="w-5 h-5" />
            <span className="text-[10px]">أعلن</span>
          </Link>
          <Link to={user ? "/chats" : "/login"} className="flex flex-col items-center text-center gap-0.5" data-active={p.startsWith("/chats")} style={{ color: p.startsWith("/chats") ? "var(--brand)" : "var(--ink-3)" }} data-testid="nav-chats">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px]">المحادثات</span>
          </Link>
          <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center text-center gap-0.5" data-active={p === "/profile" || p === "/login"} style={{ color: (p === "/profile" || p === "/login") ? "var(--brand)" : "var(--ink-3)" }} data-testid="nav-profile">
            <User className="w-5 h-5" />
            <span className="text-[10px]">حسابي</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
