import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>node-api3-project</h1>
        <Route path="/users" component={Landing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
