import { NavBar } from "../../components/NavBar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getDateFormat } from "../../utils/getDateFormat";
import { workStatusColDefs } from "./colDefs";
import { workStatusMockData } from "./mockData";
import { Button } from "react-bootstrap";

export const WorkStatus = () => {
  const [rowData, setRowData] = useState(workStatusMockData);

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
    const editedRows = rowData.filter((row) => row.editStatus);
    console.log("name", editedRows);
  };

  return (
    <div>
      <NavBar></NavBar>
      <h5>Work Status</h5>
      <div style={{ height: 500, width: "inherit" }}>
        <div>
          <Button variant="secondary" onClick={handleSave}>
            Save
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
