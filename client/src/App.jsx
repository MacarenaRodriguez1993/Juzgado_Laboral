import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import Landing from "../src/Pages/Landing/landing";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Perfil from "./Pages/Perfil/perfil";
import FormLicencia from "./Pages/FormLicencia/formLicencia";
import FormAbogado from "./Pages/FormAbogado/formAbogado";
import Details from "./Pages/Details/details";
import FormFeriado from "./Pages/FormFeriado/formFeriado";
import TableAbogados from "./Pages/TableAbogado/tableAbogado";
import { AuthProvider } from "./Context/authContext";
import { PrivateRoutes } from "./Context/routes";

const App = () => {
  return (
    <div className="inicio">
      <AuthProvider>
        <Routes>
          <Route exact strict path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/perfil"
            element={
              <PrivateRoutes>
                <Perfil />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/formAbogado"
            element={
              <PrivateRoutes>
                <FormAbogado />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/formLicencia"
            element={
              <PrivateRoutes>
                <FormLicencia />
              </PrivateRoutes>
            }
          />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/formFeriado" element={<FormFeriado />} />
          <Route
            exact
            path="/updateLicencia/:id"
            element={
              <PrivateRoutes>
                <FormLicencia />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/listaAbogados"
            element={
              <PrivateRoutes>
                <TableAbogados />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/updateAbogado/:id"
            element={
              <PrivateRoutes>
                <FormAbogado />
              </PrivateRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
