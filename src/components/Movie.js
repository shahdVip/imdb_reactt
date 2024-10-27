// src/components/Movie.js
import React from 'react';

const Movie = ({ movie, addToFavorites }) => {
    return (
        <div>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <button onClick={() => addToFavorites(movie.imdbID, movie.Title)}>Add to Favorites</button>
        </div>
    );
};

export default Movie;
