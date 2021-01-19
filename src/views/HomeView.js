import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../services/moviesApi';
import MoviesList from '../components/MoviesList';

export default function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => {
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <h2>Trending Today</h2>

      {movies && <MoviesList movies={movies} />}
    </>
  );
}
