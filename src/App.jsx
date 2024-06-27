import React from "react";
import { Analytics } from '@vercel/analytics/react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import GifPage from "./pages/GifPage";
import Favorites from "./pages/Favorites";
import GifProvider from "./context/gif-context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <GifPage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={router} />
      <Analytics />
    </GifProvider>
  );
};

export default App;
