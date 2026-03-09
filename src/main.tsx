import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/queryClient.ts";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./layout/router.tsx";
import { AuthProvider } from "./lib/context/AuthProvider.tsx";
import AuthBootstrap from "./layout/AuthBootstrap.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark">
          <AuthBootstrap>
            <RouterProvider router={router} />
          </AuthBootstrap>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
