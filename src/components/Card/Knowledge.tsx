import { CardModel } from "@/models/Card";
import Card from "./Card";
import "./knowledge.css";

interface KnowledgeProps {
  card: CardModel;
  isDragging: boolean;
  isSelected: boolean;
  mode: "default" | "create" | "delete";
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onClick: () => void;
  pos: {
    x: number;
    y: number;
  };
}

export default function Knowledge({ card, isDragging, isSelected, mode, pos, onPointerDown, onTouchStart, onClick }: KnowledgeProps) {
  return (
    <div 
      className={`knowledge-container ${isSelected ? `selected ${mode}` : ""}`}
      onPointerDown={onPointerDown}
      onTouchStart={onTouchStart}
      role="link" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onClick={onClick}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, zIndex: isDragging ? 1000 : 1, }}
    >
      <Card card={card} disableClick disableUserSelect isKnowledgeCard />
    </div>
  );
}