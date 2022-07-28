import {
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useInsertionEffect,
  useRemount,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { BtnCellRenderer } from "../components/GridButton.js";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffectOnce } from "../CustomHooks/useEffectOnce.js";
import { NavBar } from "../components/NavBar.js";

export const PreviousApplications = (props) => {

  const gridRef2 = useRef();
  const gridRef3 = useRef();
  const [approvedPeople, setApprovedPeople] = useState([]);
  const [deniedPeople, setDeniedPeople] = useState([]);

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
      resizable: true,
    },
    {
      headerName: "Approval Status",
      field: "approvedFlag",
      resizable: true
    },
  ];
  useEffect(() => {
    setApprovedPeople(props.approvedpeople);
    setDeniedPeople(props.deniedpeople);
  })
  return (
    <>
      <NavBar></NavBar>
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
  );
};
