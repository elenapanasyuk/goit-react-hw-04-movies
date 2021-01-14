import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { fetchGetMovieDetails } from '../services/moviesApi';
import LoaderView from '../components/Loader';
import noImage from '../images/no-poster.jpg';

const Review = lazy(() =>
  import('./ReviewsView' /* webpackChunkName: "review-view" */),
);
const Cast = lazy(() =>
  import('./CastView' /* webpackChunkName: "cast-view" */),
);

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchGetMovieDetails(movieId).then(movie => {
      setMovie(movie);
    });
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : `${noImage}`
            }
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average} </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(' / ')}</p>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>

          <Suspense fallback={<LoaderView />}>
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>
            <Route path={`${path}/reviews`}>
              <Review movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
