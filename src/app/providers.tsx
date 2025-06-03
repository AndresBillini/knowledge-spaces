"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import NavBar from "@/components/NavBar/NavBar";
import { ToastProvider } from "@/components/Toast/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NavBar />
      <ToastProvider>
        {children}
      </ToastProvider>
    </Provider>
  );
}