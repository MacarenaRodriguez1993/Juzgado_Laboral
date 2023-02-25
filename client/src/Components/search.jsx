import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAbogadoByName } from "../Redux/actions";
const Search = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    search: "",
  });

  const handlerChange = (event) => {
    setState({
      search: event.target.value,
    });
    dispatch(getAbogadoByName(event.target.value));
  };
  return (
    <>
      <div class="container-fluid ">
        <h1 className="pt-4">Licencias</h1>
        <form class="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <div class="col-auto">
            <input
              type="search"
              class="form-control "
              id="inputPassword2"
              placeholder="Buscar"
              value={state.search}
              onChange={(event) => handlerChange(event)}
            />
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-secondary mb-3">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
