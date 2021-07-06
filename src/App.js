import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  const onFetchMoviesHandler = async function () {
    try {
      const res = await fetch('https://swapi.dev/api/films');
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      console.log(data.results);
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
          ...movie,
        };
      });

      setMovies(transformedMovies);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={onFetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
