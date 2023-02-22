import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
const Navbar = () => {
  const user = localStorage.getItem("user");
  const { logout } = useAuth();
  const loguot = () => {
    logout();
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg p-2">
        <div class="container-fluid">
          <Link to="/home" style={{ color: "#dbd8d8" }}>
            <i class="bi bi-bank" style={{ fontSize: "1.5rem" }}></i>
          </Link>
          <h4 className="p-2">Licencias Laboral III</h4>
          <button
            class="btn btn-success navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-person-fill"></i>
          </button>
          <div
            class="collapse navbar-collapse "
            style={{ justifyContent: "end" }}
          >
            {user && (
              <Link to="/perfil">
                <button className="btn btn-warning m-2">Admin </button>
              </Link>
            )}
            {user ? (
              <button className="btn btn-danger" onClick={loguot}>
                Salir
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-success">Ingresar</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
