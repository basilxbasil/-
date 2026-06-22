import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { fileUrl } from "@/lib/api";

export default function ListingCard({ listing }) {
  const formatPrice = (price, open) => {
    if (open && (price == null || price === 0)) return "قابل للتفاوض";
    if (price == null) return "—";
    return `${new Intl.NumberFormat("ar-SA").format(price)} ر.س`;
  };

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="listing-card bg-white border border-[var(--line)] rounded-2xl overflow-hidden shadow-sm flex flex-col hover:border-[var(--ink-3)] transition"
      data-testid={`listing-card-${listing.id}`}
    >
      <div className="aspect-[4/3] w-full bg-[var(--subtle)] relative overflow-hidden">
        {listing.images?.length ? (
          <img
            src={fileUrl(listing.images[0])}
            alt={listing.title}
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--ink-3)] text-xs">
            لا توجد صورة
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold line-1 text-[var(--ink)]">{listing.title}</h3>
          <div className="text-[var(--brand)] font-bold text-sm mt-1">
            {formatPrice(listing.price, listing.open_for_offers)}
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[var(--ink-3)] mt-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="line-1">{listing.city}</span>
        </div>
      </div>
    </Link>
  );
}
