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
    <article className="border rounded-md p-4 bg-white w-full">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <time className="text-sm text-gray-500">{date}</time>
      </div>

      {size === "large" && (
        <div className="mt-2 text-sm text-gray-700">
          {description && <p className="mb-1">{description}</p>}
          {place && <p className="text-sm text-gray-500">{place}</p>}
        </div>
      )}
    </article>
  );
};

export default Card;
