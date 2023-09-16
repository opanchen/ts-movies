import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const SharedLayout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <p>Nav link</p>
            </li>
            <li>
              <p>Nav link</p>
            </li>
          </ul>
        </nav>
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
