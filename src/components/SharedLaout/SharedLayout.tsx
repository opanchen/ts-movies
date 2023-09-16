import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../";

import css from "./SharedLayout.module.css";

export const SharedLayout: React.FC = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <AppBar />
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer></footer>
    </div>
  );
};
