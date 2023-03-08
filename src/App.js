import React from "react";
import { NavBar } from "./components/NavBar.jsx";
import {TablaUsuarios} from "./components/Tables.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <TablaUsuarios/>
    </div>
  );
}

export default App;
