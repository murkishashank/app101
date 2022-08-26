import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getAllUsers } from "../../api/getAllUsers";
import { empColDefs } from "./coldefs";
import { useManageEmpSlice } from "./slice/action";
import { useSelector, useDispatch } from "react-redux";
import { selectEmpRecords } from "./slice/selector";
import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import { getPayload } from "./validateSave";
import { Form } from "react-bootstrap";
import { postUser } from "../../api/postUser";
import { Button } from "@mui/material";

export const ManageEmpDetails = (props) => {
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
      field: "dateOfBirth",
      headerName: "DOB",
      type: "Date",
      width: "200",
      renderCell: (params) => <Calender params={params} />,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => <ActionButton row={params.row} />,
    },
    {
      field: "saveAction",
      headerName: "Save",
      renderCell: (params) => <SaveAction row={params.row} />,
    },
  ];

  const Calender = (properties) => {
    const { id, field } = properties.params;
    const handleDateChange = (event) => {
      handleCellValueChange({
        id: id,
        field: field,
        value: event.target.value,
      });
    };
    return (
      <Form.Control
        value={properties.params.value}
        onChange={handleDateChange}
        type="date"
      />
    );
  };

  const ActionButton = (params) => {
    const handleOnClick = () => {
      if (props.setEditEmpDetails) {
        props.setEditEmpDetails(params.row);
        navigate("/edit-emp-details");
      }
    };
    return (
      <Button variant="secondary" onClick={handleOnClick}>
        Edit
      </Button>
    );
  };

  const SaveAction = (params) => {
    const handleOnSaveClick = () => {
      handleSave(params.row);
    };
    return (
      <Button variant="secondary" onClick={handleOnSaveClick}>
        Save
      </Button>
    );
  };

  const empColDefsWithActionCol = empColDefs.concat(actionColumn);

  const handleCellValueChange = (event) => {
    const { id, field, value } = event;
    dispatch(
      actions.updateEmployeeDetails({ id: id, fieldKey: field, value: value })
    );
  };

  const handleSave = (row) => {
    const { emptyFields, payload } = getPayload(row);
    if (emptyFields.length) {
      alert(
        `the following fields are required, please fill the data in following fields: ${emptyFields}`
      );
    } else {
      postUser(payload).then((response) => {
        if (response.id === payload.id) {
          alert("Details Saved successfully");
        } else {
          alert("Error while saving Record");
        }
      });
    }
  };

  const handleNavigation = () => {
    navigate("/manage-salaries");
  };

  return (
    <div>
      <Button onClick={handleNavigation}>Manage Salaries</Button>
      <div style={{ height: 500, width: "inherit", marginTop: "10px" }}>
        <DataGrid
          rows={employeeRecords}
          columns={empColDefsWithActionCol}
          onCellEditCommit={handleCellValueChange}
        />
      </div>
    </div>
  );
};
