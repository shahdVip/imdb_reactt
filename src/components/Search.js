// src/components/Search.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const Search = ({ removeFromFavorites }) => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const apiKey = 'fd04c79a'; // Your API key

    const searchMovies = async () => {
        if (query.length > 2) {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        }
    };

    const handleAddToFavorites = async (imdbID, title) => {
        const user = auth.currentUser; // Get the currently signed-in user
        if (user) {
            try {
                await addDoc(collection(db, 'users', user.uid, 'favorites'), { imdbID, title });
            } catch (error) {
                console.error("Error adding to favorites:", error);
            }
        } else {
            alert("You must be signed in to add favorites!");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
            />
            <div id="results">
                {movies.map(movie => (
                    <div key={movie.imdbID}>
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                        <button onClick={() => handleAddToFavorites(movie.imdbID, movie.Title)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
