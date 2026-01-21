import {createBrowserRouter, RouterProvider} from "react-router";
import './App.css'

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
        element: <Home />,
      },
      {
        path: "/games/create",
        element: <Form />,
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
