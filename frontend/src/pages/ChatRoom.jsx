import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import AppShell from "../components/AppShell";
import { api, fileUrl, formatApiErrorDetail } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export default function ChatRoom() {
  const { convId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  const load = async () => {
    try {
      const { data } = await api.get(`/conversations/${convId}/messages`);
      setData(data);
    } catch (e) {
      toast.error("تعذّر فتح المحادثة");
      navigate("/chats", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [convId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [data]);

  useEffect(() => {
    const t = setInterval(() => { load(); }, 4000);
    return () => clearInterval(t);
  }, [convId]);

  const onSend = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || !data) return;
    setSending(true);
    const otherId = data.conversation.participants.find((p) => p !== user.id);
    try {
      await api.post("/messages", {
        listing_id: data.conversation.listing_id,
        to_user_id: otherId,
        text: t,
      });
      setText("");
      await load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "تعذّر الإرسال");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <AppShell hideNav>
        <div className="p-6 text-center text-[var(--ink-2)]">جاري التحميل...</div>
      </AppShell>
    );
  }
  if (!data) return null;

  const conv = data.conversation;

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="chatroom-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <Link to={`/listing/${conv.listing_id}`} className="flex items-center gap-2 flex-1 min-w-0" data-testid="chatroom-listing">
          <div className="w-10 h-10 rounded-lg bg-[var(--subtle)] overflow-hidden flex-shrink-0">
            {conv.listing_image ? <img src={fileUrl(conv.listing_image)} alt="" className="w-full h-full object-cover" /> : null}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold line-1">{conv.listing_title}</p>
            <p className="text-[11px] text-[var(--ink-3)]">اضغط لعرض الإعلان</p>
          </div>
        </Link>
      </header>

      <div ref={scrollRef} className="px-4 py-4 space-y-2 overflow-y-auto" style={{ minHeight: "calc(100vh - 140px)" }} data-testid="messages-list">
        {data.messages.map((m) => {
          const mine = m.from_user_id === user.id;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm ${mine ? "bg-[var(--brand)] text-white rounded-tl-sm" : "bg-white border border-[var(--line)] text-[var(--ink)] rounded-tr-sm"}`}
                data-testid={`msg-${m.id}`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={onSend} className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[var(--line)] p-2 flex items-center gap-2 z-40" data-testid="chat-input-bar">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالة..."
          className="flex-1 bg-[var(--subtle)] border border-transparent focus:border-[var(--brand)] rounded-full px-4 py-2.5 text-sm outline-none"
          data-testid="chat-input"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center disabled:opacity-50 active:scale-95 transition"
          data-testid="chat-send"
        >
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </form>
    </AppShell>
  );
}
