import { isFuture } from "date-fns";
import {
  GET_ABOGADO,
  GET_ALL_ABOGADOS,
  GET_ALL_LICENCIAS,
  GET_LICENCIA,
  GET_FERIADOS,
  DELETE_LICENCIA,
  CLEAR_DETAILS_ABOGADO,
  CLEAR_DETAILS_LICENCIA,
  DELETE_ABOGADO,
  GET_ABOGADO_BY_NAME,
  ORDER_ALPHABETICAL,
  SEARCH,
  ORDEN_FECHAI,
  ORDEN_FECHAF,
  ACTIVE_LICENCIA,
} from "../actions";

const initialState = {
  allAbogados: [],
  abogadoDetails: {},
  licenciaDetails: {},
  allLicencias: [],
  allFeriados: [],
  stateAux: [],
  licenciaAux: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ABOGADOS:
      return {
        ...state,
        allAbogados: action.payload,
        stateAux: action.payload,
      };
    case GET_ABOGADO:
      return {
        ...state,
        abogadoDetails: action.payload,
      };
    case GET_LICENCIA:
      return {
        ...state,
        licenciaDetails: action.payload,
      };
    case GET_ALL_LICENCIAS:
      const licencias = action.payload;
      for (let i = 0; i < licencias.length; i++) {
        if (!isFuture(new Date(licencias[i].fechaF))) {
          licencias[i].activo = isFuture(new Date(licencias[i].fechaF));
        }
      }
      return {
        ...state,
        allLicencias: licencias,
        licenciaAux: licencias,
      };
    case GET_FERIADOS:
      return {
        ...state,
        allFeriados: action.payload,
      };
    case DELETE_LICENCIA:
      const updateLicencias = state.allLicencias.filter(
        (a) => a.id !== action.payload
      );
      return {
        ...state,
        allLicencias: updateLicencias,
      };
    case DELETE_ABOGADO:
      const updateAbogado = state.allAbogados.filter(
        (a) => a.id !== action.payload
      );
      console.log(updateAbogado);
      return {
        ...state,
        abogado: updateAbogado,
      };
    case GET_ABOGADO_BY_NAME:
      //let lic = [];
      //for (let i = 0; i < state.allLicencias.length; i++) {
      //  for (let j = 0; j < action.payload.length; j++) {
      //    if (state.allLicencias[i].abogadoId == action.payload[j].id) {
      //      lic.push(state.allLicencias[i]);
      //      console.log(lic);
      //    }
      //  }
      //}
      console.log(action.payload);
      return {
        ...state,
        allAbogados: action.payload,
        //allLicencias: lic,
      };
    case ORDER_ALPHABETICAL:
      let order = action.payload;
      let licenciasOrder;
      let aux = [...state.allLicencias];
      let aux1 = [...state.allAbogados];
      if (order === "A-Z") {
        aux.sort((a, b) => (a.abogado.apellido < b.abogado.apellido ? -1 : 1));
        aux1.sort((a, b) => (a.apellido < b.apellido ? -1 : 1));
        licenciasOrder = aux;
      }
      if (order === "Z-A") {
        aux.sort((a, b) => (a.abogado.apellido > b.abogado.apellido ? -1 : 1));
        aux1.sort((a, b) => (a.apellido > b.apellido ? -1 : 1));
        licenciasOrder = aux;
      }
      return {
        ...state,
        allLicencias: licenciasOrder,
        allAbogados: aux1,
      };
    case ORDEN_FECHAI:
      let orden = action.payload;
      let auxiliar = [...state.allLicencias];
      if (orden === "ASC") {
        auxiliar.sort((a, b) => (a.fechaI < b.fechaI ? -1 : 1));
      }
      if (orden === "DES") {
        auxiliar.sort((a, b) => (a.fechaI > b.fechaI ? -1 : 1));
      }
      return {
        ...state,
        allLicencias: auxiliar,
      };

    case ORDEN_FECHAF:
      let ordenF = action.payload;
      let auxiliarF = [...state.allLicencias];
      if (ordenF === "ASC") {
        auxiliarF.sort((a, b) => (a.fechaF < b.fechaF ? -1 : 1));
      }
      if (ordenF === "DES") {
        auxiliarF.sort((a, b) => (a.fechaF > b.fechaF ? -1 : 1));
      }
      return {
        ...state,
        allLicencias: auxiliarF,
      };
    case ACTIVE_LICENCIA:
      let active = action.payload;
      let auxiliarLicencias = [...state.allLicencias];
      let activos = [];
      if (active === "activos") {
        for (let i = 0; i < auxiliarLicencias.length; i++) {
          if (auxiliarLicencias[i].activo === true) {
            activos.push(auxiliarLicencias[i]);
          }
        }
        return {
          ...state,
          allLicencias: activos,
        };
      }
      if (active === "todos") {
        return {
          ...state,
          allLicencias: [...state.licenciaAux],
        };
      }
      return {
        ...state,
      };
    case SEARCH:
      let name = action.payload;
      let abogadoMatch = [];
      let licenciaMatch = [];
      let aux2 = [...state.allAbogados];
      let aux3 = [...state.allLicencias];
      aux2.filter((ab) => {
        if (ab.apellido.includes(name)) {
          abogadoMatch.push(ab);
        }
      });
      aux3.filter((l) => {
        if (l.abogado.apellido.includes(name)) {
          licenciaMatch.push(l);
        }
      });
      if (name === "") {
        return {
          ...state,
          allAbogados: state.stateAux,
          allLicencias: state.licenciaAux,
        };
      }
      return {
        ...state,
        allAbogados: abogadoMatch,
        allLicencias: licenciaMatch,
      };
    case CLEAR_DETAILS_ABOGADO:
      return {
        ...state,
        abogadoDetails: action.payload,
      };
    case CLEAR_DETAILS_LICENCIA:
      return {
        ...state,
        licenciaDetails: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
