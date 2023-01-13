import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <HashRouter>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={{
            colors: {
              brandPink: ["#ee4e95"],
              brandYellow: ["#fcc301"],
            },
            primaryColor: "brandPink",
          }}
        >
          <App />
        </MantineProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
