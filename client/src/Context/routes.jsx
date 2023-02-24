import { useNavigate } from "react-router-dom";

export function PrivateRoutes({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  if (user === null) {
    setTimeout(() => {
      navigate("/login");
    }, 1);
    //return navigate("/login");
  }

  return <>({children})</>;
}
