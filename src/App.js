// src/App.js
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Auth from './components/Auth'; // Import the Auth component
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

const App = () => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const addToFavorites = (imdbID, title) => {
        const newFavorites = [...favorites, { imdbID, title }];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const removeFromFavorites = (imdbID) => {
        const newFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("User signed out successfully!");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="App">
            <h1>Mini IMDb Clone</h1>
            {user ? (
                <>
                    <Search addToFavorites={addToFavorites} />
                    <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
                    <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
                </>
            ) : (
                <Auth />
                )}
        </div>
    );
};

export default App;
