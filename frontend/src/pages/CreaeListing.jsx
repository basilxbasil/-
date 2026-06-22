import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { api, fileUrl, formatApiErrorDetail } from "@/lib/api";
import { SAUDI_CITIES } from "@/lib/categories";

export default function CreateListing() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    price: "",
    open_for_offers: false,
    images: [],
  });

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onPickImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (form.images.length + files.length > 6) {
      toast.error("الحد الأقصى 6 صور");
      return;
    }
    setUploading(true);
    try {
      const uploaded = [];
      for (const f of files) {
        const fd = new FormData();
        fd.append("file", f);
        const { data } = await api.post("/uploads/image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploaded.push(data.path);
      }
      setForm((s) => ({ ...s, images: [...s.images, ...uploaded] }));
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل رفع الصور");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImg = (path) => {
    setForm((s) => ({ ...s, images: s.images.filter((p) => p !== path) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) { toast.error("اختر التصنيف"); return; }
    if (!form.city) { toast.error("اختر المدينة"); return; }
    if (!form.open_for_offers && !form.price) { toast.error("أدخل السعر أو فعّل التفاوض"); return; }
    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        city: form.city,
        open_for_offers: form.open_for_offers,
        price: form.open_for_offers && !form.price ? null : parseFloat(form.price) || null,
        images: form.images,
      };
      const { data } = await api.post("/listings", payload);
      toast.success("تم نشر إعلانك");
      navigate(`/listing/${data.id}`, { replace: true });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "تعذّر النشر");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="create-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">إعلان جديد</h1>
      </header>

      <form onSubmit={onSubmit} className="px-4 pt-4 space-y-4 pb-8" data-testid="create-form">
        {/* Images */}
        <div>
          <label className="field-label">الصور (حتى 6)</label>
          <div className="img-grid">
            {form.images.map((p) => (
              <div key={p} className="img-tile">
                <img src={fileUrl(p)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImg(p)}
                  className="absolute top-1 left-1 bg-black/60 text-white rounded-full p-1"
                  aria-label="حذف"
                  data-testid="remove-image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {form.images.length < 6 && (
              <label className="img-tile cursor-pointer text-[var(--ink-3)]" data-testid="image-picker">
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
                <input type=\"file\" accept=\"image/*\" multiple className=\"hidden\" onChange={onPickImages} disabled={uploading} />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="field-label">العنوان</label>
          <input
            required
            value={form.title}
            onChange={set("title")}
            maxLength={120}
            placeholder="مثال: مكيف سبليت ١٨ ألف"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="create-title"
          />
        </div>

        <div>
          <label className="field-label">الوصف</label>
          <textarea
            required
            value={form.description}
            onChange={set("description")}
            rows={4}
            maxLength={4000}
            placeholder="حالته، عمره، سبب البيع..."
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)] resize-none"
            data-testid="create-desc"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="field-label">التصنيف</label>
            <select
              required
              value={form.category}
              onChange={set("category")}
              className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
              data-testid="create-category"
            >
              <option value="">اختر</option>
              {categories.map((c) => <option key={c.key} value={c.key}>{c.name_ar}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">المدينة</label>
            <select
              required
              value={form.city}
              onChange={set("city")}
              className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
              data-testid="create-city"
            >
              <option value="">اختر</option>
              {SAUDI_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="field-label">السعر (ر.س)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={form.price}
            onChange={set("price")}
            disabled={form.open_for_offers}
            placeholder={form.open_for_offers ? "قابل للتفاوض" : "0"}
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)] disabled:bg-[var(--subtle)]"
            data-testid="create-price"
          />
          <label className="flex items-center gap-2 mt-2 text-sm text-[var(--ink-2)]">
            <input
              type="checkbox"
              checked={form.open_for_offers}
              onChange={(e) => setForm({ ...form, open_for_offers: e.target.checked, price: e.target.checked ? "" : form.price })}
              className="w-4 h-4 accent-[var(--brand)]"
              data-testid="create-offers"
            />
            قابل للتفاوض
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className="w-full bg-[var(--brand)] hover:bg-[var(--brand-2)] disabled:opacity-60 text-white font-semibold py-3 rounded-xl active:scale-[0.99] transition"
          data-testid="create-submit"
        >
          {submitting ? "جاري النشر..." : "نشر الإعلان"}
        </button>
      </form>
    </AppShell>
  );
}
