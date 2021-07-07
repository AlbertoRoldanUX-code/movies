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
      const res = await fetch(
        'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );
      // if (!res.ok) {
      //   throw new Error(`${data.message} (${res.status})`);
      // }
      if (!res.ok) {
        throw new Error(`Something went wrong`);
      }
      const data = await res.json();

      const reformatData = Object.values(data);
      console.log(reformatData);

      setMovies(reformatData);
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

  const addMovieHandler = async function (movie) {
    const response = await fetch(
      'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    onFetchMoviesHandler();

    console.log(data);
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
