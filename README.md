# Cinema App

**[VIEW LIVE PAGE](https://opanchen.github.io/ts-movies/)**

The application gives the user an opportunity to find information about movies, follow trends, watch video trailers, save favorite articles in a personal collection based on local storage, etc.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2kwNnJ0ZXJjOG9lcmJpanc1amQza2loZXM4YXA5eWw1cWw3c2NrYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ueJ5c10B2BCQdunMfW/giphy-downsized-large.gif)

## Creating

This project was created with [Create React App](https://github.com/facebook/create-react-app) and [Typescript](https://www.typescriptlang.org/docs/). To get
acquainted and configure additional features
[refer to documentation](https://facebook.github.io/create-react-app/docs/getting-started).

`npm install --save typescript @types/react @types/react-dom` command was used to implement types in the project. Also for initial configuration was created file **`tsconfig.json`**.

Added **`404.html`** file and the corresponding script in index.html to handle the 404 error when the page is reloaded.

App routing and navigation structure was inplemented with [React Router Dom](https://www.npmjs.com/package/react-router-dom) using additional types package `npm install --save-dev @types/react-router-dom` and code splitting with **`React.lazy`** & **`React.Suspense`**.

**`@types`** folder was created in the root derictory with files **`custom.d.ts`** & **`declaration.d.ts`** to be able to use correctly non-js files (`.svg`, `.png`, `.css`, etc) and implement imports for them.

As global data source was used **[TMDB](https://www.themoviedb.org/)** service. All fetch operations were implemented in **`moviesAPI.ts`** file.

Storing genres or movies data was implemented using [RTK](https://redux-toolkit.js.org/usage/usage-with-typescript) and [Redux Persist](https://www.npmjs.com/package/redux-persist). Special typed hooks **`UseAppDispatch()`** and **`UseAppSelector()`** were created and used inside components instead of the usual ones for correct app work.

The changes of UI theme mode or language mode were implemented with [React Context Provider](https://react.dev/reference/react/createContext) and custom hooks **`UseYhemeState()`** & **`UseLangState()`**.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXBtdnRxZ29oampyeTgzNmVyd2g0N2JkYXBybGRsZDFsMndqNDU5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jBPb529xc6eckP33YH/giphy-downsized-large.gif) ![](https://media.giphy.com/media/fKAs57AyI7bNg4YMdf/giphy-downsized-large.gif)

## Dependencies and technologies

- _Axios_
- _gh-pages_
- _React_
- _React Dom_
- _React Helmet_
- _React Icons_
- _React loader spinner_
- _React Player_
- _React Redux_
- _React Router Dom_
- _React Slick_
- _React Toastify_
- _Redux Persist_
- _Redux Toolkit_
- _Slick Carousel_
- _Typescript_

... and more. Full list of dependencies and additional information is available in **`package.json`** file.
