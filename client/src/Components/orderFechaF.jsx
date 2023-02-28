import React from "react";
import { useDispatch } from "react-redux";
import { ordenFechasF } from "../Redux/actions";

const OrderFechaF = () => {
  const dispatch = useDispatch();

  return (
    <>
      {/*
      <select
        style={{ background: "#293c6b" }}
        id="orderAlphabetical"
        onChange={(e) => handleOrder(e)}
      >
        <option value="ALL">⏹️</option>
        <option value="A-Z">⬆️</option>
        <option value="Z-A">⬇️</option>
      </select>
  */}

      <i
        onClick={() => dispatch(ordenFechasF("ASC"))}
        class="bi bi-arrow-up ps-2"
        style={{ fontSize: "22px" }}
      ></i>

      <i
        onClick={() => dispatch(ordenFechasF("DES"))}
        class="bi bi-arrow-down"
        style={{ fontSize: "22px" }}
      ></i>
    </>
  );
};

export default OrderFechaF;
