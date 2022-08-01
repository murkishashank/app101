import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../CustomHooks/useEffectOnce.js";
import { NavBar } from "../components/NavBar.js";
import { getAllLeaves } from "../api/getAllLeaves.js";
import { DataGrid } from "@mui/x-data-grid";
import { commonColumns } from "./CommonColumns.js";
import Button from '@mui/material/Button';
import { saveProcessedLeave } from "../api/saveProcessedLeave"
export const Admin = (props) => {
  const navigate = useNavigate();
  const [appliedPeople, setAppliedPeople] = useState([]);
  const [processedPeople, setProcessedPeople] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const columns = [
    {
      field: "approvedFlag",
      headerName: "Approved Status",
      valueOptions: ["Approve", "Deny"],
      editable: true,
      type: "singleSelect",
    },
    { field: "remarks", headerName: "Remarks", editable: true},
    {
      field: "",
      type: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        const onClick = () => {
          saveLeave(params.row);
        };
        return <Button onClick={onClick}>Send</Button>;
      },
      },
    ];
    
    
  const saveLeave = (rowData) => {
    const {userName, ...rest} = rowData;
    const response = saveProcessedLeave(rest)
    console.log(response);
  }
  
  const finalColumns = commonColumns.concat(columns);
  
  const setPeople = (allLeaves) => {
    setDataLoading(false);
    allLeaves.forEach((leaveRecord) => {
      const userName = leaveRecord.userName.userName;
      leaveRecord.userName = userName;
      if (
        leaveRecord.approvedFlag === null ||
        leaveRecord.approvedFlag === ""
      ) {
        setAppliedPeople((appliedPeople) => [...appliedPeople, leaveRecord]);
      } else {
        setProcessedPeople((processedPeople) => [
          ...processedPeople,
          leaveRecord,
        ]);
      }
    });
  };

  const getLeaves = () => {
    const getAllLeavesResponse = getAllLeaves();
    getAllLeavesResponse.then((allLeaves) => {
      setPeople(allLeaves);
    });
  }
  useEffectOnce(() => {
    getLeaves();
  });

  const handlePreviousBttn = () => {
    props.processedPeople({ processedPeople });
    navigate("/previousApplications");
  };

  const handleCellEdit = (event) => {
    const {id, field, value} = event;
    const appliedPeopleClone = appliedPeople.map((application) => {
      if(application.id === id){
        return {...application, [field]: value};
      }
      return application;
    })
    setAppliedPeople(appliedPeopleClone);
  };


  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ width: "100%", height: "400px" }}>
          <NavBar></NavBar>
          <button
            onClick={handlePreviousBttn}
            style={{
              background: "white",
              borderRadius: "10px",
              marginLeft: "1200px",
              marginTop: "10px",
            }}
          >
            Previous applications
          </button>
          <div style={{ height: "100%", display: "flex" }}>
            <DataGrid
              autoHeight= {true}
              // pagination= {true}
              rows={appliedPeople}
              columns={finalColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              loading={!appliedPeople.length}
              onCellEditCommit={handleCellEdit}
              // checkboxSelection
            />
          </div>
        </div>
      )}
    </>
  );
};
