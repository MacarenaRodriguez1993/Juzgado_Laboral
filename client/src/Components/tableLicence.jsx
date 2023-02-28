import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearDetailsLicencia,
  deleteLicencia,
  getAllLicencias,
} from "../Redux/actions";
import swal from "sweetalert";
import Order from "./order";
import OrderFecha from "./orderFecha";
import Active from "./active";
import OrderFechaF from "./orderFechaF";
const TableLicence = () => {
  const dispatch = useDispatch();
  const allLicencias = useSelector((state) => state.allLicencias);

  const user = localStorage.getItem("user");
  useEffect(() => {
    dispatch(getAllLicencias());
    dispatch(clearDetailsLicencia());
  }, [dispatch]);
  const deleted = (id) => {
    console.log(id);
    swal({
      title: "Estas seguro de liminar esta licencia?",
      text: "Una vez eliminado ya no tendra acceso",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await dispatch(deleteLicencia(id));
        swal("La licencia fue eliminada correctamente", { icon: "success" });
      }
    });
  };
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
                <th>{a.fechaI.slice(0, 10)}</th>
                <th className="text-center">{a.dias}</th>
                {/* <th>{format(new Date(a.fechaF), "dd-MM-yy")}</th> */}
                <th>{a.fechaF.slice(0, 10)}</th>
                <th className="text-center">
                  <Link to={`/details/${a.id}`}>
                    <button className="btn btn-success mx-1 ">
                      <i class="bi bi-eye"></i>
                    </button>
                  </Link>
                  {user && (
                    <Link to={`/updateLicencia/${a.id}`}>
                      <button className="btn btn-primary mx-1">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                    </Link>
                  )}
                  {user && (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => deleted(a.id)}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  )}
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
