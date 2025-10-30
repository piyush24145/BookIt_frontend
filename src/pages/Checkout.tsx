import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getExperience, createBooking, validatePromo } from "../api/api";
const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [exp, setExp] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [agree, setAgree] = useState(false);
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const qtyFromURL = Number(searchParams.get("qty")) || 1;
  const totalFromURL = Number(searchParams.get("price")) || 0;
  const [qty, setQty] = useState(qtyFromURL);
  const [baseTotal, setBaseTotal] = useState(totalFromURL);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
     const res = await getExperience(id);
     setExp(res.data?.data || res.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  useEffect(() => {
    if (exp) {
      const subtotal = exp.price * qty;
      const tax = Math.round(subtotal * 0.06);
      setBaseTotal(subtotal + tax);
    }
  }, [qty, exp]);
  const applyPromo = async () => {
    if (!promo.trim()) return alert("Enter promo code");
  try {
  const res = await validatePromo(promo);
   setDiscount(res.data.discountPercent || res.data.data?.discountPercent || 0);
   alert("Promo applied!");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Invalid promo");
    }
  };
  const confirm = async () => {
   if (!exp) return;
   if (!agree) return alert("Please agree to the terms first!");
    try {
    const payload = {
      userName: name,
       email,
      experienceId: exp._id,
       date: selectedDate,
      time: selectedTime,
       qty,
        totalAmount: Math.round(baseTotal * (1 - discount / 100)),
      };
      const res = await createBooking(payload);
      const refId = res.data?.refId || "REF" + Math.random().toString(36).substring(2, 8).toUpperCase();
      navigate("/booking-success", { state: { refId } });
    } catch (err: any) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!exp) return <div className="p-8 text-center">Experience not found</div>;
  const discountedTotal = Math.round(baseTotal * (1 - discount / 100));
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="col-span-2 bg-gray-50 p-4 rounded">
    <h2 className="text-xl font-semibold mb-4">Checkout</h2>
     <div className="grid grid-cols-2 gap-3 mb-3">
      <input
     className="border p-2 rounded"
     placeholder="Full name"
     value={name}
       onChange={(e) => setName(e.target.value)} />
      <input
        className="border p-2 rounded"
        placeholder="Email"
        value={email}
      onChange={(e) => setEmail(e.target.value)}  />
        </div>
    <div className="flex gap-2 mb-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}   />
          <button className="bg-black text-white px-4 rounded" onClick={applyPromo}>
            Apply
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="agree"
            className="w-4 h-4"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree" className="text-sm text-gray-600">
            I agree to the terms and safety policy
          </label>
        </div>
      </div>
  <aside className="bg-gray-50 p-4 rounded shadow">
    <div className="flex justify-between text-sm text-gray-500">
         <span>Experience</span>
        <span className="font-semibold">{exp.title}</span>
        </div>
    <div className="flex justify-between text-sm mt-2">
       <span>Date</span>
      <span>{selectedDate}</span>
  </div>
   <div className="flex justify-between text-sm mt-1">
    <span>Time</span>
    <span>{selectedTime}</span>
     </div>
   <div className="flex justify-between items-center text-sm mt-2">
     <span>Qty</span>
    <div className="flex items-center gap-2">
         <button
       onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
         className="px-2 py-1 border rounded"  >
              -
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-2 py-1 border rounded">
              +
            </button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <span>Subtotal + Tax</span>
          <span>₹{baseTotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-₹{Math.round(baseTotal * (discount / 100))}</span>
          </div>
        )}
        <hr className="my-3" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{discountedTotal}</span>
        </div>
        <button
          className={`mt-5 w-full py-2 rounded font-semibold ${
            agree
              ? "bg-yellow-400 hover:bg-yellow-500 text-black"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={confirm}
          disabled={!agree}
        >
   Pay and Confirm
        </button>
      </aside>
    </div>
  );
};
export default Checkout;
