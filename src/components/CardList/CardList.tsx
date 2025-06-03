import { CardModel } from "@/models/Card";
import Card from "../Card/Card";
import "./card-list.css";

interface CardListProps {
  cards: CardModel[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <ul className="cardlist-container">
      {cards.map((card) => (
        <Card key={`${card.id}-${card.created_at}`} card={card} />
      ))}
    </ul>
  )
}