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
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Mobile Number", field: "mobileNumber" },
    { headerName: "Age", field: "age" },
    { headerName: "Accepted/Rejected", field: "statusFlag" },
  ];

  useEffect(() => {
    setDataLoading(true);
    fetch("http://localhost:8080/api/allUsers", {
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
    const userId = selectedRows[0]["id"];
    navigate(`/registrationForm/${userId}`);
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
