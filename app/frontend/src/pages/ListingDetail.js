import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error("تعذر تحميل الإعلان");
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="pb-24">
      <div className="p-6">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-xl font-semibold text-primary mt-2">{listing.price ? `${listing.price} ر.س` : "قابل للتفاوض"}</p>
        <div className="mt-4 p-4 bg-white rounded-xl border">
          <h3 className="font-bold mb-2">الوصف</h3>
          <p className="text-ink-2">{listing.description}</p>
        </div>
        
        {user && user.id !== listing.seller_id && (
          <button 
            onClick={() => navigate(`/chats/${listing.id}`)} // اختصار مبسط للدردشة
            className="w-full mt-6 py-4 bg-primary text-white rounded-xl font-bold"
          >
            تواصل مع البائع
          </button>
        )}
      </div>
    </div>
  );
}
