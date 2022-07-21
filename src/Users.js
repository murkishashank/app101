import { React, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const Users = () => {
  const [data, setData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  const columnDefs = [
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Mobile Number", field: "mobileNumber" },
    { header: "Age", field: "age" },
    { header: "Accepted/Rejected", field: "status" },
  ];

  useEffect(() => {
    setDataLoading(true);
    fetch("http://localhost:8080/api/AllUsers", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setDataLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact rowData={data} columnDefs={columnDefs}></AgGridReact>
        </div>
      )}
    </>
  );
};
