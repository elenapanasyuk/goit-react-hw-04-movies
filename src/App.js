import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Container from './components/Container';
import LoaderView from './components/Loader';

// import HomeView from './views/HomeView';
// import AuthorsView from './views/AuthorsView';
// import BooksView from './views/BooksView';
// import BookDetailsView from './views/BookDetailsView';
// import NotFoundView from './views/NotFoundView';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);

const MovieDetailsView = lazy(() =>
  import('./views/MovieDetailsView.js' /* webpackChunkName: "home-view" */),
);

function App() {
  return (
    <Container>
      <NavigationBar />
      <Suspense fallback={<LoaderView />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          {/* <Route path="/authors">
          <AuthorsView />
        </Route>



        <Route>
          <NotFoundView />
        </Route> */}
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
