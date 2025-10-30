import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperience } from "../api/api";
const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [exp, setExp] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
     setLoading(true);
    const res = await getExperience(id);
        setExp(res.data?.data || res.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!exp) return <div className="p-8 text-center">Experience not found</div>;

  const handleSelectDate = (d: string) =>
    setSelectedDate(selectedDate === d ? null : d);

  const handleSelectTime = (t: string) =>
    setSelectedTime(selectedTime === t ? null : t);

  const subtotal = exp.price * qty;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + tax;
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }
    setExp((prevExp: any) => {
    if (!prevExp) return prevExp;
     const updatedTimes = prevExp.availableTimes.map((slot: any) =>
      slot.time === selectedTime
      ? {
         ...slot,
       left: Math.max(0, slot.left - qty),
      soldOut: slot.left - qty <= 0,
         }
       : slot
      );
      return { ...prevExp, availableTimes: updatedTimes };
    });
    nav(
      `/checkout/${exp._id}?date=${selectedDate}&time=${selectedTime}&qty=${qty}&price=${total}`
    );
  };
  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-2">
    <img
    src={exp.images?.[0] || "/placeholder.png"}
     alt={exp.title}
       className="w-full h-80 object-cover rounded"/>
     <h2 className="text-2xl font-bold mt-4">{exp.title}</h2>
    <p className="text-gray-600 mt-2">{exp.description}</p>
  <div className="mt-6">
      <h3 className="font-semibold">Choose date</h3>
   <div className="flex flex-wrap gap-3 mt-3">
     {exp.availableDates?.map((d: string) => (
       <button
        key={d}
       onClick={() => handleSelectDate(d)}
        className={`px-3 py-2 border rounded transition ${
            selectedDate === d
               ? "bg-yellow-400 border-yellow-500"
               : "hover:bg-gray-100"
         }`}
             >
        {d}
         </button>
      ))}
     </div>
          <h3 className="font-semibold mt-5">Choose time</h3>
          <div className="flex flex-wrap gap-3 mt-3">
            {exp.availableTimes?.map((slot: any) => (
       <button
       key={slot.time}
       disabled={slot.soldOut || slot.left <= 0}
       onClick={() =>
          !slot.soldOut &&
       setSelectedTime(
        selectedTime === slot.time ? null : slot.time
          )
      }
 className={`px-3 py-2 border rounded transition flex items-center gap-2 ${
      slot.soldOut || slot.left <= 0
         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : selectedTime === slot.time
             ? "bg-yellow-400 border-yellow-500"
          : "hover:bg-gray-100"
                }`}
       >
      <span>{slot.time}</span>
         {slot.soldOut || slot.left <= 0 ? (
        <span className="text-red-500 text-sm font-medium">
           (Sold Out)
            </span>
          ) : (
            <span className="text-green-600 text-sm font-medium">
             ({slot.left} left)
            </span>
        )}
     </button>
    ))}
     </div>
        </div>
      </div>
      <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <div>
          <div className="text-gray-500 text-sm font-medium">Starts at</div>
          <div className="text-xl font-semibold text-gray-900 mt-1">
            ₹{exp.price}
          </div>
        </div>
        <div className="mt-6">
      <div className="text-gray-500 text-sm font-medium">Quantity</div>
    <div className="flex items-center gap-3 mt-2">
     <button
     onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
     >
     −
   </button>
    <span className="text-base font-medium">{qty}</span>
      <button
         onClick={() => setQty((q) => q + 1)}
         className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
       >
         +
        </button>
     </div>
   </div>
<div className="mt-8 space-y-3 text-sm text-gray-700 border-t border-gray-200 pt-4">
    <div className="flex justify-between">
    <span>Subtotal</span>
     <span>₹{subtotal}</span>
     </div>
     <div className="flex justify-between">
     <span>Taxes</span>
        <span>₹{tax}</span>
    </div>
     <div className="flex justify-between text-lg font-semibold mt-4 text-gray-900">
      <span>Total</span>
      <span>₹{total}</span>
        </div>
        </div>
        <button
    onClick={handleConfirm}
    disabled={!selectedDate || !selectedTime}
   className={`mt-6 w-full py-2.5 rounded-lg font-medium text-sm transition ${
      !selectedDate || !selectedTime
       ? "bg-gray-200 text-gray-500 cursor-not-allowed"
       : "bg-yellow-400 hover:bg-yellow-500 text-black"
       }`}
    >
   Confirm
        </button>
      </aside>
    </div>
  );
};
export default Details;
