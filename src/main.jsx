import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Notes from "./pages/Notes.jsx";
import Home from "./pages/Home.jsx";
import { StrictMode } from "react";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/notes",
          element: <Notes />,
        },
        {
          path: "*", // Catch-all route
          element: <Home />, // Redirect unknown paths to Home
        },
      ],
    },
  ],
  {
    basename: "/Keep-Notes/",
    future: {
      v7_partialHydration: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
