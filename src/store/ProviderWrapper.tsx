// components/ProviderWrapper.tsx
"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";
import Header from "@/components/Header"; // Global Header

interface ProviderWrapperProps {
  children: ReactNode;
}

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <Provider store={store}>
      <Header />
      {children}{" "}
      {/* This renders the child pages/components inside the wrapper */}
    </Provider>
  );
}
