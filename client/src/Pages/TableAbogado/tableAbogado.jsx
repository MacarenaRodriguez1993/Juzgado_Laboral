import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import Search from "../../Components/search";
import { deleteAbogado, getAllAbogados } from "../../Redux/actions";
import swal from "sweetalert";

const TableAbogados = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allAbogados = useSelector((state) => state.allAbogados);
  useEffect(() => {
    dispatch(getAllAbogados());
  }, [dispatch]);
  const deleted = (id) => {
    swal({
      title: "Estas seguro de liminar este Abogado?",
      text: "Una vez eliminado ya no tendra acceso",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await dispatch(deleteAbogado(id));
        swal("Abogado/a eliminado correctamente", { icon: "success" });
      }
      navigate("/perfil");
    });
  };
  return (
    <>
      <Navbar />
      <Search />
      <div class="table-responsive-sm">
        <table
          style={{ color: "#d8d6d6" }}
          className="container table  table-hover "
        >
          <thead className="text-center">
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Matricula</th>
              <th>Detalles</th>
            </tr>
          </thead>
          {allAbogados?.map((a) => {
            return (
              <tbody className="text-center ">
                <tr>
                  <th>{a.apellido}</th>
                  <th>{a.nombre}</th>
                  <th>{a.matricula}</th>
                  <th>
                    <Link to={`/updateAbogado/${a.id}`}>
                      <button className="btn btn-primary mx-1">
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => deleted(a.id)}
                      className="btn btn-danger mx-1"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default TableAbogados;
