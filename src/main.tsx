import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import queryClient from "@/query/queryClient";
import "@/assets/styles/globals.css";
import "@/i18n/i18n";
import { ThemeProvider } from "@/context/themeProvider";

createRoot(document.getElementById("root")!).render(
  // default wrapper from React for development mode
  <StrictMode>
    {/* tanstack provider */}
    <QueryClientProvider client={queryClient}>
      {/* shadcn theme provider */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* react router provider */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
