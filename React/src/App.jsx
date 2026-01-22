import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/layout.jsx";
import Home from "./components/home.jsx";
import GameDetails from "./components/gameDetails.jsx";
import Collection from "./components/collection.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/games",
        element: <Collection />,
      },
      {
        path: "/games/:id",
        element: <GameDetails />,
      },
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App
