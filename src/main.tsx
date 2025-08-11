import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from "./pages/AppRouter.tsx";
import './index.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import queryClient from "./config/queryClient.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <AppRouter />
          {import.meta.env.DEV && <ReactQueryDevtools
                  initialIsOpen={false}
                  buttonPosition={'bottom-left'}
              />}
      </QueryClientProvider>
  </StrictMode>,
)
