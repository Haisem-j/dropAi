import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = React.createContext<{
  createToast: (message: string) => void;
  toastError: (message: string) => void;
} | null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const createToast = (message: string): void => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastError = (message: string): void => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const value = {
    createToast,
    toastError,
  };
  return (
    <ToastContext.Provider value={value}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};
