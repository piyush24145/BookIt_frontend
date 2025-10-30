import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refId = location.state?.refId || "REF" + Math.random().toString(36).substring(2, 8).toUpperCase();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <div className="bg-green-100 p-6 rounded-full mb-4">
    <svg
   xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-green-600"
    fill="none"
    viewBox="0 0 24 24"
         stroke="currentColor"  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
      <p className="text-gray-600 mt-2">Ref ID: {refId}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
      >
   Back to Home
      </button>
    </div>
  );
};
export default BookingSuccess;
