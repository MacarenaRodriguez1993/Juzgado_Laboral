import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
import app from "../firebase-config";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No hay provedor");
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const login = async (usuario) => {
    return signInWithEmailAndPassword(auth, usuario.email, usuario.password)
      .then((userCredential) => {
        const user = userCredential.user;
        swal({
          title: "Excelente!",
          text: "Sesion iniciada con exito!",
          icon: "success",
          button: "OK!",
        });
        localStorage.setItem("user", user.email);
        navigate("/perfil");
      })
      .catch((e) => {
        const err = e.code;
        swal({
          title: "Fallo!",
          text: `${err}`,
          icon: "warning",
          button: "ok!",
        });
      });
  };
  const logout = async () => {
    await signOut(auth).then((e) => {
      swal({
        title: "¿Estas seguro de cerrar sesion?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          localStorage.clear();
          navigate("/login");
          swal("Sesion Cerrada", {
            icon: "success",
          });
        }
      });
    });
  };
  return (
    <authContext.Provider value={{ login, logout }}>
      {children}
    </authContext.Provider>
  );
}
