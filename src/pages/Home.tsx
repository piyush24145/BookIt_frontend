import React, { useEffect, useState } from "react";
import { getExperiences } from "../api/api";
import SearchBar from "../components/SearchBar";
import ExperienceCard from "../components/ExperienceCard";
const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getExperiences();
      const data = res.data?.data || res.data || [];
      setExperiences(data);
      setFiltered(data);
    } catch (e: any) {
      console.error("Error fetching experiences:", e);
      setErr("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const onSearch = (q: string) => {
    if (!q.trim()) return setFiltered(experiences);
    setFiltered(
      experiences.filter((e) =>
        String(e.title || e.location || "").toLowerCase().includes(q.toLowerCase())
      )
    );
  };
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (err) return <div className="p-8 text-center text-red-500">{err}</div>;
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-600">Bookit Experiences</h1>
      <SearchBar onSearch={onSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
   {filtered.length ? (
   filtered.map((exp) => <ExperienceCard key={exp._id} experience={exp} />)
   ) : (
    <div className="col-span-3 text-center text-gray-500">No experiences found.</div>
 )}
  </div>
    </div>
  );
};
export default Home;
