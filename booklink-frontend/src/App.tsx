import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeInitial from './pages/HomeInitial';
import HomeSearch from './pages/HomeSearch';
import Details from './pages/Details';
import Favorites from './pages/Favorites';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomeInitial />} />
                <Route path="/search" element={<HomeSearch />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default App;
