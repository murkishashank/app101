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

  // const handleFilterChange = (value) => {
  //   setFilter(value);
  //   if (value === "No filter") {
  //     setFilterData([]);
  //   }
  // };

  // const handleFilterValueChange = (event) => {
  //   console.log("name2", event);
  //   if (filter === "Task status") {
  //     const filteredRowData = rowData.filter((row) => row.taskStatus === event);
  //     setFilterData(filteredRowData);
  //   }
  // };

  // const getFilterOptions = (filterValue) => {
  //   if (filterValue === "Task status") {
  //     return (
  //       <Form.Select
  //         onChange={(event) => {
  //           handleFilterValueChange(event.target.value);
  //         }}
  //         name="filter type"
  //         defaultValue={filter}
  //       >
  //         {taskStatusOptions.map((option) => {
  //           return <option>{option}</option>;
  //         })}
  //       </Form.Select>
  //     );
  //   }
  //   if (filterValue === "Date") {
  //     return (
  //       <Form.Control
  //         type="date"
  //         name="filterDate"
  //         placeholder="From Date"
  //         onChange={handleFilterValueChange}
  //         defaultValue={filter}
  //         autoFocus
  //       />
  //     );
  //   }
  // };
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
          {/* <Form.Label>Filter by: </Form.Label>
          <div
            style={{ width: "180px", marginLeft: "120px", marginTop: "-40px" }}
          >
            <Form.Select
              onChange={(event) => {
                handleFilterChange(event.target.value);
              }}
              name="filter type"
              value={filter}
            >
              <option>No filter</option>
              <option>Date</option>
              <option>Task status</option>
            </Form.Select>
            {getFilterOptions(filter)}
          </div> */}
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
