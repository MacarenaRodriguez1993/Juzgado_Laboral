import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/navbar";
import {
  crearFeriado,
  getAllLicencias,
  updateLicencia,
} from "../../Redux/actions";
import swal from "sweetalert";
import { addBusinessDays, isWithinInterval } from "date-fns";
import { useNavigate } from "react-router-dom";
const FormFeriado = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allLicencias = useSelector((state) => state.allLicencias);
  const [feriado, setFeriado] = useState({
    fecha: "",
  });
  const handleChange = (e) => {
    setFeriado({
      ...feriado,
      [e.target.name]: e.target.value,
    });
  };
  const recalcular = async () => {
    await dispatch(getAllLicencias());
    for (let j = 0; j < allLicencias.length; j++) {
      if (
        isWithinInterval(new Date(feriado.fecha), {
          start: new Date(allLicencias[j].fechaI),
          end: new Date(allLicencias[j].fechaF),
        })
      ) {
        allLicencias[j].fechaF = addBusinessDays(
          new Date(allLicencias[j].fechaF),
          1
        );

        dispatch(updateLicencia(allLicencias[j]));
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(crearFeriado(feriado));
      swal({
        title: "Excelente!",
        text: `El feriado ${feriado.fecha}fue cargado con exito!`,
        icon: "success",
        button: "OK!",
      });
      recalcular();
      setTimeout(() => {
        navigate("/perfil");
      }, 2000);
    } catch (e) {
      swal({
        title: "Fallo!",
        text: "No se pudo agregar la fecha, intente nuevamente!",
        icon: "warning",
        button: "OK!",
      });
    }
  };
  useEffect(() => {
    dispatch(getAllLicencias());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <h1 class="d-flex justify-content-center pt-5">Agregar un feriado</h1>
      <form className="container pt-2 w-75" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="date"
          class="form-control mt-2 p-2"
          placeholder="Agregar feriado"
          name="fecha"
          onChange={(e) => handleChange(e)}
          value={feriado.fecha}
          style={{ backgroundColor: "#C3B8B8" }}
        />
        <button type="submit" class="btn btn-success mt-2 p-2 w-100">
          Agregar
        </button>
      </form>
      <div className="container ">
        <button className="btn btn-outline-warning m-5">Ver feriados</button>
      </div>
    </>
  );
};

export default FormFeriado;
