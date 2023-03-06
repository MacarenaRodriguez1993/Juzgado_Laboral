import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearDetailsLicencia, getAllLicencias } from "../Redux/actions";

import Order from "./order";
import OrderFecha from "./orderFecha";
import Active from "./active";
import OrderFechaF from "./orderFechaF";

const TableLicence = () => {
  const dispatch = useDispatch();
  const allLicencias = useSelector((state) => state.allLicencias);
  useEffect(() => {
    dispatch(getAllLicencias());
    dispatch(clearDetailsLicencia());
  }, [dispatch]);
  return (
    <div class="table-responsive-sm">
      <Active />
      <table className="container table" style={{ color: "#d8d6d6" }}>
        <thead className="text-left">
          <tr>
            <th>
              Abogado
              <Order />
            </th>
            <th>
              Inicio <OrderFecha />
            </th>
            <th className="text-center">Cantidad de dias</th>
            <th>
              Fin licencia <OrderFechaF />
            </th>
            <th className="text-center">Detalles</th>
          </tr>
        </thead>
        {allLicencias?.map((a) => {
          return (
            <tbody className="text-left ">
              <tr>
                <th>
                  {a.abogado.apellido} {a.abogado.nombre}
                </th>
                {/* <th>{format(new Date(a.fechaI), "dd-MM-yy")}</th> */}
                {/* <th>{new Date(a.fechaI).toUTCString().slice(0, 16)}</th> */}
                <th>{a.fechaI}</th>
                <th className="text-center">{a.dias}</th>
                {/* <th>{format(new Date(a.fechaF), "dd-MM-yy")}</th> */}
                <th>{new Date(a.fechaI).toUTCString().slice(0, 16)}</th>
                <th className="text-center">
                  <Link to={`/details/${a.id}`}>
                    <button className="btn btn-success mx-1 ">
                      <i class="bi bi-eye"></i>
                    </button>
                  </Link>
                </th>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default TableLicence;
