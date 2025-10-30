import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import BookingSuccess from "./pages/BookingSuccess";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/details/:id" element={<Details />} />
      <Route path="/checkout/:id" element={<Checkout />} />
       <Route path="/booking-success" element={<BookingSuccess/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
