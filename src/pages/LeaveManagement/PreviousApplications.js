import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { NavBar } from "../../components/NavBar.js";
import { commonColumns } from "./CommonColumns.js";
export const PreviousApplications = (props) => {
  const [processedPeople, setProcessedPeople] = useState([]);

  const columns = [
    { field: "approvedFlag", headerName: "Approved Status", width: "150" },
    { field: "approvedDate", headerName: "Approved Date", width: "130" },
    { field: "remarks", headerName: "Remarks", width: "220" },
  ];

  const finalColumns = commonColumns.concat(columns);

  useEffect(() => {
    setProcessedPeople(props.processedPeople);
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "400px" }}>
        <div style={{ height: "100%", display: "flex" }}>
          <DataGrid
            rows={processedPeople}
            columns={finalColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </>
  );
};
