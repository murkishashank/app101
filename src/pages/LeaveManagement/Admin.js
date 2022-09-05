import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../CustomHooks/useEffectOnce";
import { getAllLeaves } from "../../api/getAllLeaves";
import { DataGrid } from "@mui/x-data-grid";
import { commonColumns } from "./CommonColumns.js";
import { saveProcessedLeave } from "../../api/saveProcessedLeave";
import { Container, Box, Button } from "@mui/material";
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
      field: "actions",
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
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <div style={{ width: "100%", height: "400px", padding: "15px" }}>
            <Box component="span"
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end">
              <Button
                onClick={handlePreviousBttn}
              >
                Previous applications
              </Button>
            </Box>
            <div style={{ display: "flex", marginTop: "10px" }}>
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
        </Container>
      )}
    </>
  );
};
