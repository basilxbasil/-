import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Search as SearchIcon, X } from "lucide-react";
import AppShell from "../components/AppShell";
import ListingCard from "../components/ListingCard";
import { api } from "../lib/api";
import { SAUDI_CITIES } from "../lib/categories";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [city, setCity] = useState(params.get("city") || "");

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const queryParams = { limit: 50 };
    if (q) queryParams.q = q;
    if (category && category !== "all") queryParams.category = category;
    if (city) queryParams.city = city;
    api
      .get("/listings", { params: queryParams })
      .then((r) => setItems(r.data.items || []))
      .finally(() => setLoading(false));
  }, [q, category, city]);

  const updateParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  return (
    <AppShell>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="search-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">البحث</h1>
      </header>

      <div className="px-4 pt-3">
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); updateParam("q", e.target.value); }}
            placeholder="مكيف، حديد، أثاث..."
            className="w-full bg-white border border-[var(--line)] rounded-full pr-10 pl-10 py-3 text-sm outline-none focus:border-[var(--brand)]"
            data-testid="search-input"
          />
          {q && (
            <button
              type="button"
              onClick={() => { setQ(""); updateParam("q", ""); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-3)]"
              aria-label="مسح"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" data-testid="cat-chips">
          <button
            type="button"
            className="chip whitespace-nowrap"
            data-active={category === "all"}
            onClick={() => { setCategory("all"); updateParam("category", ""); }}
            data-testid="chip-all"
          >
            الكل
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              className="chip whitespace-nowrap"
              data-active={category === c.key}
              onClick={() => { setCategory(c.key); updateParam("category", c.key); }}
              data-testid={`chip-${c.key}`}
            >
              {c.name_ar}
            </button>
          ))}
        </div>

        {/* City */}
        <div className="mt-3">
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value); updateParam("city", e.target.value); }}
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-2.5 outline-none focus:border-[var(--brand)] text-sm"
            data-testid="search-city"
          >
            <option value="">كل المدن</option>
            {SAUDI_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <section className="px-4 mt-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="listing-card animate-pulse">
                <div className="aspect-[4/3] bg-[var(--subtle)]" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[var(--subtle)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--subtle)] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-sm text-[var(--ink-3)] py-10" data-testid="search-empty">
            لا توجد نتائج مطابقة.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3" data-testid="search-results">
            {items.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>
    </AppShell>
  );
}
