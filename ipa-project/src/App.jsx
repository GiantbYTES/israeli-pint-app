import "./App.css";
import Business from "./Components/Business/Business";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { useState } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const [isAuthReady, setAuthReady] = useState(false);
  return (
    <AuthProvider onAuthReady={() => setAuthReady(true)}>
      <Routes>
        <Route
          path="/business-dashboard"
          element={
            <ProtectedRoute>
              <Business />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
