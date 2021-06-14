import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Monitor } from "./pages/monitor";
const mainElement = document.getElementById("root");

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Monitor />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDom.render(<App />, mainElement);
