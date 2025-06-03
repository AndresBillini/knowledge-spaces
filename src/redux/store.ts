import { configureStore } from "@reduxjs/toolkit";
import savedCardsReducer from "./slices/savedCardsSlice";
import navigationReducer from "./slices/navigationSlice";

export const store = configureStore({
  reducer: {
    savedCards: savedCardsReducer,
    navigation: navigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;