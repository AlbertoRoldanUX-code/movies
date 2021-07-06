import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFetchMoviesHandler = async function () {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('https://swapi.dev/api/films');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message} (${res.status})`);
      }
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
          ...movie,
        };
      });

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError(err);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={onFetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <LoadingSpinner />}
        {error && <p>Something went wrong</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
