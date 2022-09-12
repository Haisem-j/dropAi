import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = React.createContext<{
  createToast: (message: string) => void;
} | null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const createToast = (message: string): void => {
    toast(message);
  };
  const value = {
    createToast,
  };
  return (
    <ToastContext.Provider value={value}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
