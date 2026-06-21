import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowRight } from "lucide-react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function ChatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/messages/${id}`);
      setMessages(data);
    })();
  }, [id]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post(`/messages/${id}`, { text });
    setMessages([...messages, data]);
    setText("");
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}><ArrowRight className="w-5 h-5" /></button>
        <h1 className="font-semibold">المحادثة</h1>
      </header>

      <div className="flex flex-col h-[calc(100vh-120px)] p-4 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 p-3 rounded-xl max-w-[80%] ${m.sender_id === user?.id ? "bg-[var(--brand)] text-white self-end" : "bg-[var(--subtle)] self-start"}`}>
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} className="fixed bottom-0 w-full p-3 bg-white border-t flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 p-2 border rounded-full" placeholder="اكتب رسالة..." />
        <button type="submit" className="bg-[var(--brand)] p-2 rounded-full text-white"><Send className="w-5 h-5" /></button>
      </form>
    </AppShell>
  );
}
