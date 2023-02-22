import React, { useState } from "react";
import { useAuth } from "../../Context/authContext";

const Login = () => {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usuario);
  };
  return (
    <div className="container pt-5 w-50">
      <h1>Iniciar Sesion</h1>
      <form id="login" onSubmit={(e) => handleSubmit(e)}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control "
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            value={usuario.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            name="password"
            id="exampleInputPassword1"
            onChange={(e) => handleChange(e)}
            value={usuario.password}
          />
        </div>
        <button type="submit" class="btn btn-success">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
