import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFetchMoviesHandler = useCallback(async function () {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('https://swapi.dev/api/films');
      // if (!res.ok) {
      //   throw new Error(`${data.message} (${res.status})`);
      // }
      if (!res.ok) {
        throw new Error(`Something went wrong`);
      }
      const data = await res.json();
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
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    onFetchMoviesHandler();
  }, [onFetchMoviesHandler]);

  const addMovieHandler = function (movie) {
    console.log(movie);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <LoadingSpinner />}
        {error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
