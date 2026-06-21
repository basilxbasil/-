import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Package } from "lucide-react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import ListingCard from "@/components/ListingCard";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    (async () => {
      const { data } = await api.get("/listings/my");
      setMyListings(data.items || []);
    })();
  }, [user, navigate]);

  return (
    <AppShell>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-[var(--line)]">
          <div className="bg-[var(--subtle)] p-4 rounded-full">
            <User className="w-8 h-8 text-[var(--brand)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{user?.name || "مستخدم"}</h1>
            <button onClick={logout} className="text-xs text-red-600 flex items-center gap-1 mt-1">
              <LogOut className="w-3 h-3" /> تسجيل خروج
            </button>
          </div>
        </div>

        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" /> إعلاناتي
        </h2>
        
        {myListings.length === 0 ? (
          <div className="text-center py-10 text-[var(--ink-3)]">لا توجد إعلانات لديك حالياً</div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {myListings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
