import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import all CSS files
import "./styles/index.css";

import { AuthProvider } from "./context/AuthContext";

// import "./styles/base/variables.css";
// import "./styles/base/reset.css";
// import "./styles/base/typography.css";
// import "./styles/components/buttons.css";
// import "./styles/components/cards.css";
// import "./styles/components/sections.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <ToastProvider> */}
          <App />
        {/* </ToastProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
