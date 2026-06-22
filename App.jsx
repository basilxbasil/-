import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import CreateListing from "./pages/CreateListing";
import ListingDetail from "./pages/ListingDetail";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:convId" element={<ChatRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster position="top-center" richColors closeButton />
      </BrowserRouter>
    </AuthProvider>
  );
}
