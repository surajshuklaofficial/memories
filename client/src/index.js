import React from "react";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"

import "./index.css";
import App from "./App";
import { reducers } from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
)