import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getAllUsers } from "../../api/getAllUsers";
import { empColDefs } from "./coldefs";
import { useManageEmpSlice } from "./slice/action";
import { useSelector, useDispatch } from "react-redux";
import { selectEmpRecords } from "./slice/selector";
import { NavBar } from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const ManageEmpDetails = () => {
  const { actions } = useManageEmpSlice();
  const dispatch = useDispatch();
  const employeeRecords = useSelector(selectEmpRecords);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers().then((data) => {
      dispatch(actions.loadAllEmployeeRecords(data));
    });
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        const handleOnClick = () => {
          navigate("/profile");
        };
        return (
          <Button variant="secondary" onClick={handleOnClick}>
            Edit
          </Button>
        );
      },
    },
  ];

  const empColDefsWithActionCol = empColDefs.concat(actionColumn);

  const handleCellValueChange = (event) => {
    const { id, field, value } = event;
    dispatch(
      actions.updateEmployeeDetails({ id: id, fieldKey: field, value: value })
    );
  };

  return (
    <div>
      <NavBar />
      <div style={{ height: 500, width: "inherit", marginTop: "10px" }}>
        <DataGrid
          rows={employeeRecords}
          columns={empColDefsWithActionCol}
          onCellEditCommit={handleCellValueChange}
        ></DataGrid>
      </div>
    </div>
  );
};
