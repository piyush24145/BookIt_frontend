import React, { useState } from "react";

interface Props {
  onSearch: (q: string) => void;
}
const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [q, setQ] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);
    onSearch(value);
  };
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
   <input
      className="border rounded-lg px-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder="Search experiences..."
        value={q}
        onChange={handleChange}
      />
      <button className="bg-yellow-400 text-black px-4 py-2 rounded-md">Search</button>
    </div>
  );
};
export default SearchBar;
