import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeInitial from "./pages/HomeInitial";
import HomeSearch from "./pages/HomeSearch";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Header from "./components/header";

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // Redirige a login después de cerrar sesión
  };

  return (
    <Router>
      <Routes>
        {/* Redirección de "/" a "/home" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas sin Header */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas con Header */}
        <Route
          path="/home"
          element={
            <>
              <Header onLogout={handleLogout} />
              <HomeInitial />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Header onLogout={handleLogout} />
              <HomeSearch />
            </>
          }
        />
        <Route
          path="/details/:id"
          element={
            <>
              <Header onLogout={handleLogout} />
              <Details />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Header onLogout={handleLogout} />
              <Favorites />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
