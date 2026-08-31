"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = "login" | "contact" | null;

interface ModalContextValue {
  activeModal: ModalType;
  openLogin: () => void;
  openContact: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openLogin: () => setActiveModal("login"),
        openContact: () => setActiveModal("contact"),
        close: () => setActiveModal(null),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
