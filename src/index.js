import React, { StrictMode } from "react";
import { createRoot } from "react-dom";

import "./index.css";
import Game from "./components/game.js";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
    <StrictMode>
        <Game />
    </StrictMode>
);