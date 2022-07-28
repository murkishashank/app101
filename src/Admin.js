import {
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useInsertionEffect,
  useRemount
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { BtnCellRenderer } from "./BtnCellRenderer.js";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffectOnce } from "./useEffectOnce.js";
import { NavBar } from "./NavBar.js";
import { AdminNavBar } from "./AdminNavbar.js";

export const Admin = () => {
  const gridRef1 = useRef();
  const gridRef2 = useRef();
  const gridRef3 = useRef();
  const navigate = useNavigate();
  const [appliedPeople, setAppliedPeople] = useState([]);
  const [approvedPeople, setApprovedPeople] = useState([]);
  const [deniedPeople, setDeniedPeople] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const columnDefs = [
    { headerName: "User Name", field: "userName", resizable: true },
    { headerName: "Request Id", field: "requestId", resizable: true },
    { headerName: "From Date", field: "fromDate", resizable: true },
    { headerName: "To Date", field: "toDate", resizable: true },
    { headerName: "Reason", field: "reason", resizable: true },
    {
      headerName: "Applied date",
      field: "createTimeStamp/createTimeStamp",
      resizable: true,
    },
    {
      headerName: "Remarks",
      field: "remarks",
      editable: true,
      resizable: true,
      cellEditorPopup: true,
      cellEditor: "agTextCellEditor",
    },
    {
      headerName: "Approval Status",
      field: "approvedFlag",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["", "Approve", "Deny"],
      },
      resizable: true,
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
      resizable: true,
    },
  ];


  const setPeople = (result) => {
    setDataLoading(false);
    result.forEach((leaveRecord) => {
      if (
        leaveRecord.approvedFlag === null ||
        leaveRecord.approvedFlag === ""
      ) {
        setAppliedPeople((appliedPeople) => [...appliedPeople, leaveRecord]);
      } else if (leaveRecord.approvedFlag === "Approve") {
        setApprovedPeople((approvedPeople) => [...approvedPeople, leaveRecord]);
      } else if (leaveRecord.approvedFlag === "Deny") {
        setDeniedPeople((deniedPeople) => [...deniedPeople, leaveRecord]);
      }
    });
  };

  useEffectOnce(() => {
    setDataLoading(true);
    fetch("http://localhost:8080/api/allLeaves/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setPeople(result);
      })
      .catch(console.log);
  });

  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <NavBar>
          </NavBar>
          <div className="ag-theme-alpine" style={{ height: 180 }}>
            <h3>All applications</h3>
            <AgGridReact
              ref={gridRef1}
              rowData={appliedPeople}
              columnDefs={columnDefs}
              ></AgGridReact>
          </div>
          <div className="ag-theme-alpine" style={{ height: 180 }}>
            <h3 className="title" style={{ marginTop: 45 }}>
              Approved leaves
            </h3>
            <AgGridReact
              ref={gridRef2}
              rowData={approvedPeople}
              columnDefs={columnDefs}
              ></AgGridReact>
          </div>
          <div className="ag-theme-alpine" style={{ height: 180 }}>
            <h3 className="title" style={{ marginTop: 45 }}>
              Denied leaves
            </h3>
            <AgGridReact
              ref={gridRef3}
              rowData={deniedPeople}
              columnDefs={columnDefs}
              ></AgGridReact>
          </div>
          
        </>
      )}
    </>
  );
};
