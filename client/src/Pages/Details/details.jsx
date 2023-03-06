import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/navbar";
import { deleteLicencia, getLicencia } from "../../Redux/actions";
import swal from "sweetalert";
const Details = () => {
  const idLic = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const licencia = useSelector((state) => state.licenciaDetails);
  const abogado = useSelector((state) => state.allAbogados);
  const user = localStorage.getItem("user");
  //let feriados = [
  //  "2023,1,01",
  //  "2023,2,20",
  //  "2023,2,21",
  //  "2023,3,24",
  //  "2023,4,2",
  //  "2023,4,06",
  //  "2023,4,07",
  //  "2023,5,01",
  //  "2023,5,25",
  //  "2023,5,26",
  //  "2023,6,17",
  //  "2023,6,19",
  //  "2023,6,20",
  //  "2023,7,09",
  //  "2023,8,21",
  //  "2023,10,13",
  //  "2023,10,16",
  //  "2023,11,20",
  //  "2023,12,8",
  //  "2023,12,25",
  //];

  useEffect(() => {
    dispatch(getLicencia(idLic.id));
    console.log(idLic.id);
  }, [dispatch, idLic.id]);
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
        await dispatch(deleteLicencia(idLic.id));
        swal("La licencia fue eliminada correctamente", { icon: "success" });
        navigate("/home");
      }
    });
  };
  return (
    <>
      <Navbar />
      <Link to="/home">
        <button className="btn btn-dark">Volver</button>
      </Link>
      <div className="container">
        <h3>Licencia n° {idLic.id}</h3>
        <div className="  card bg-dark p-2">
          {abogado?.map((a) => {
            if (a.id === licencia.abogadoId) {
              return (
                <h1 className="text-center pb-2">
                  Abogado : {a.nombre} {a.apellido}
                </h1>
              );
            }
          })}

          <h4 className="text-center">Cantidad de dias : {licencia.dias}</h4>
          <div className="d-flex justify-content-around pt-2">
            <h4>
              Fecha de Inicio de Licencia :{" "}
              {new Date(licencia.fechaI).toUTCString().slice(0, 16)}{" "}
            </h4>
            <h4>
              Fin de Licencia :{" "}
              {new Date(licencia.fechaF).toUTCString().slice(0, 16)}
            </h4>
          </div>
          <div className="text-center">
            {user && (
              <Link to={`/updateLicencia/${idLic.id}`}>
                <button className="btn btn-primary  me-5">
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
              </Link>
            )}
            {user && (
              <button
                className="btn btn-danger mx-1"
                onClick={() => deleted(idLic.id)}
              >
                <i class="bi bi-trash"></i> Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
