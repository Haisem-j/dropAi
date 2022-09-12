import React from "react";
import { RouterConfig } from "./navigation/RouterConfig";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/Toast";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <RouterConfig />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
