import React from "react";
import { useDispatch } from "react-redux";
import { alphabeticalOrder } from "../Redux/actions";

const Order = () => {
  const dispatch = useDispatch();
  const handleOrder = (event) => {
    dispatch(alphabeticalOrder(event.target.value));
    document.getElementById("orderPopulation").selectedIndex = 0;
  };

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
        onClick={() => dispatch(alphabeticalOrder("A-Z"))}
        class="bi bi-arrow-up ps-2"
        style={{ fontSize: "22px" }}
      ></i>

      <i
        onClick={() => dispatch(alphabeticalOrder("Z-A"))}
        class="bi bi-arrow-down"
        style={{ fontSize: "22px" }}
      ></i>
    </>
  );
};

export default Order;
