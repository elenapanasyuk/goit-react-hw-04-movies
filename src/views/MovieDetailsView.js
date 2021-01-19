import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchGetMovieDetails } from '../services/moviesApi';
import LoaderView from '../components/Loader';
import noImage from '../images/no-poster.jpg';
import s from './views.module.css';

const Review = lazy(() =>
  import('./ReviewsView' /* webpackChunkName: "review-view" */),
);
const Cast = lazy(() =>
  import('./CastView' /* webpackChunkName: "cast-view" */),
);

export default function MovieDetailsView() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchGetMovieDetails(movieId).then(movie => {
      setMovie(movie);
    });
  }, [movieId]);

  const onScrollPage = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1200);
  };
  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <>
      {movie && (
        <>
          <div className={s.moviecontainer}>
            <button onClick={handleGoBack} type="button" className={s.button}>
              Go back
            </button>
            <div className={s.moviecard}>
              <img
                className={s.poster}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : `${noImage}`
                }
                alt={movie.title}
              />
              <div className={s.movieinfo}>
                <h2 className={s.pageheading}>{movie.title}</h2>
                <p>User Score: {movie.vote_average} </p>
                <h3 className={s.pageheading}>Overview</h3>
                <p>{movie.overview}</p>
                <h3 className={s.pageheading}>Genres</h3>
                <p>{movie.genres.map(genre => genre.name).join(' / ')}</p>
              </div>
            </div>
            <div className={s.additionalsection}>
              <h3 className={s.pageheading}>Additional information</h3>
              <ul>
                <li>
                  <NavLink
                    className={s.link}
                    onClick={() => {
                      onScrollPage();
                    }}
                    to={{
                      pathname: `${url}/cast`,
                      state: { from: location?.state?.from ?? '/' },
                    }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={s.link}
                    onClick={() => {
                      onScrollPage();
                    }}
                    to={{
                      pathname: `${url}/reviews`,
                      state: { from: location?.state?.from ?? '/' },
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
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
