import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Route, Switch } from "wouter";
import Index from "./routes";
import Search from "./routes/search";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Switch>
            <Route path={"/"} component={Index} />
            <Route path={"/search"} component={Search} />
        </Switch>
    </StrictMode>,
);
