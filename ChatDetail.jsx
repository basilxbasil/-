import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowRight } from "lucide-react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function ChatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // خطة الأمان: منع الدخول غير المصرح به
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/messages/${id}`);
        setMessages(data);
      } catch (err) {
        toast.error("تعذر تحميل الرسائل");
      }
    };
    if (user) fetchMessages();
  }, [id, user, loading, navigate]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const { data } = await api.post(`/messages/${id}`, { text });
      setMessages([...messages, data]);
      setText("");
    } catch (err) {
      toast.error("فشل إرسال الرسالة");
    }
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-3 border-b">
        <button onClick={() => navigate(-1)}><ArrowRight className="w-5 h-5" /></button>
        <h1 className="font-semibold">المحادثة</h1>
      </header>

      <div className="flex flex-col h-[calc(100vh-120px)] p-4 overflow-y-auto">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`mb-3 p-3 rounded-xl max-w-[80%] ${
              m.sender_id === user?.id 
              ? "bg-primary text-white self-end" 
              : "bg-gray-100 text-ink-2 self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} className="fixed bottom-0 w-full p-3 bg-white border-t flex gap-2">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="flex-1 p-2 border rounded-full px-4"
          placeholder="اكتب رسالتك..."
        />
        <button type="submit" className="bg-primary p-2 rounded-full text-white">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </AppShell>
  );
}
