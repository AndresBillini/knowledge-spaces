import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { RootState } from "@/redux/store";
// As a basic setup, import your same slice reducers
import savedCards from "@/redux/slices/savedCardsSlice";
import navigation from "@/redux/slices/navigationSlice";

export const rootReducer = combineReducers({
  savedCards,
  navigation,
})

const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

type AppStore = ReturnType<typeof setupStore>

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}