import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Container } from "../";

import css from "./SharedLayout.module.css";
import { useThemeState } from "../../hooks";

export const SharedLayout: React.FC = () => {
  const { theme } = useThemeState();
  return (
    <div data-theme={theme} className={css.layout}>
      <div>
        <header className={css.header}>
          <Container>
            <AppBar />
          </Container>
        </header>

        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>

        <footer></footer>
      </div>
    </div>
  );
};