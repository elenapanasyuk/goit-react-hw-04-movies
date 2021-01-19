import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Container from './components/Container';
import LoaderView from './components/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);

const MovieDetailsView = lazy(() =>
  import('./views/MovieDetailsView.js' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView.js' /* webpackChunkName: "movies-view" */),
);

function App() {
  return (
    <Container>
      <NavigationBar />
      <Suspense fallback={<LoaderView />}>
        <Switch>
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
