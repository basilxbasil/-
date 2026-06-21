import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Home() {
  const [listings, setListings] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data.items);
      } catch (err) {
        toast.error("تعذر تحميل الإعلانات");
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h1 className="text-2xl font-bold">مرحبا بك في دورها</h1>
        <p className="text-ink-3">سوقك الموثوق لإعادة تدوير الخردة</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <h2 className="font-bold">أحدث الإعلانات</h2>
        <div className="grid grid-cols-1 gap-4">
          {listings.map((item) => (
            <Link 
              to={`/listing/${item.id}`} 
              key={item.id} 
              className="listing-card p-4 border rounded-xl hover:shadow-md transition-shadow"
            >
              <img 
                src={item.image || 'https://via.placeholder.com/300'} 
                alt={item.title} 
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => e.target.src = 'https://via.placeholder.com/300'} 
              />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-ink-2 mt-1">
                {item.city} • {item.price ? `${item.price} ر.س` : "قابل للتفاوض"}
              </p>
            </Link>
          ))}
        </div>
        {listings.length === 0 && (
          <p className="text-center text-ink-3">لا توجد إعلانات حالياً.</p>
        )}
      </div>
    </div>
  );
}
