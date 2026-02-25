import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserDetails />} />

      {/* Fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;