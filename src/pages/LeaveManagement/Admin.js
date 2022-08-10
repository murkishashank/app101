import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../CustomHooks/useEffectOnce";
import { NavBar } from "../../components/NavBar";
import { getAllLeaves } from "../../api/getAllLeaves";
import { DataGrid } from "@mui/x-data-grid";
import { commonColumns } from "./CommonColumns.js";
import Button from "react-bootstrap/Button";
import { saveProcessedLeave } from "../../api/saveProcessedLeave";
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
      width: "150",
    },
    { field: "remarks", headerName: "Remarks", editable: true, width: "220" },
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
    const { userName, ...rest } = rowData;
    saveProcessedLeave(rest).then((response) => {
      if (response != null) {
        alert(`Leave processed successfully.`);
        getAllLeaves().then((response) => {
          setAppliedPeople([]);
          setProcessedPeople([]);
          setPeople(response);
        });
      }
    });
  };

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
  };
  useEffectOnce(() => {
    getLeaves();
  });

  const handlePreviousBttn = () => {
    props.processedPeople({ processedPeople });
    navigate("/admin/previous-applications");
  };

  const handleCellEdit = (event) => {
    const { id, field, value } = event;
    const appliedPeopleClone = appliedPeople.map((application) => {
      if (application.id === id) {
        return { ...application, [field]: value };
      }
      return application;
    });
    setAppliedPeople(appliedPeopleClone);
  };

  return (
    <>

      <NavBar></NavBar>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ width: "100%", height: "400px" }}>
          <Button
            variant="secondary"
            onClick={handlePreviousBttn}
            style={{
              borderRadius: "10px",
              marginLeft: "1200px",
              marginTop: "10px",
            }}
          >
            Previous applications
          </Button>
          <div style={{ height: "100%", display: "flex", marginTop: "10px" }}>
            <DataGrid
              autoHeight={true}
              rows={appliedPeople}
              columns={finalColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellEditCommit={handleCellEdit}
            />
          </div>
        </div>
      )}
    </>
  );
};
