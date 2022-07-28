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
import { BtnCellRenderer } from "../components/GridButton.js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffectOnce } from "../CustomHooks/useEffectOnce.js";
import { NavBar } from "../components/NavBar.js";
import { buildQueries } from "@testing-library/react";
export const Admin = (props) => {
  const gridRef1 = useRef();
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
      headerName: "Actions",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function (data) {
          fetch("http://localhost:8080/api/leave", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
          })
          window.location.reload(false);
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

  const handlePreviousBttn = () => {
    props.prevoiusAppl({ approvedPeople, deniedPeople });
    navigate("/previousApplications");
  }

  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <NavBar>
          </NavBar>
          <button onClick={handlePreviousBttn} style={{ background: "white", borderRadius: "10px", marginLeft: "1200px", marginTop: "10px" }}>Previous applications</button>
          <div className="ag-theme-alpine" style={{ height: 300 }}>
            <h3>All applications</h3>
            <AgGridReact
              ref={gridRef1}
              rowData={appliedPeople}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </>
      )}
    </>
  );
};
