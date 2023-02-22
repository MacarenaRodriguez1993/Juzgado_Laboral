import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  crearLicencia,
  getAllAbogados,
  getFeriados,
  updateLicencia,
} from "../Redux/actions";
import swal from "sweetalert";
import { addBusinessDays, isWithinInterval, format } from "date-fns";
import { useParams } from "react-router-dom";
const FormularioLicencia = () => {
  const dispatch = useDispatch();
  const idLic = useParams();
  const allAbogados = useSelector((state) => state.allAbogados);
  const allFeriados = useSelector((state) => state.allFeriados);
  const allLicencias = useSelector((state) => state.allLicencias);
  const licenciaId = allLicencias.find((a) => a.id === parseInt(idLic.id));
  const [licencia, setLicencia] = useState({
    abogadoId: licenciaId ? licenciaId.abogadoId : "",
    fechaI: licenciaId ? licenciaId.fechaI.slice(0, 10) : "",
    dias: licenciaId ? licenciaId.dias : "",
    fechaF: licenciaId ? licenciaId.fechaF : "",
  });
  useEffect(() => {
    dispatch(getAllAbogados());
    dispatch(getFeriados());
  }, [dispatch]);
  const handleChange = (e) => {
    setLicencia({
      ...licencia,
      [e.target.name]: e.target.value,
    });
  };
  const fechaFinal = async () => {
    licencia.fechaF = addBusinessDays(new Date(licencia.fechaI), licencia.dias);
    let diasAux = parseInt(licencia.dias);
    for (let i = 0; i < allFeriados.length; i++) {
      if (
        isWithinInterval(new Date(allFeriados[i].fecha), {
          start: new Date(licencia.fechaI),
          end: licencia.fechaF,
        })
      ) {
        diasAux = diasAux + 1;
      }
    }
    licencia.fechaF = addBusinessDays(new Date(licencia.fechaI), diasAux);
    licencia.fechaF = format(licencia.fechaF, "yyyy-MM-dd");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idLic.id) {
      licencia.id = idLic.id;
      await fechaFinal();
      await dispatch(updateLicencia(licencia));
      swal({
        title: "Actualizacion exitosa!",
        text: `Abogado :${
          allAbogados.find((a) => a.id == licencia.abogadoId).apellido
        } ${allAbogados.find((a) => a.id == licencia.abogadoId).nombre}.
          Fecha de inicio ${licencia.fechaI.slice(0, 10)}.
          Cantidad de dias: ${licencia.dias}.
          Fecha de Finalizacion :${licencia.fechaF}`,
        icon: "success",
        button: "OK!",
      });
      setLicencia({
        abogadoId: "",
        fechaI: "",
        dias: "",
      });
    } else {
      await fechaFinal();
      await dispatch(crearLicencia(licencia));
      swal({
        title: "Licencia Creada con exito!",
        text: `Abogado :${
          allAbogados.find((a) => a.id == licencia.abogadoId).apellido
        } ${allAbogados.find((a) => a.id == licencia.abogadoId).nombre}.
        Fecha de inicio ${licencia.fechaI.slice(0, 10)}.
        Cantidad de dias: ${licencia.dias}
        Fecha de Finalizacion :${licencia.fechaF}`,
        icon: "success",
        button: "OK!",
      });
      setLicencia({
        abogadoId: "",
        fechaI: "",
        dias: "",
      });
    }
  };

  return (
    <>
      <h1 class="d-flex justify-content-center pt-5">
        Agregar nueva Licencia{" "}
      </h1>
      <form className="container " onSubmit={(e) => handleSubmit(e)}>
        <select
          class="form-select mt-3 pt-3"
          aria-label="Default select example"
          name="abogadoId"
          id="abogadoId"
          style={{ backgroundColor: "#C3B8B8" }}
          value={licencia.abogadoId}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Buscar Abogado</option>
          {allAbogados
            ?.sort((a, b) => (a.apellido < b.apellido ? -1 : 1))
            ?.map((a) => {
              return (
                <option value={`${a.id}`}>
                  {a.apellido} {a.nombre}
                </option>
              );
            })}
        </select>
        <label className=" mt-3 pt-3">Fecha de inicio</label>
        <input
          type="date"
          class="form-control mt-3 p-3"
          placeholder="Fecha de inicio "
          name="fechaI"
          value={licencia.fechaI}
          onChange={(e) => handleChange(e)}
          style={{ backgroundColor: "#C3B8B8" }}
        />
        <input
          type="number"
          class="form-control mt-3 p-3"
          placeholder="Cantidad de dias"
          name="dias"
          value={licencia.dias}
          onChange={(e) => handleChange(e)}
          style={{ backgroundColor: "#C3B8B8" }}
        />
        <button className="btn btn-success pt-2 mt-2 w-100">
          Cargar Licencia
        </button>
      </form>
    </>
  );
};
export default FormularioLicencia;
