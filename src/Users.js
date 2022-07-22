import { React, useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const Users = () => {
  const gridRef = useRef();
  const navigate = useNavigate();
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
        setData(result);
        setDataLoading(false);
      })
      .catch(console.log);
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const userID = selectedRows[0]["id"];
    navigate(`/registrationForm/${userID}`);
  }, []);

  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            rowSelection={"single"}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      )}
    </>
  );
};
