import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavigationState = {
  cardId: number | null;
};

const initialState: NavigationState = {
  cardId: null,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    saveCardId(state, action: PayloadAction<number>) {
      state.cardId = action.payload;
    }
  }
});

export const { saveCardId } = navigationSlice.actions;
export default navigationSlice.reducer;