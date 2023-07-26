import React from "react";
import { NavBar } from "./components/NavBar.tsx";
import {TablaUsuarios} from "./components/Tables.jsx";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <NavBar />
      <TablaUsuarios/>
      <ToastContainer /> {/* Agrega el componente aquí */}
    </div>
  );
}

export default App;
