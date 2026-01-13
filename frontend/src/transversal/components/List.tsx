import React from "react";
import Card from "./Card";

interface MappedCard {
  name: string;
  date: string;
  description?: string;
  place?: string;
}

interface ListProps<T> {
  items: T[];
  columns?: number;
  cardSize?: "small" | "large";
  mapItemToCard: (item: T) => MappedCard;
}

export function List<T>({ items, columns = 1, cardSize = "small", mapItemToCard }: ListProps<T>) {
  // Build responsive grid classes. Avoid dynamic strings that Tailwind cannot detect by mapping.
  const classes = ["grid", "gap-4", "w-full"];

  // Always ensure at least 1 column on smallest screens
  classes.push("grid-cols-1");

  if (columns >= 2) classes.push("sm:grid-cols-2");
  if (columns >= 3) classes.push("lg:grid-cols-3");
  if (columns >= 4) classes.push("xl:grid-cols-4");

  return (
    <div className={classes.join(" ") + " max-w-full"}>
      {items.map((item, idx) => {
        const card = mapItemToCard(item);
        return (
          <div key={(card.name || idx) + "-" + idx} className="w-full">
            <Card name={card.name} date={card.date} description={card.description} place={card.place} size={cardSize} />
          </div>
        );
      })}
    </div>
  );
}

export default List;
