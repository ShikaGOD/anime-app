import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CatalogPage from "./pages/CatalogPage";
import Authentication from "./pages/Authentication";
import MyListPage from "./pages/MyListPage";
// import TitleDetailsPage, {loader as animeInfoLoader} from "./pages/TitleDetailsPage";
import HomePage from "./pages/HomePage";

const TitleDetailsPage = lazy(() => import("./pages/TitleDetailsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <Authentication /> },
      { path: "/my-list", element: <MyListPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      {
        path: "/catalog/:titleId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TitleDetailsPage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/TitleDetailsPage").then((module) => module.loader(meta)),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
