import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Package, Ban, CircleCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AppShell from "../components/AppShell";
import { api, formatApiErrorDetail } from "../lib/api";

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("users");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      const [s, u, l] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/admin/listings"),
      ]);
      setStats(s.data);
      setUsers(u.data);
      setListings(l.data);
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل التحميل");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  const toggleBlock = async (u) => {
    try {
      await api.post(`/admin/users/${u.id}/${u.is_blocked ? "unblock" : "block"}`);
      toast.success(u.is_blocked ? "تم رفع الإيقاف" : "تم إيقاف المستخدم");
      reload();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const removeListing = async (l) => {
    if (!window.confirm("حذف هذا الإعلان؟")) return;
    try {
      await api.delete(`/admin/listings/${l.id}`);
      toast.success("تم الحذف");
      reload();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="admin-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">لوحة المشرف</h1>
      </header>

      {/* Stats */}
      <section className="px-4 pt-4 grid grid-cols-2 gap-3" data-testid="admin-stats">
        <div className="bg-white border border-[var(--line)] rounded-2xl p-3">
          <div className="flex items-center gap-2 text-[var(--ink-3)] text-xs">
            <Users className="w-4 h-4" /> المستخدمون
          </div>
          <div className="text-2xl font-bold mt-1">{stats?.users ?? "—"}</div>
        </div>
        <div className="bg-white border border-[var(--line)] rounded-2xl p-3">
          <div className="flex items-center gap-2 text-[var(--ink-3)] text-xs">
            <Package className="w-4 h-4" /> الإعلانات
          </div>
          <div className="text-2xl font-bold mt-1">{stats?.listings ?? "—"}</div>
        </div>
      </section>

      {/* Tabs */}
      <div className="px-4 mt-4 flex gap-2">
        <button
          className="chip"
          data-active={tab === "users"}
          onClick={() => setTab("users")}
          data-testid="admin-tab-users"
        >المستخدمون</button>
        <button
          className="chip"
          data-active={tab === "listings"}
          onClick={() => setTab("listings")}
          data-testid="admin-tab-listings"
        >الإعلانات</button>
      </div>

      <section className="px-4 mt-3 pb-8">
        {loading ? (
          <div className="text-center text-sm text-[var(--ink-3)] py-10">جاري التحميل...</div>
        ) : tab === "users" ? (
          <ul className="space-y-2" data-testid="admin-users-list">
            {users.map((u) => (
              <li key={u.id} className="bg-white border border-[var(--line)] rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--subtle)] flex items-center justify-center text-sm font-bold">
                  {(u.name || u.email).slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-1">{u.name}</p>
                  <p className="text-xs text-[var(--ink-3)] line-1">{u.email} · {u.role}</p>
                </div>
                {u.role !== "admin" && (
                  <button
                    type="button"
                    onClick={() => toggleBlock(u)}
                    className={u.is_blocked ? "text-green-600" : "text-red-600"}
                    aria-label={u.is_blocked ? "رفع الإيقاف" : "إيقاف"}
                    data-testid={`block-${u.id}`}
                  >
                    {u.is_blocked ? <CircleCheck className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2" data-testid="admin-listings-list">
            {listings.map((l) => (
              <li key={l.id} className="bg-white border border-[var(--line)] rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-1">{l.title}</p>
                  <p className="text-xs text-[var(--ink-3)] line-1">{l.city} · {l.category} · {l.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeListing(l)}
                  className="text-red-600"
                  aria-label="حذف"
                  data-testid={`del-listing-${l.id}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}
