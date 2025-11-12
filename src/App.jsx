// src/App.jsx
import React from "react";
import { FilterProvider } from "./context/FilterContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";
import ScrollToTop from "./components/utils/scrollToTop";


function App() {
  return (
    <FilterProvider>
      <AuthProvider>
        <ScrollToTop/>
          <AppRoutes />
       
      </AuthProvider>
    </FilterProvider>
  );
}

export default App;