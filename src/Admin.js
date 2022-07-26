import { React, useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { BtnCellRenderer } from "./BtnCellRenderer.js";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const Admin = () => {
  const gridRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataLoading, setDataLoading] = useState(false);

  
  const columnDefs = [
    { headerName: "User Name", field: "userName" },
    { headerName: "Request Id", field: "requestId" },
    { headerName: "From Date", field: "fromDate" },
    { headerName: "To Date", field: "toDate" },
    { headerName: "Reason", field: "reason" },
    { headerName: "Applied date", field: "createTimeStamp/createTimeStamp" },
    {
      headerName: "Approval Status",
      field: "approvedFlag",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["", "Approve", "Deny"],
      },
    },
    {
      headerName: "",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function (data) {
          fetch("http://localhost:8080/api/leave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
          });
        },
      },
    },
  ];

  useEffect(() => {
    setDataLoading(true);
    fetch("http://localhost:8080/api/allLeaves/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
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
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            // rowSelection={"single"}
            // onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      )}
    </>
  );
};
