import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CatalogPage from "./pages/CatalogPage";
import Authentication from "./pages/Authentication";
import MyListPage from "./pages/MyListPage";
import TitleDetailsPage, {loader as animeInfoLoader} from "./pages/TitleDetailsPage";
import HomePage from "./pages/HomePage";

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
        element: <TitleDetailsPage />,
        loader: animeInfoLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
