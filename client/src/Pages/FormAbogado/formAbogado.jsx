import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  crearAbogado,
  getAllAbogados,
  updateAbogado,
} from "../../Redux/actions";
import { useParams } from "react-router-dom";

const FormAbogado = () => {
  const dispatch = useDispatch();
  const idAbog = useParams();
  const allAbogados = useSelector((state) => state.allAbogados);
  const abogadoId = allAbogados.find((a) => a.id === parseInt(idAbog.id));
  const [abogado, setAbogado] = useState({
    nombre: abogadoId ? abogadoId.nombre : "",
    apellido: abogadoId ? abogadoId.apellido : "",
    matricula: abogadoId ? abogadoId.matricula : "",
  });
  useEffect(() => {
    dispatch(getAllAbogados());
  }, [dispatch]);

  const handleChange = (e) => {
    setAbogado({
      ...abogado,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idAbog.id) {
      abogado.id = idAbog.id;
      await dispatch(updateAbogado(abogado));
      swal({
        title: "Actualizacion exitosa!",
        text: `Abogado:${abogado.nombre} ${abogado.apellido}.
              Matricula:${abogado.matricula}`,
        icon: "success",
        button: "OK!",
      });
      setAbogado({
        nombre: "",
        apellido: "",
        matricula: "",
      });
    } else {
      await dispatch(crearAbogado(abogado));
      swal({
        title: "Abogado/a fue creado con exito!!",
        text: `Nombre : ${abogado.nombre} 
              Apellido :${abogado.apellido}.
              Matricuna : ${abogado.matricula}`,
        icon: "success",
        button: "OK!",
      });
      setAbogado({
        nombre: "",
        apellido: "",
        matricula: "",
      });
    }
  };
  return (
    <>
      <Navbar />
      <h1 class="d-flex justify-content-center pt-5">Cargar Abogado</h1>
      <form className="container pt-2" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          class="form-control mt-2 p-2"
          placeholder="Nombre "
          name="nombre"
          onChange={(e) => handleChange(e)}
          value={abogado.nombre}
          style={{ backgroundColor: "#C3B8B8" }}
          required
        />
        <input
          type="text"
          class="form-control mt-2 p-2"
          placeholder="Apellido "
          name="apellido"
          onChange={(e) => handleChange(e)}
          value={abogado.apellido}
          style={{ backgroundColor: "#C3B8B8" }}
          required
        />
        <input
          type="text"
          class="form-control mt-2 p-2"
          placeholder="Matricula"
          name="matricula"
          onChange={(e) => handleChange(e)}
          value={abogado.matricula}
          style={{ backgroundColor: "#C3B8B8" }}
          required
        />
        <button type="submit" class="btn btn-success mt-2 p-2 w-100">
          Cargar nuevo abogado
        </button>
      </form>
    </>
  );
};

export default FormAbogado;
