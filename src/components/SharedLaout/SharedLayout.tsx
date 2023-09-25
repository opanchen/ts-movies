import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useThemeState } from "../../hooks";
import { AppBar, Container } from "../";
import css from "./SharedLayout.module.css";

export const SharedLayout: React.FC = () => {
  const { theme } = useThemeState();
  return (
    <div data-theme={theme} className={css.layout}>
      <header className={css.header}>
        <Container>
          <AppBar />
        </Container>
      </header>

      <main className={css["main-content"]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className={css.footer}></footer>
    </div>
  );
};
