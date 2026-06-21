import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";

export default function Chats() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/messages/conversations");
        setConversations(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">المحادثات</h1>
        {loading ? (
          <div className="text-center text-[var(--ink-3)]">جاري تحميل المحادثات...</div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-10 text-[var(--ink-3)]">لا توجد محادثات حالياً</div>
        ) : (
          <div className="space-y-3">
            {conversations.map((c) => (
              <Link
                key={c.id}
                to={`/chats/${c.id}`}
                className="block p-4 bg-white border border-[var(--line)] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--subtle)] p-3 rounded-full">
                    <MessageCircle className="w-5 h-5 text-[var(--brand)]" />
                  </div>
                  <div>
                    <div className="font-semibold">{c.other_user_name}</div>
                    <div className="text-sm text-[var(--ink-3)]">{c.last_message || "لا توجد رسائل بعد"}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
