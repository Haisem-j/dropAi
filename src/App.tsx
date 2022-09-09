import React from "react";
import { RouterConfig } from "./navigation/RouterConfig";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
