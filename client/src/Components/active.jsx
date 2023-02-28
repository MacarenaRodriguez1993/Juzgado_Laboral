import React from "react";
import { useDispatch } from "react-redux";
import { activaLicencias } from "../Redux/actions";

const Active = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(activaLicencias(e.target.value));
  };

  return (
    <>
      <div className="container">
        <select name="active" id="active" onChange={(e) => handleChange(e)}>
          <option value="activos">Activos</option>
          <option value="todos" selected>
            Todas las Licencias
          </option>
        </select>
      </div>
    </>
  );
};

export default Active;
