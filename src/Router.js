import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import { SignIn } from "./components/Login.tsx";
import CreateUserForm from "./components/crearUsuario/crearUsuario";
import RegistrationSuccess from "./components/crearUsuario/RegistrationSuccess";
import VerificacionUsuario from "./components/crearUsuario/VerificacionUsuario";
import ResendEmailVerification from "./components/crearUsuario/ResendEmailVerification";
import ErrorSendEmailVerification from "./components/crearUsuario/ErrorSendEmailVerification";
import SuccessSendEmailVerification from "./components/crearUsuario/SuccessSendEmailVerification";
const Router = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignIn />}></Route>
            <Route path="inicio" element={<App />}></Route>
            <Route path="crear-usuario" element={<CreateUserForm />}></Route>
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/verification-email" element={<VerificacionUsuario />} />
            <Route path="/error-send-email-verification" element={<ErrorSendEmailVerification />} />
            <Route path="/resend-email-verification/:username" element={<ResendEmailVerification />} />
            <Route path="/success-send-email-verification" element={<SuccessSendEmailVerification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;