import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import { SignIn } from "./components/Login.tsx";
const Router = () => {
  //const Home = () => <h1 style={{ textAlign: "center" }}>Home2</h1>;
  // const Pets = () => <h1>Pet List</h1>;
  // const Layout = () => <h1>Layout</h1>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignIn />}></Route>
            <Route path="inicio" element={<App />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;