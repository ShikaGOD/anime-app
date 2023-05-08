import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ListPage from "./pages/ListPage";
import Authentication from "./pages/Authentication";
import MyListPage from "./pages/MyListPage";
import TitleDetails from "./components/Titles/TitleDetails/TitleDetails";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <Authentication /> },
      { path: "/my-list", element: <MyListPage /> },
      { path: "/list", element: <ListPage />},
      { path: "/titleInfo/:titleId", element: <TitleDetails /> },
    ],
  },
]);

function App() {
  
  return (
 
      <RouterProvider router={router} />

  );
}

export default App;
