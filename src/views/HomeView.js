import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies } from '../services/moviesApi';
//import PageHeading from '../components/PageHeading/PageHeading';

export default function HomeView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => {
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <h2>Trending Today</h2>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
