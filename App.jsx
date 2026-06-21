import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import ListingDetail from "@/pages/ListingDetail";
import CreateListing from "@/pages/CreateListing";
import Chats from "@/pages/Chats";
import ChatDetail from "@/pages/ChatDetail";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<ChatDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}
