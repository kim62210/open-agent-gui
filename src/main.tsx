import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { AppProviders } from "./app/providers";
import { router } from "./app/router";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element '#root' was not found.");
}

createRoot(container).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
