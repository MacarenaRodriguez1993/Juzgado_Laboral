import { addBusinessDays, format, isWithinInterval } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Navbar from "../../Components/navbar";
import { getFeriados } from "../../Redux/actions";

const Calculadora = () => {
  const dispatch = useDispatch();
  const allFeriados = useSelector((state) => state.allFeriados);
  const [calcular, setCalcular] = useState({
    fecha: "",
    dias: "",
  });
  const handle = (e) => {
    setCalcular({
      ...calcular,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(getFeriados());
  }, [dispatch]);
  const fechaFinal = async () => {
    let diaAux = parseInt(calcular.dias) + 1;
    let resultado = addBusinessDays(new Date(calcular.fecha), diaAux);
    for (let i = 0; i < allFeriados.length; i++) {
      if (
        isWithinInterval(new Date(allFeriados[i].fecha), {
          start: new Date(calcular.fecha),
          end: resultado,
        })
      ) {
        diaAux = diaAux + 1;
      }
    }
    resultado = addBusinessDays(new Date(calcular.fecha), diaAux);
    resultado = format(resultado, "EEEE-dd-MMM-yyyy");
    calcular.fecha = format(new Date(calcular.fecha), "EEEE-dd-MMM-yyyy");
    swal({
      title: "Calculo de plazo",
      text: `El plazo inicia ${calcular.fecha}.
              El plazo se cumple el dia ${resultado}`,
    });
    setCalcular({
      fecha: "",
      dias: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fechaFinal();
  };
  return (
    <>
      <Navbar />
      <h1>Calcular </h1>
      <form className="container w-50" onSubmit={(e) => handleSubmit(e)}>
        <label>Ingresar fecha</label>
        <input
          type="date"
          class="form-control mt-3 p-3"
          name="fecha"
          value={calcular.fecha}
          style={{ backgroundColor: "#C3B8B8" }}
          onChange={(e) => handle(e)}
        />
        <input
          type="number"
          class="form-control mt-3 p-3"
          placeholder="Cantidad de dias"
          name="dias"
          value={calcular.dias}
          onChange={(e) => handle(e)}
          style={{ backgroundColor: "#C3B8B8" }}
        />
        <button className="btn btn-success pt-2 mt-2 w-50">Calcular</button>
      </form>
    </>
  );
};

export default Calculadora;
