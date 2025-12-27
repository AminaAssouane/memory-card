import { Card } from "./Card.jsx";

export function Board({ cards }) {
  return (
    <div className="layout">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          imgUrl={card.imgUrl}
          clicked={card.clicked}
        />
      ))}
    </div>
  );
}
