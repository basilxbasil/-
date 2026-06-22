import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowRight, MapPin, Eye, MessageCircle, Phone, Trash2, ImageOff } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { api, fileUrl, formatApiErrorDetail } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

function formatPrice(price, open) {
  if (open && (price == null || price === 0)) return "قابل للتفاوض";
  if (price == null) return "—";
  try { return `${new Intl.NumberFormat("ar-SA").format(price)} ر.س`; }
  catch { return `${price} ر.س`; }
}

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/listings/${id}`);
        setListing(data);
      } catch (err) {
        toast.error("الإعلان غير موجود");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const onDelete = async () => {
    if (!window.confirm("هل تريد حذف هذا الإعلان؟")) return;
    try {
      await api.delete(`/listings/${id}`);
      toast.success("تم الحذف");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل الحذف");
    }
  };

  const onChat = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/listing/${id}` } });
      return;
    }
    if (user.id === listing.seller_id) {
      toast.info("هذا إعلانك");
      return;
    }
    try {
      const { data } = await api.post("/messages", {
        listing_id: listing.id,
        to_user_id: listing.seller_id,
        text: "السلام عليكم، هل المنتج لا يزال متاحاً؟",
      });
      navigate(`/chats/${data.conv_id}`);
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "تعذّرت بدء المحادثة");
    }
  };

  const onWhatsApp = () => {
    if (!listing.seller_phone) {
      toast.info("البائع لم يضف رقم الجوال");
      return;
    }
    const phone = listing.seller_phone.replace(/\D/g, "").replace(/^0/, "966");
    const text = encodeURIComponent(`السلام عليكم، بخصوص إعلانك "${listing.title}" في تطبيق دورها`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <AppShell hideNav>
        <div className="p-6 text-center text-[var(--ink-2)]">جاري التحميل...</div>
      </AppShell>
    );
  }
  if (!listing) return null;

  const isOwner = user?.id === listing.seller_id;

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="detail-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold line-1 mx-2 flex-1 text-center">{listing.title}</h1>
        {(isOwner || user?.role === "admin") && (
          <button onClick={onDelete} aria-label="حذف" className="text-red-600" data-testid="detail-delete">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        {!isOwner && user?.role !== "admin" && <div className="w-5" />}
      </header>

      {/* Images */}
      <div className="bg-[var(--subtle)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          {listing.images?.length ? (
            <img src={fileUrl(listing.images[activeImg])} alt={listing.title} className="w-full h-full object-cover" data-testid="detail-image" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--ink-3)]">
              <ImageOff className="w-10 h-10" />
            </div>
          )}
        </div>
        {listing.images?.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {listing.images.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${i === activeImg ? "border-[var(--brand)]" : "border-transparent"}`}
              >
                <img src={fileUrl(p)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pt-4 pb-32">
        <div className="text-2xl font-bold text-[var(--brand)]" data-testid="detail-price">
          {formatPrice(listing.price, listing.open_for_offers)}
        </div>
        <h2 className="text-lg font-semibold mt-1" data-testid="detail-title">{listing.title}</h2>
        <div className="flex items-center gap-4 mt-2 text-xs text-[var(--ink-3)]">
          <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.city}</span>
          <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" />{listing.views || 0} مشاهدة</span>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-white border border-[var(--line)]">
          <h3 className="text-sm font-semibold mb-2">الوصف</h3>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed whitespace-pre-wrap" data-testid="detail-desc">
            {listing.description}
          </p>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-white border border-[var(--line)]">
          <h3 className="text-sm font-semibold mb-2">البائع</h3>
          <Link to={`/search?seller=${listing.seller_id}`} className="text-sm text-[var(--ink)]">{listing.seller_name || "—"}</Link>
        </div>
      </div>

      {/* Sticky contact bar */}
      {!isOwner && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[var(--line)] p-3 flex gap-2 z-40" data-testid="contact-bar">
          <button
            type="button"
            onClick={onWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--wa)] text-white font-semibold py-3 rounded-xl active:scale-[0.99]"
            data-testid="contact-whatsapp"
          >
            <Phone className="w-5 h-5" /> واتساب
          </button>
          <button
            type="button"
            onClick={onChat}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--secondary)] text-white font-semibold py-3 rounded-xl active:scale-[0.99]"
            data-testid="contact-chat"
          >
            <MessageCircle className="w-5 h-5" /> محادثة
          </button>
        </div>
      )}
    </AppShell>
  );
}
