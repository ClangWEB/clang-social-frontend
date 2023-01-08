import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/icons/icons.css";
import "./styles/dark.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { legacy_createStore as createStore } from 'redux';
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducers";
const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById('root'));

// REMOVE ZEGOCLOUD DIV
const div = document.getElementById('preventTran');
div && (div.style.position = null)
div && (div.innerHTML = "")

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);