import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // نحتاج ننشئ هذا المجلد
import Login from "./pages/Login";
import AddListing from "./pages/AddListing";

function App() {
  return (
    <div dir="rtl" className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddListing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
