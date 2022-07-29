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
import { getAllLeaves } from "../api/getAllLeaves.js";
export const Admin = (props) => {
  
  const navigate = useNavigate();

  const [appliedPeople, setAppliedPeople] = useState([]);
  const [processedPeople, setProcessedPeople] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const setPeople = (result) => {
    setDataLoading(false);
    result.forEach((leaveRecord) => {
      if (
        leaveRecord.approvedFlag === null ||
        leaveRecord.approvedFlag === ""
      ) {
        setAppliedPeople((appliedPeople) => [...appliedPeople, leaveRecord]);
      } else{
        setProcessedPeople((processedPeople) => [...processedPeople, leaveRecord]);
      } 
    });
  };

  useEffectOnce(() => {
    const getAllLeavesResponse = getAllLeaves();
    getAllLeavesResponse.then((allLeaves) => {
      setPeople(allLeaves);
    })
  });

  const handlePreviousBttn = () => {
    props.prevoiusAppl({ processedPeople });
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
          
        </>
      )}
    </>
  );
};
