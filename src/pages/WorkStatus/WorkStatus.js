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

export const WorkStatus = () => {
  const [rowData, setRowData] = useState([]);
  // const [filterData, setFilterData] = useState([]);
  // const [filter, setFilter] = useState("No filter");
  const userId = localStorage.getItem("userID");

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
    const payload = getSavePayload(rowData);
    PostWorkStatus(payload);
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
