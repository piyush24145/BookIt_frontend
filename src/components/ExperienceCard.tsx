import React from "react";
import { useNavigate } from "react-router-dom";
interface Exp {
  _id: string;
title: string;
location?: string;
  price?: number;
  description?: string;
  images?: string[];
}
const ExperienceCard: React.FC<{ experience: Exp }> = ({ experience }) => {
 const nav = useNavigate();
 const getDescription = () => {
  const title = experience.title.toLowerCase();
   if (title.includes("kayak"))
     return "Enjoy peaceful kayaking through mangrove forests with certified guide.";
    if (title.includes("desert"))
     return "Ride through golden sand dunes and enjoy cultural performances.";
   if (title.includes("coffee"))
      return "Walk through lush coffee plantations and taste freshly brewed coffee.";
  if (title.includes("scuba"))
     return "Explore the underwater world with certified scuba instructors.";
  if (title.includes("para"))
     return "Fly over the beautiful valleys and feel the thrill of paragliding.";
    if (title.includes("snow"))
      return "Experience the thrill of skiing on fresh snow slopes of Gulmarg.";
    if (title.includes("triund"))
    return "Trek through pine forests and camp under the stars at Triund Hill.";
   if (title.includes("cycling"))
     return "Cycle through the charming French streets of Pondicherry.";
   if (title.includes(" cruise"))
     return "Sail through the peaceful backwaters of Kerala.";
     if (title.includes("ziplining"))
      return "Soar across the forest canopy with an exciting ziplining experience.";
    if (title.includes("bunj") || title.includes("jump"))
      return "Curated small-group experience. Certified guide. Safety first with gear included.";
    return "Curated small-group experience. Certified guide. Safety first with gear included.";
  };
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-3">
      <div className="h-44 rounded-md overflow-hidden bg-gray-100">
   <img
   src={experience.images?.[0] || "/placeholder.png"}
    alt={experience.title}
     className="w-full h-full object-cover"/>
     </div>
    <div className="mt-3">
     <div className="flex items-center justify-between">
   <h3 className="font-semibold text-base">{experience.title}</h3>
    {experience.location && (
     <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
           {experience.location}
      </span>
     )}</div>
        <p className="text-sm text-gray-500 mt-1">{getDescription()}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
   <p className="text-sm">
       From <span className="font-semibold text-black">₹{experience.price ?? "-"}</span>
    </p>
    <button
     onClick={() => nav(`/details/${experience._id}`)}
    className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium px-3 py-1 rounded" >
     View Details
    </button>
    </div>
    </div>
  );
};
export default ExperienceCard;
