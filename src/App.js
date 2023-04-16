import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import Authentication from "./pages/Authentication";
import MyProfile from "./pages/MyProfile";
import TitleDetails from "./components/Titles/TitleDetails/TitleDetails";
import Home from "./components/Layout/Home";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth', element: <Authentication />},
      { path: '/profile', element: <MyProfile />},
      { path: '/titleDetail/:titleId', element: <TitleDetails />}, 
      { path: '/list', element: <HomePage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
