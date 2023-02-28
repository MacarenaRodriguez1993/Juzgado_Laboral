import React from "react";

const Active = () => {
  const handleChange = (e) => {};
  return (
    <>
      <div className="container">
        <select name="active" id="active" onChange={(e) => handleChange(e)}>
          <option value="activos">Activos</option>
          <option value="todos">Todas las Licencias</option>
        </select>
      </div>
    </>
  );
};

export default Active;
