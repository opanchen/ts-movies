import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LanguageProvider, SharedLayout, ThemeProvider } from "./components";

const Home = lazy(() => import("./pages/Home/Home"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));
const Trailers = lazy(() => import("./components/Trailers/Trailers"));
const Collection = lazy(() => import("./pages/Collection/Collection"));

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="trailers" element={<Trailers />} />
            </Route>
            <Route path="/collection" element={<Collection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
