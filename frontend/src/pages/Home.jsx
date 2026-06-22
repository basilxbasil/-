import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "../components/AppShell";
import ListingCard from "../components/ListingCard";
import { api } from "../lib/api";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
    api.get("/listings", { params: { limit: 20 } })
      .then((r) => setRecent(r.data.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <header className="brand-bar px-4 py-4 flex items-center justify-between bg-[var(--brand)] text-white">
        <span className="text-xl font-bold tracking-tight">دورها</span>
        <Link to="/create" className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition" data-testid="nav-create">
          <Plus className="w-3.5 h-3.5" /> إعلان جديد
        </Link>
      </header>

      <div className="px-4 pt-4">
        <div className="relative cursor-pointer" onClick={() => navigate("/search")}>
          <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
          <div className="w-full bg-white border border-[var(--line)] rounded-full pr-10 pl-4 py-3 text-sm text-[var(--ink-3)]">
            ابحث عن إعلانات...
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-bold text-[var(--ink)] mb-3">التصنيفات</h2>
        <div className="grid grid-cols-4 gap-3" data-testid="home-categories">
          {categories.map((c) => (
            <Link key={c.key} to={`/search?category=${c.key}`} className="flex flex-col items-center p-2 bg-white border border-[var(--line)] rounded-xl hover:border-[var(--ink-3)] transition">
              <span className="text-xs font-medium text-[var(--ink-2)] text-center mt-1">{c.name_ar}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="px-4 mt-6 pb-24">
        <h2 className="text-sm font-bold text-[var(--ink)] mb-3">أحدث الإعلانات</h2>
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="listing-card animate-pulse bg-white border border-[var(--line)] rounded-2xl h-48" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <p className="text-center text-sm text-[var(--ink-3)] py-6">لا توجد إعلانات حالياً</p>
        ) : (
          <div className="grid grid-cols-2 gap-3" data-testid="home-listings">
            {recent.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>
    </AppShell>
  );
}
