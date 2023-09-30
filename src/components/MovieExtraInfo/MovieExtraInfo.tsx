import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container, InnerNav, Spinner } from "../";
import { useLangState } from "src/hooks";
import css from "./MovieExtraInfo.module.css";

export const MovieExtraInfo: React.FC = () => {
  const { lang } = useLangState();

  return (
    <section className={css.section}>
      <Container>
        <div className={css.wrapper}>
          <h2 className={`${css.heading} visually-hidden`}>
            {lang === "en-US"
              ? "Additional information"
              : "Додаткова інформація"}
          </h2>
          <InnerNav />
          <div className={css.suspense}>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
};
