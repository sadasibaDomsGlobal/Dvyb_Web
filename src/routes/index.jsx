import { Routes, Route } from "react-router-dom";
import WomenwearRoute from "./WomenwearRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WomenwearRoute />} />
      <Route path="/womenwear" element={<WomenwearRoute />} />
      {/* Add more routes here */}
    </Routes>
  );
}