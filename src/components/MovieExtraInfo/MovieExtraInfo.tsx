import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container, InnerNav } from "../";
import css from "./MovieExtraInfo.module.css";

export const MovieExtraInfo: React.FC = () => {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.wrapper}>
          <h2 className={`${css.heading} visually-hidden`}>
            Additional information
          </h2>
          <InnerNav />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </Container>
    </section>
  );
};
