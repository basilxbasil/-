import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import AppShell from "@/components/AppShell";
import ListingCard from "@/components/ListingCard";
import { api } from "@/lib/api";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const q = searchParams.get("q") || "";

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/listings", { params: { q } });
        setListings(data.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [q]);

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-3 border-b border-[var(--line)]">
        <button onClick={() => navigate(-1)}><ArrowRight className="w-5 h-5" /></button>
        <div className="flex-1 bg-[var(--subtle)] rounded-full px-4 py-2 text-sm">
          {q || "البحث"}
        </div>
      </header>

      <div className="p-4">
        {loading ? (
          <div className="text-center text-[var(--ink-3)]">جاري البحث...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-10 text-[var(--ink-3)]">لا توجد نتائج مطابقة</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
