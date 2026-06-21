import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { Hammer, Package, Recycle } from "lucide-react";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        setListings(res.data.items);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h1 className="text-2xl font-bold">مرحباً بك في دورها</h1>
        <p className="text-ink-3">سوقك الموثوق لإعادة تدوير الخردة</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <h2 className="font-bold">أحدث الإعلانات</h2>
        <div className="grid grid-cols-1 gap-4">
          {listings.map((item) => (
            <Link to={`/listing/${item.id}`} key={item.id} className="listing-card p-4 block">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-ink-2 mt-1">{item.city} • {item.price ? `${item.price} ر.س` : "قابل للتفاوض"}</p>
            </Link>
          ))}
          {listings.length === 0 && <p className="text-center text-ink-3">لا توجد إعلانات حالياً.</p>}
        </div>
      </div>
    </div>
  );
}
