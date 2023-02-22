import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className=" d-grid justify-content-center text-center pt-5">
      <h1 className="pt-5 fw-bolder">Bienvenidos</h1>
      <h3>
        <i class="bi bi-exclamation-triangle-fill"></i> Disclaimer{" "}
        <i class="bi bi-exclamation-triangle-fill"></i>
      </h3>
      <h5 className="pt-5">
        Esta pagina es de uso interno, no tiene valor legal
      </h5>
      <h4>Licencias Laboral III</h4>

      <Link to="/home">
        <button className="btn btn-success">Aceptar</button>
      </Link>
    </div>
  );
};

export default Landing;
