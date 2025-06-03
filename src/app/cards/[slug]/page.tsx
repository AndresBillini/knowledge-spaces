"use client";

import { getCardById, getRelatedCards } from "@/api";
import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import { CardModel } from "@/models/Card";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CardPage() {
  const cardId = useSelector((state: RootState) => state.navigation.cardId);
  const [card, setCard] = useState<CardModel | null>(null);
  const [relatedCards, setRelatedCards] = useState<CardModel[]>([]);
  const isClient = typeof window !== 'undefined';

  const fetchCardData = useCallback(async () => {
    if (!isClient) return;
    if (!cardId) return;
    const cardData = await getCardById(cardId);
    const relatedCardsData = await getRelatedCards(cardId);

    setCard(cardData);
    setRelatedCards(relatedCardsData);
  }, [cardId, isClient])

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData])

  if (!cardId) return <p>No card selected.</p>;

  return (
    <div className="main-container">
      { card && (
        <Card card={card} disableClick />
      )}
      {
        relatedCards.length > 0 && (
          <>
            <h3 className="related-title">
              Related content
            </h3>
            <CardList cards={relatedCards} />
          </>
        )
      }
    </div>
  );
}