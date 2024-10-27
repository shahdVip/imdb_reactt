// src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const Favorites = ({ removeFromFavorites }) => {
    const [favorites, setFavorites] = useState([]);
    const user = auth.currentUser; // Get the currently signed-in user

    useEffect(() => {
        if (user) {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
                const favoriteMovies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setFavorites(favoriteMovies);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleAddToFavorites = async (imdbID, title) => {
        if (user) {
            try {
                await addDoc(collection(db, 'users', user.uid, 'favorites'), { imdbID, title });
            } catch (error) {
                console.error("Error adding to favorites:", error);
            }
        }
    };

    const handleRemoveFromFavorites = async (id) => {
        if (user) {
            try {
                await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
                removeFromFavorites(id); // Optionally call the prop function
            } catch (error) {
                console.error("Error removing from favorites:", error);
            }
        }
    };

    return (
        <div id="favorites">
            <h2>My Favorite Movies</h2>
            <ul>
                {favorites.map((movie) => (
                    <li key={movie.id}>
                        {movie.title}
                        <button onClick={() => handleRemoveFromFavorites(movie.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
