import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage, { action } from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";

const router = createHashRouter([
  {
    path: "/",
    children: [
      { index: true, action: action, element: <LandingPage /> },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
