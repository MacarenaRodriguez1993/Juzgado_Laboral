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
      return {
        ...state,
        allLicencias: action.payload,
        licenciaAux: action.payload,
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
