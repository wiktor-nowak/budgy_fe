import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import App from "./App.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
