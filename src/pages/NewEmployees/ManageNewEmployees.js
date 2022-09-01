import { useEffect, useRef, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { getAllUsers } from "../../api/getAllUsers";
import { Form } from "react-bootstrap";
import { employeeRoles } from "../ManageEmpDetails/coldefs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useManageNewEmpSlice } from "./slice/action";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFinancialDetails,
  selectManagers,
  selectNewEmpRecords,
} from "./slice/selector";
import { postUser } from "../../api/postUser";
import { SalariesByDesignation } from "./SalariesByDesignation";
import { useEffectOnce } from "../../CustomHooks/useEffectOnce";
import { getFinancialDetails } from "../../api/payslip/getFinanciaDetails";
import { getAllFinancialDetails } from "../../api/payslip/getAllFinancialDetails";
import { saveFinancialDetail } from "../../api/payslip/saveFinancialDetail";
import { saveFinancialRecords } from "../../api/payslip/saveFinancialDetails";

export const NewEmployees = () => {
  const newEmpSelector = useSelector(selectNewEmpRecords);
  const managers = useSelector(selectManagers);
  const allFinancialDetails = useSelector(selectFinancialDetails);
  const { actions } = useManageNewEmpSlice();
  const dispatch = useDispatch();

  const [dataLoading, setDataLoading] = useState(false);
  const imageRef = useRef();

  const columns = [
    {
      field: "id",
      headerName: "User Id",
    },
    {
      field: "userName",
      headerName: "User Name",
    },
    {
      field: "emailId",
      editable: true,
      headerName: "Email",
      width: "180",
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      renderCell: (params) => <Calender params={params} />,
      width: "180",
      type: "date",
    },
    {
      field: "reportingManager",
      headerName: "Reporting Manager",
      editable: true,
      width: "150",
      type: "singleSelect",
      valueOptions: managers,
    },
    {
      field: "designation",
      headerName: "Designation",
      editable: true,
      type: "singleSelect",
      valueOptions: employeeRoles,
      width: "160",
    },
    {
      field: "addressProof",
      headerName: "Address Proof",
      width: "110",
      renderCell: (params) => <AddressProof params={params} />,
    },
    {
      field: "basic",
      headerName: "Basic Pay",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "conveyance",
      headerName: "Conveyance",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "houseRentAllowance",
      headerName: "House Rent Allowance",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "medicalAllowance",
      headerName: "Medical Allowance",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "otherAllowances",
      headerName: "Other Allowances",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "profPursuitsAllow",
      headerName: "Prof Pursuits Allowance",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "providentFund",
      headerName: "Provident Fund",
      editable: true,
      valueGetter: (params) => salaryCalc(params),
    },
    {
      field: "",
      headerName: "Actions",
      renderCell: (params) => <SaveAction row={params.row} />,
    },
  ];

  const salaryCalc = (params) => {
    if (params.row.designation !== null) {
      const designation = params.row.designation;
      const field = params.field;
      dispatch(
        actions.updateFinancialDetails({
          id: params.id,
          field: field,
          value: SalariesByDesignation[designation][field],
        })
      );
      return SalariesByDesignation[designation][field];
    }
  };

  const getUsers = () => {
    const newEmployees = [];
    const managersList = [];
    getAllUsers().then((data) => {
      data.forEach((employee) => {
        if (employee.designation === null) {
          newEmployees.push(employee);
        }
        if (employee.designation === "Manager") {
          managersList.push(employee.userName);
        }
      });
      dispatch(
        actions.loadEmpDetails({
          employees: newEmployees,
          managers: managersList,
        })
      );
    });
    setDataLoading(false);
  };

  useEffectOnce(() => {
    getUsers();
  });

  const SaveAction = (params) => {
    const handleOnSaveClick = () => {
      handleSave(params.row);
    };
    return (
      <button variant="secondary" onClick={handleOnSaveClick}>
        Save
      </button>
    );
  };

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
        type="date"
        onChange={handleDateChange}
      />
    );
  };

  const handleSave = (row) => {
    console.log("name", row);
    let financialDetailStatus;
    const financialRecord = allFinancialDetails.filter(
      (record) => record.userId === row.id
    );
    const values = Object.values(row);
    if (values === "" || values === null) {
      alert("Enter all required values.");
    } else {
      saveFinancialRecords(financialRecord).then((result) => {
        if (financialRecord.userId === result.userId) {
          financialDetailStatus = true;
        } else {
          financialDetailStatus = false;
        }
      });
      postUser(row).then((result) => {
        if (result.userName === row.userName) {
          financialDetailStatus
            ? alert("Details saved successfully")
            : alert("Error while saving the financial details");
          getUsers();
        } else {
          alert("Error while saving the details");
        }
      });
    }
  };

  const handleCellValueChange = (event) => {
    const { id, field, value } = event;
    dispatch(
      actions.updateNewEmployeeDetails({
        id: id,
        fieldKey: field,
        value: value,
      })
    );
  };

  const AddressProof = (properties) => {
    const { id, value } = properties.params;
    return (
      <>
        <Popup trigger={<button>View</button>} position="left">
          <img
            ref={imageRef}
            id={id}
            src={value}
            alt="address proof"
            width="400px"
          ></img>
          <a href={value} download>
            <button>Download</button>
          </a>
        </Popup>
      </>
    );
  };

  return (
    <>
      <NavBar></NavBar>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ width: "100%", height: "400px" }}>
          <h6>New Employees</h6>
          <div style={{ height: "100%", display: "flex", marginTop: "10px" }}>
            <DataGrid
              autoHeight={true}
              rows={newEmpSelector}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellEditCommit={handleCellValueChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
