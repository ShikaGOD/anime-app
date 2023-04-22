import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
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
      { path: "/titleInfo/:titleId", element: <TitleDetails /> },
      { path: "/list", element: <ListPage /> },
    ],
  },
]);

function App() {
  
  return (
 
      <RouterProvider router={router} />

  );
}

export default App;
