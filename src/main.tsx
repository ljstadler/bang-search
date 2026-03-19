import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router";

import { Index } from "./routes";
import { Bangs } from "./routes/bangs";
import { Search } from "./routes/search";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<Index />} />
                <Route path={"/bangs"} element={<Bangs />} />
                <Route path={"/search"} element={<Search />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
