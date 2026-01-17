import React from "react";

interface CardProps {
  name: string;
  date: string;
  description?: string;
  place?: string;
  size?: "small" | "large";
}

export const Card: React.FC<CardProps> = ({ name, date, description, place, size = "small" }) => {
  return (
    <article className="relative w-full rounded-2xl p-4 shadow-lg bg-gradient-to-r from-emerald-400 to-green-500 text-white overflow-hidden">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <time className="text-sm/6 bg-white/20 px-3 py-1 rounded-full">{date}</time>
      </div>

      {size === "large" && (
        <div className="mt-2 text-sm/6">
          {description && <p className="mb-1">{description}</p>}
          {place && <p className="opacity-90">{place}</p>}
        </div>
      )}
    </article>
  );
};

export default Card;
