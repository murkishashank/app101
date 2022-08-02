import { NavBar } from "../../components/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import { getDateFormat } from "../../utils/getDateFormat";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { taskStatusOptions, workStatusColDefs } from "./colDefs";
import { LoginUserDetailContext } from "../../UserContext/LoginUserDetailContext";
import { getWorkStatusByUserId } from "../../api/getUserByUserName";
import { PostWorkStatus } from "../../api/postUser";
import { getSavePayload } from "./validateSave";
import { FormLabel } from "@mui/material";

export const WorkStatus = () => {
  const [rowData, setRowData] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  // const [filter, setFilter] = useState("No filter");
  const userId = localStorage.getItem("userID");
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    getWorkStatusByUserId(userId).then((data) => {
      setRowData(data);
    });
  }, []);

  const handleCellChange = (event) => {
    const { id, field, value } = event;
    const rowDataClone = rowData.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [field]: value,
          ...(field === "taskStatus" && {
            completedTimeStamp:
              value === "Completed" ? getDateFormat(new Date()) : "On progress",
          }),
          editStatus: true,
        };
      }
      return row;
    });
    setRowData(rowDataClone);
  };

  const handleSave = () => {
    setSavingStatus(true);
    const payload = getSavePayload(rowData);
    PostWorkStatus(payload).then((response) => {
      if (response.status === 200) {
        alert("Details saved successfully.");
        setSavingStatus(false);
      } else {
        alert("Error while saving data.");
      }
    });
  };

  return (
    <div>
      <NavBar></NavBar>
      <h5>Work Status</h5>
      <div style={{ height: 500, width: "inherit" }}>
        <div>
          <Button variant="secondary" onClick={handleSave}>
            {savingStatus ? (
              <FormLabel>Saving </FormLabel>
            ) : (
              <FormLabel>Save</FormLabel>
            )}
          </Button>
        </div>
        <DataGrid
          rows={rowData}
          columns={workStatusColDefs}
          onCellEditCommit={handleCellChange}
        ></DataGrid>
      </div>
    </div>
  );
};
