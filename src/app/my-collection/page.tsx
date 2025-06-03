"use client"

import { useSelector } from "react-redux";
import CardList from "@/components/CardList/CardList";
import { RootState } from "@/redux/store";
import "./my-collection.css";

export default function MyCollection() {
  const savedCards = useSelector((state: RootState) => state.savedCards.savedCards);

  return (
    <main className="main-container">
      <h1 className="heading">My Collection</h1>

      {
        savedCards.length > 0 ? (
          <CardList cards={savedCards} />
        ) : (
          <p>No saved cards yet.</p>
        )
      }
    </main>
  );
}