import "./App.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { useState } from "react";

function App() {
  const [isAuthReady, setAuthReady] = useState(false);
  return (
    <AuthProvider onAuthReady={() => setAuthReady(true)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
