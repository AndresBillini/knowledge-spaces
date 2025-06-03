"use client"

import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCards } from "@/redux/slices/savedCardsSlice";
import { addRelatedCard, removeRelatedCard } from "@/api";
import Knowledge from "@/components/Card/Knowledge";
import { useToast } from "@/components/Toast/ToastProvider";
import TextBoxEditor, { TextBox } from "@/components/TextBoxEditor/TextBoxEditor";
import "./knowledge-spaces.css";

export default function Spaces() {
  const dispatch = useDispatch();
  const toast = useToast();
  const cards = useSelector((state: RootState) => state.savedCards.savedCards);
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [mode, setMode] = useState<"default" | "create" | "delete">("default");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const dragCardId = useRef<number | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const stored = localStorage.getItem("positions");
    if (stored) {
      setPositions(JSON.parse(stored));
      return;
    }
  
    if (cards.length > 0) {
      const newPositions: Record<number, { x: number; y: number }> = {};
      cards.forEach((card, index) => {
        const x = 150 + (index % 5) * 260;
        const y = 100 + Math.floor(index / 5) * 200;
        newPositions[card.id] = { x, y };
      });
      setPositions(newPositions);
    }
  }, [cards]);

  const handlePointerDown = useCallback((id: number, e: React.PointerEvent<HTMLDivElement>) => {
    const canvasRect = document.querySelector(".canvas")!.getBoundingClientRect();
    dragCardId.current = id;
    setDraggedId(id);
    const pos = positions[id] ??
      {
        x: 150 + (cards.findIndex((c) => c.id === id) % 5) * 260,
        y: 100 + Math.floor(cards.findIndex((c) => c.id === id) / 5) * 200,
      };

    dragOffset.current = {
      x: e.clientX - canvasRect.left - pos.x,
      y: e.clientY - canvasRect.top - pos.y,
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }, [positions])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (dragCardId.current === null) return;
    const id = dragCardId.current;
    const canvasRect = document.querySelector(".canvas")!.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.current.x;
    const newY = e.clientY - canvasRect.top - dragOffset.current.y;
    setPositions((prev) => ({ ...prev, [id]: { x: newX, y: newY } }));
  }, []);

  const handlePointerUp = useCallback(() => {
    dragCardId.current = null;
    setDraggedId(null);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const handleCardClick = useCallback(async (cardId: number) => {
    if (mode === "default") return;

    if (selectedCard === null) {
      setSelectedCard(cardId);
      return;
    } 
    
    if (selectedCard !== cardId) {
      const fromId = selectedCard;
      const toId = cardId;
      
      const fromCard = cards.find((c) => c.id === fromId);
      const alreadyRelated = fromCard?.related.includes(toId) ?? false;

      try {
        if (mode === "create" && !alreadyRelated) await addRelatedCard(fromId, toId);
        if (mode === "delete" && alreadyRelated) await removeRelatedCard(fromId, toId);
      } catch (error) {
        toast(error as string, "error");
      }

      const updatedCards = cards.map((c) => {
        if (c.id !== fromId) return c;
        if (mode === "create" && !alreadyRelated) return { ...c, related: [...c.related, toId] };
        if (mode === "delete" && alreadyRelated) return { ...c, related: c.related.filter((id) => id !== toId) };
        return c;
      });

      dispatch(updateCards(updatedCards))

      setSelectedCard(null);
      setMode("default");
    }
  }, [cards, dispatch, mode, selectedCard, toast]);

  return (
    <>
      <div className="canvas">
        {textBoxes.map((box) => (
          <TextBoxEditor key={box.id} box={box} setTextBoxes={setTextBoxes} />
        ))}
        <svg className="connections">
          {cards.map((card) => {
            const from = positions[card.id];
            return card.related.map((relatedId) => {
              const to = positions[relatedId];
              if (from && to) {
                return (
                  <line
                    key={`${card.id}-${relatedId}`}
                    x1={from.x + 80}
                    y1={from.y + 40}
                    x2={to.x + 80}
                    y2={to.y + 40}
                    stroke="gray"
                  />
                );
              }
              return null;
            });
          })}
        </svg>
        {cards.map((card, index) => {
          const defaultX = 150 + (index % 5) * 220;
          const defaultY = 100 + Math.floor(index / 5) * 160;
          const pos = positions[card.id] ?? { x: defaultX, y: defaultY };

          return (
            <Knowledge 
              key={card.id} card={card} pos={pos}
              onPointerDown={(e) => {
                e.stopPropagation();
                handlePointerDown(card.id, e);
              }}
              isDragging={draggedId === card.id}
              isSelected={selectedCard === card.id}
              mode={mode}
              onClick={() => handleCardClick(card.id)}
            />
          );
        })}
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-line gray" /> Related content
        </div>
      </div>
      <div className="relationship-tools">
        <button onClick={() => setMode("create")} className={`create ${mode === "create" ? "active" : ""}`}>Create Relationship</button>
        <button onClick={() => setMode("delete")} className={`delete ${mode === "delete" ? "active" : ""}`}>Delete Relationship</button>
        <button onClick={() => {
          const id = Date.now();
          setTextBoxes(prev => [...prev, { id, x: 200, y: 200, text: "New note" }]);
        }}>
          + Add Text
        </button>
      </div>
    </>
  );
}
