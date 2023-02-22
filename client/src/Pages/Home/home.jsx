import React from "react";
import Navbar from "../../Components/navbar";
import Pagination from "../../Components/pagination";
import Search from "../../Components/search";
import TableLicence from "../../Components/tableLicence";

const Home = () => {
  return (
    <>
      <Navbar />
      <Search />
      <TableLicence />
      {/* <Pagination /> */}
    </>
  );
};

export default Home;
