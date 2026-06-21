import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, MessageSquare, User } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav flex justify-around items-center p-2">
      <Link to="/" className="nav-item" data-active={isActive("/")}>
        <Home size={24} />
        <span>الرئيسية</span>
      </Link>
      <Link to="/create" className="nav-item" data-active={isActive("/create")}>
        <PlusCircle size={24} />
        <span>إعلان جديد</span>
      </Link>
      <Link to="/chats" className="nav-item" data-active={isActive("/chats")}>
        <MessageSquare size={24} />
        <span>الرسائل</span>
      </Link>
      <Link to="/profile" className="nav-item" data-active={isActive("/profile")}>
        <User size={24} />
        <span>حسابي</span>
      </Link>
    </div>
  );
}
