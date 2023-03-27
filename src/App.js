import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Layout/Header";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import Authentication from "./pages/Authentication";
import MyProfile from "./pages/MyProfile";


const router = createBrowserRouter([
  { path: '/', 
    element: <RootLayout />,
    children: [
      { path: '', element: <HomePage /> }
    ] },

    { path: 'auth', 
    element: <>
      <Header />
      <Authentication />
    </>
    }, 

    {
      path: 'profile',
      element: <>
      <Header />
      <MyProfile />
    </>
    }
])

function App() {
  return ( 
      <RouterProvider router={router} />
  );
}

export default App;
