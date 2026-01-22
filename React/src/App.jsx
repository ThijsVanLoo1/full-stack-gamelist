import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/layout.jsx";
import Home from "./components/home.jsx";
import GameDetails from "./components/gameDetails.jsx";
import Collection from "./components/collection.jsx";
import Create from "./components/create.jsx";
import Error from "./components/error.jsx"

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
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
        path: "/games/create",
        element: <Create />,
      },
      {
        path: "/games/:id",
        element: <GameDetails />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App
