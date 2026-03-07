import React from 'react';
import { cardsData } from '../data/mockdata';

function Card() {
     const cards = cardsData[0].cards;
    const cardvars = cards.map((card) => {
  return Object.entries(card)
    .filter(([key]) => !["id", "title", "icon"].includes(key))
    .map(([key, value]) => {
      
      let style = "text-sm text-gray-500";

      if (key === "value") {
        style = "text-3xl font-bold text-blue-500";
      }

      if (key === "Students") {
        style = "text-green-500 font-medium";
      }

      if (key === "employed") {
        style = "text-blue-500 font-medium";
      }

      if (key === "unemployed") {
        style = "text-red-500 font-medium";
      }

      if (key === "Male") {
        style = "text-indigo-500";
      }

      if (key === "Female") {
        style = "text-pink-500";
      }

      return (
        <p key={key} className={style}>
          {key}: {value}
        </p>
      );
    });
});

 
const cardComponents = cards.map((card) => {
    const Icon = card.icon;
      const fields = Object.entries(card)
    .filter(([key]) => !["id", "title", "icon"].includes(key));
    return (
<div
  key={card.id}
  className="flex items-start justify-start m-2 min-w-[350px] min-h-[150px] bg-card text-textprimary border border-border-x rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
>
  <div className="p-2 bg-card border border-border-x rounded-lg">
    {Icon && <Icon className="h-[20px] w-[20px] rounded-full p-1" />}
  </div>

  <div className="ml-3 flex flex-col gap-2">
    <h1 className="text-textprimary text-base font-semibold">
      {card.title}
    </h1>

    <h1 className="text-textsecondary text-lg font-bold">
      {card.value}
    </h1>

    <div className="text-textsecondary text-sm italic font-medium">
      {fields.map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  </div>
</div>
    );
  });
 
  return (
<main className="flex-1 w-full p-4">
  <div id="title">
    <h1 className="text-2xl font-bold text-textprimary mb-4">
      Admin Dashboard
    </h1>
  </div>

  <div id="cards" className="flex justify-around flex-wrap gap-4 w-full">
    {cardComponents}
  </div>
</main>
  );
}

export default Card;