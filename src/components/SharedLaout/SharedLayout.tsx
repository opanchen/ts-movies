import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setGenres } from "src/redux/operations";
import { selectAllGenres } from "src/redux/selectors";
import {
  useAppDispatch,
  useAppSelector,
  useLangState,
  useThemeState,
} from "../../hooks";
import { AppBar, Container, Footer, ScrollUpBtn, Spinner } from "../";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./SharedLayout.module.css";

export const SharedLayout: React.FC = () => {
  const { theme } = useThemeState();
  const { lang } = useLangState();
  const dispatch = useAppDispatch();
  const allGenres = useAppSelector(selectAllGenres);

  useEffect(() => {
    if (allGenres[lang] && allGenres[lang].length !== 0) {
      // console.log(
      //   "Genres are already in redux-state. Do not dispatch! Return from func."
      // );
      return;
    }

    dispatch(setGenres(lang));
  }, [allGenres, dispatch, lang]);

  return (
    <div data-theme={theme} className={css.layout}>
      <header className={css.header}>
        <Container>
          <AppBar />
        </Container>
      </header>

      <main className={css["main-content"]}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>

      <ToastContainer autoClose={3000} />
      <ScrollUpBtn />

      <footer className={css.footer}>
        <Footer />
      </footer>
    </div>
  );
};
