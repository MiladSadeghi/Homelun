import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import { registerSW } from "virtual:pwa-register";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
                <ToastContainer/>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
