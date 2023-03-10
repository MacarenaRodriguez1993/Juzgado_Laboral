import axios from "axios";
export const GET_ALL_ABOGADOS = "GET_ALL_ABOGADOS";
export const GET_ABOGADO = "GET_ABOGADO";
export const GET_ALL_LICENCIAS = "GET_ALL_LICENCIAS";
export const GET_LICENCIA = "GET_LICENCIA";
export const CLEAR_DETAILS_ABOGADO = "CLEAR_DETAILS_ABOGADO";
export const CLEAR_DETAILS_LICENCIA = "CLEAR_DETAILS_LICENCIA";
export const GET_FERIADOS = "GET_FERIADOS";
export const GET_ABOGADO_BY_NAME = "GET_ABOGADO_BY_NAME";
export const DELETE_LICENCIA = "DELETE_LICENCIA";
export const DELETE_ABOGADO = "DELETE_ABOGADO";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDEN_FECHAI = "ORDEN_FECHAI";
export const ORDEN_FECHAF = "ORDEN_FECHAF";
export const SEARCH = "SEARCH";
export const ACTIVE_LICENCIA = "ACTIVE_LICENCIA";
export const ERROR = "ERROR";
const api_URL = "https://juzgado.up.railway.app";
//const api_URL = "http://localhost:3001";

/* ACTION TRAER TODOS LOS ABOGADOS*/
export const getAllAbogados = () => {
  return async (dispatch) => {
    try {
      const abogados = await axios.get(`${api_URL}/abogados`);
      dispatch({
        type: GET_ALL_ABOGADOS,
        payload: abogados.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
/* ACTION TRAER UN ABOGADO POR SU ID*/
export const getAbogado = (id) => {
  return async (dispatch) => {
    const abogado = await axios.get(`${api_URL}/abogados/${id}`);
    try {
      dispatch({
        type: GET_ABOGADO,
        payload: abogado.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
/* ACTION CREAR UN ABOGADO */
export const crearAbogado = (abogado) => {
  return async (dispatch) => {
    try {
      await axios.post(`${api_URL}/abogados`, abogado);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ACTION PARA TRAER TODAS LAS LICENCIAS
export const getLicencia = (id) => {
  return async (dispatch) => {
    try {
      const licencia = await axios.get(`${api_URL}/licencias/${id}`);
      dispatch({
        type: GET_LICENCIA,
        payload: licencia.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ACTION PARA TRAER TODAS LAS LICENCIAS
export const getAllLicencias = () => {
  return async (dispatch) => {
    try {
      const licencias = await axios.get(`${api_URL}/licencias`);
      dispatch({
        type: GET_ALL_LICENCIAS,
        payload: licencias.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};

//ACTION PARA CREAR LICENCIAS
export const crearLicencia = (licencia) => {
  return async (dispatch) => {
    try {
      await axios.post(`${api_URL}/licencias`, licencia);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ACTION PARA CREAR FERIADO
export const crearFeriado = (fecha) => {
  return async (dispatch) => {
    try {
      await axios.post(`${api_URL}/feriados`, fecha);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};

//ACTION PARA TRAER TODAS LAS FECHAS
export const getFeriados = () => {
  return async (dispatch) => {
    try {
      const feriados = await axios.get(`${api_URL}/feriados`);
      dispatch({
        type: GET_FERIADOS,
        payload: feriados.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//RUTA PARA BUSCAR UN ABOGADO POR NOMBRE
export const getAbogadoByName = (name) => {
  //return async (dispatch) => {
  //  try {
  //    const abogadoByName = await axios.get(`${api_URL}/abogados?name=${name}`);
  //    console.log(abogadoByName.data);
  //    dispatch({
  //      type: GET_ABOGADO_BY_NAME,
  //      payload: abogadoByName.data,
  //    });
  //  } catch (err) {
  //    dispatch({
  //      type: ERROR,
  //      payload: err.message,
  //    });
  //  }
  //};
  return {
    type: SEARCH,
    payload: name,
  };
};
//RUTA PARA ACTUALIZAR UNA LICENCIA
export const updateLicencia = (licencia) => {
  return async (dispatch) => {
    try {
      await axios.put(`${api_URL}/licencias`, licencia);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};

// ACTION PARA ACTUALIZAR DATOS DE UN ABOGADO
export const updateAbogado = (abogado) => {
  return async (dispatch) => {
    try {
      await axios.put(`${api_URL}/abogados`, abogado);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ACTION PARA ELIMINAR UNA LICENCIA
export const deleteLicencia = (id) => {
  return async (dispatch) => {
    await axios.delete(`${api_URL}/licencias/${id}`);
    try {
      dispatch({
        type: DELETE_LICENCIA,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ACTION PARA ELIMINAR UN ABOGADO
export const deleteAbogado = (id) => {
  return async (dispatch) => {
    await axios.delete(`${api_URL}/abogados/${id}`);
    try {
      dispatch({
        type: DELETE_ABOGADO,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message,
      });
    }
  };
};
//ORDEN
export const alphabeticalOrder = (order) => {
  return {
    type: ORDER_ALPHABETICAL,
    payload: order,
  };
};
//ORDEN PARA FECHAS
export const ordenFechas = (order) => {
  return {
    type: ORDEN_FECHAI,
    payload: order,
  };
};
//ORDEN PARA FECHAS
export const ordenFechasF = (order) => {
  return {
    type: ORDEN_FECHAF,
    payload: order,
  };
};
//LICENCIAS ACTIVAS O INACTIVAS
export const activaLicencias = (active) => {
  return {
    type: ACTIVE_LICENCIA,
    payload: active,
  };
};
//Limpio detalles
export const clearDetailsAbogado = () => {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DETAILS_ABOGADO,
      payload: "",
    });
  };
};
export const clearDetailsLicencia = () => {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DETAILS_LICENCIA,
      payload: "",
    });
  };
};
