import React from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import List from "./components/List";
import ShowItem from "./components/ShowItem";

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/">
        <List />
      </Route>
      <Route path="/item/:id">
        <ShowItem />
      </Route>
    </div>
  );
}

export default App;
