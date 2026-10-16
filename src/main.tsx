import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Import Base Level Styles
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/animations.css";
import "./styles/typography.css";
import "./styles/responsive.css";
import "./styles/cursor.css";
import "./styles/buttons.css";
import "./styles/boot.css";
import "./styles/utilities.css";
import "./styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
