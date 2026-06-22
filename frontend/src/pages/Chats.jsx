import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import AppShell from "../components/AppShell";
import { api, fileUrl } from "../lib/api";

function fmtTime(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("ar-SA", { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric" });
  } catch { return ""; }
}

export default function Chats() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/conversations").then((r) => setItems(r.data || [])).finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="chats-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">المحادثات</h1>
      </header>

      <div className="px-4 pt-3" data-testid="chats-list">
        {loading ? (
          <div className="text-center text-sm text-[var(--ink-3)] py-10">جاري التحميل...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-10 h-10 text-[var(--ink-3)] mx-auto" />
            <p className="text-sm text-[var(--ink-2)] mt-3">لا توجد محادثات بعد</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/chats/${c.id}`}
                  className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[var(--line)] hover:border-[var(--ink-3)] transition"
                  data-testid={`chat-row-${c.id}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--subtle)] overflow-hidden flex-shrink-0">
                    {c.listing_image ? (
                      <img src={fileUrl(c.listing_image)} alt="" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold line-1">{c.other?.name || "مستخدم"}</p>
                      <span className="text-[11px] text-[var(--ink-3)] flex-shrink-0">{fmtTime(c.last_at)}</span>
                    </div>
                    <p className="text-xs text-[var(--ink-2)] line-1 mt-0.5">{c.listing_title}</p>
                    <p className="text-xs text-[var(--ink-3)] line-1 mt-0.5">{c.last_message}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
