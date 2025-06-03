import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardModel } from "@/models/Card";

type SavedCardsState = {
  savedCards: CardModel[];
};

const initialState: SavedCardsState = {
  savedCards: [],
};

export const savedCardsSlice = createSlice({
  name: "savedCards",
  initialState,
  reducers: {
    toggleCard(state, action: PayloadAction<CardModel>) {
      const newCard = action.payload;
      const findCard = state.savedCards.find((card) => card.id === newCard.id);
      if (findCard) {
        state.savedCards = state.savedCards.filter((card) => card.id !== newCard.id);
      } else {
        state.savedCards.push(newCard);
      }
    },
    updateCards(state, action: PayloadAction<CardModel[]>) {
      state.savedCards = action.payload;
    },
    clearSaved(state) {
      state.savedCards = [];
    },
  },
});

export const { toggleCard, updateCards, clearSaved } = savedCardsSlice.actions;
export default savedCardsSlice.reducer;