// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfiguracoesContextProvider } from "./contexts/configuracoesContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ConfiguracoesContextProvider>
    <App />
  </ConfiguracoesContextProvider>,
  // </StrictMode>,
);
