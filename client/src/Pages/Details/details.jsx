import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/navbar";
import {
  clearDetailsLicencia,
  getAllAbogados,
  getLicencia,
} from "../../Redux/actions";

const Details = (props) => {
  const idLic = useParams();
  const dispatch = useDispatch();
  const licencia = useSelector((state) => state.licenciaDetails);
  const abogado = useSelector((state) => state.allAbogados);
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
    console.log(idLic);
    dispatch(getLicencia(idLic.id));
  }, [dispatch, idLic.id]);

  return (
    <>
      <Navbar />
      <Link to="/home">
        <button>volver</button>
      </Link>
      <div className="container">
        <h3>Licencia n° {idLic.id}</h3>
        <div className="  card bg-dark p-2">
          {abogado?.map((a) => {
            console.log(licencia.abogadoId);
            if (a.id === licencia.abogadoId) {
              return (
                <h1 className="text-center pb-2">
                  Abogado : {a.nombre} {a.apellido}
                </h1>
              );
            }
          })}
          {/* {licencia.abogado.apellido} */}
          {
            <h1>
              {apellido}
              {nombre}
            </h1>
          }
          <h4>Fecha de Inicio de Licencia: {licencia.fechaI}</h4>
          <h4>Cantidad de dias : {licencia.dias}</h4>
          <div className="d-flex justify-content-around pt-2">
            <h4>Fecha de Inicio de Licencia : {licencia.fechaI} </h4>
            <h4>Fin de Licencia : {licencia.fechaF}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
