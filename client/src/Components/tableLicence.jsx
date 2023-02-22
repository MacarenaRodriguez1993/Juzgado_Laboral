import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearDetailsAbogado,
  clearDetailsLicencia,
  deleteLicencia,
  getAllAbogados,
  getAllLicencias,
} from "../Redux/actions";
import swal from "sweetalert";
const TableLicence = () => {
  const dispatch = useDispatch();
  const allLicencias = useSelector((state) => state.allLicencias);
  const allAbogados = useSelector((state) => state.abogados);
  useEffect(() => {
    dispatch(getAllLicencias());
    dispatch(getAllAbogados());
    dispatch(clearDetailsAbogado());
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
      <table
        className="container table  table-hover "
        style={{ color: "#d8d6d6" }}
      >
        <thead className="text-center">
          <tr>
            <th>Abogado</th>
            <th>Inicio</th>
            <th>Cantidad de dias</th>
            <th>Fin licencia</th>
            <th>Detalles</th>
          </tr>
        </thead>
        {allLicencias?.map((a) => {
          return (
            <tbody className="text-center ">
              <tr>
                {allAbogados?.map((b) => {
                  if (a.abogadoId === b.id) {
                    return (
                      <th>
                        {b.apellido} {b.nombre}
                      </th>
                    );
                  }
                })}

                <th>
                  {a.fechaI.slice(0, 10)}
                  {/* {format(new Date(a.fechaI), "yyyy-MMM-dd")} */}
                </th>
                <th>{a.dias}</th>
                <th>{a.fechaF.slice(0, 10)}</th>
                <th>
                  <Link to={`/details/${a.id}`}>
                    <button className="btn btn-success mx-1 ">Detalles</button>
                  </Link>
                  <Link to={`/updateLicencia/${a.id}`}>
                    <button className="btn btn-primary mx-1">Editar</button>
                  </Link>

                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleted(a.id)}
                  >
                    Eliminar
                  </button>
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
