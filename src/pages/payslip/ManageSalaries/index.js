import { Button, Grid, Box, ButtonGroup, TextField, Tab } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLastMonthPayRecords } from "../../../api/payslip/getLastMonthPayRecords";
import { monthsNumber } from "../../../utils/months";
import { selectEmpRecords } from "../../ManageEmpDetails/slice/selector";
import { usePayslipSliceSaga } from "../slice/actions";
import {
  selectHrPayRecords,
  selectInternPayRecords,
  selectManagerPayRecords,
  selectRecentPayslipRecords,
  selectSalaryUpdateState,
  selectTabValue,
} from "../slice/selector";
import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { salColDefs } from "./columnDefs";
import { NavBar } from "../../../components/NavBar";
import { getSavePayload } from "../validateSave";
import { saveFinancialRecords } from "../../../api/payslip/saveFinancialDetails";
import { OuBoxTable } from "../../../components/OuBoxTable";
// import { useManageSalariesSliceSaga } from "./slice/action";
// import { selectRecentPayslipRecords } from "./slice/selector";

export const ManageSalaries = () => {
  const monthsInNumber = monthsNumber;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = usePayslipSliceSaga();
  const lastMonthPayRecords = useSelector(selectRecentPayslipRecords);
  const allEmpRecords = useSelector(selectEmpRecords);
  const tabValue = useSelector(selectTabValue);
  const managerPayRecords = useSelector(selectManagerPayRecords);
  const hrPayRecords = useSelector(selectHrPayRecords);
  const internPayRecords = useSelector(selectInternPayRecords);
  const salaryUpdateState = useSelector(selectSalaryUpdateState);

  const getSalCreditedMonth = (type) => {
    const toDayDate = new Date();
    const month =
      type === "current" ? toDayDate.getMonth() : toDayDate.getMonth() - 1;
    return `${monthsInNumber[month]}-${toDayDate.getFullYear()}`;
  };
  const buttonGroupStyle = {
    height: "56px",
    width: "240px",
  };
  useEffect(() => {
    getLastMonthPayRecords(getSalCreditedMonth("last")).then((data) => {
      dispatch(actions.loadRecentPayslipRecords(data));
    });
  }, []);

  useEffect(() => {
    const payRecordsWihDesignation = lastMonthPayRecords.map((record) => {
      const empDetails = allEmpRecords.filter(
        (empRecord) => empRecord.id === record.userId
      );
      const { designation, firstName, lastName } = empDetails[0];
      return {
        ...record,
        designation: designation,
        firstName: firstName,
        lastName: lastName,
      };
    });

    const managerRecords = payRecordsWihDesignation.filter(
      (record) => record.designation === "Manager"
    );
    const hrRecords = payRecordsWihDesignation.filter(
      (record) => record.designation === "Human Resource"
    );
    const internRecords = payRecordsWihDesignation.filter(
      (record) => record.designation === null
    );
    dispatch(
      actions.updatePayRecords({
        manager: managerRecords,
        hr: hrRecords,
        intern: internRecords,
      })
    );
  }, [lastMonthPayRecords]);

  const handleOnBack = () => {
    navigate("/emp-details");
  };

  const handleOnTabChange = (event, tabVal) => {
    dispatch(actions.updateTabValue(tabVal));
  };
  const handleIncrementAndDecrement = (group, key, value, operation) => {
    let keyValue = 0;
    if (operation === "add") {
      keyValue = salaryUpdateState[group][key] + value;
    }
    if (operation === "sub" && salaryUpdateState[group][key] !== 0) {
      keyValue = salaryUpdateState[group][key] - value;
    }
    dispatch(
      actions.updateSalaryState({ group: group, key: key, value: keyValue })
    );
  };

  const applyIncrements = (payRecords, payRecordsStateName, groupName) => {
    const updatedIncrementRecords = payRecords.map((record) => {
      const {
        basic,
        conveyance,
        houseRentAllowance,
        medicalAllowance,
        profPursuitsAllow,
        arears,
        otherAllowances,
        professionTax,
        providentFund,
      } = salaryUpdateState[groupName];
      return {
        ...record,
        basic: record.basic + basic,
        conveyance: record.conveyance + conveyance,
        houseRentAllowance: record.houseRentAllowance + houseRentAllowance,
        medicalAllowance: record.medicalAllowance + medicalAllowance,
        profPursuitsAllow: record.profPursuitsAllow + profPursuitsAllow,
        arears: record.arears + arears,
        otherAllowances: record.otherAllowances + otherAllowances,
        professionTax: record.professionTax + professionTax,
        providentFund: record.providentFund + providentFund,
        salCreditedMonth: getSalCreditedMonth("current"),
      };
    });
    dispatch(
      actions.updateIncrementsToPayRecords({
        payRecordName: payRecordsStateName,
        records: updatedIncrementRecords,
      })
    );
    saveUpdatedRecords(updatedIncrementRecords);
  };

  const saveUpdatedRecords = (financialRecords) => {
    const payload = getSavePayload(financialRecords);
    saveFinancialRecords(payload).then((response) => {
      if (response[0].id) {
        alert("Records are saved successfully");
      } else {
        alert("Error while saving the records");
      }
    });
  };

  const FormComponent = (props) => {
    return (
      <Grid item xs={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            // alignItems: "center",
          }}
        >
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "basic",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Basic"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                defaultValue={salaryUpdateState[props.groupName].basic}
              ></TextField>

              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "basic",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              {" "}
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "houseRentAllowance",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>{" "}
              <TextField
                label="House Rent Allowance"
                defaultValue={
                  salaryUpdateState[props.groupName].houseRentAllowance
                }
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "houseRentAllowance",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "conveyance",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Conveyance"
                defaultValue={salaryUpdateState[props.groupName].conveyance}
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "conveyance",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "medicalAllowance",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Medical Allowance"
                defaultValue={
                  salaryUpdateState[props.groupName].medicalAllowance
                }
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "medicalAllowance",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "profPursuitsAllow",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Prof. Pursuits Allowances"
                defaultValue={
                  salaryUpdateState[props.groupName].profPursuitsAllow
                }
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "profPursuitsAllow",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "arears",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Arears"
                defaultValue={salaryUpdateState[props.groupName].arears}
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "arears",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "otherAllowances",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Other Allowances"
                defaultValue={
                  salaryUpdateState[props.groupName].otherAllowances
                }
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "otherAllowances",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "professionTax",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Profession Tax"
                defaultValue={salaryUpdateState[props.groupName].professionTax}
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "professionTax",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
          <OuBoxTable>
            <ButtonGroup
              sx={buttonGroupStyle}
              // variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "providentFund",
                    1000,
                    "sub"
                  );
                }}
              >
                -
              </Button>
              <TextField
                label="Provident Fund"
                defaultValue={salaryUpdateState[props.groupName].providentFund}
              ></TextField>
              <Button
                onClick={() => {
                  handleIncrementAndDecrement(
                    props.groupName,
                    "providentFund",
                    1000,
                    "add"
                  );
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </OuBoxTable>
        </Box>
      </Grid>
    );
  };
  return (
    <div>
      <NavBar />
      <Button onClick={handleOnBack} variant="outlined">
        Back
      </Button>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleOnTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Manager" value="Manager" />
              <Tab label="HR" value="HR" />
              <Tab label="Intern" value="Intern" />
            </TabList>
          </Box>
          <TabPanel value="Manager">
            <div style={{ height: 500, width: "inherit", marginTop: "10px" }}>
              <FormComponent groupName="manager" />
              <Button
                onClick={() => {
                  applyIncrements(
                    managerPayRecords,
                    "managerPayRecords",
                    "manager"
                  );
                }}
                variant="outlined"
              >
                Approve Increments
              </Button>
              <Button
                onClick={() => {
                  applyIncrements(
                    managerPayRecords,
                    "managerPayRecords",
                    "manager"
                  );
                }}
                variant="outlined"
              >
                Approve Curr.Month Sal
              </Button>

              <DataGrid
                rows={managerPayRecords}
                columns={salColDefs}
                // onCellEditCommit={handleCellValueChange}
              />
            </div>
          </TabPanel>
          <TabPanel value="HR">
            <div style={{ height: 500, width: "inherit", marginTop: "10px" }}>
              <FormComponent groupName="hr" />
              <Button
                onClick={() => {
                  applyIncrements(
                    hrPayRecords,
                    "humanResourcePayRecords",
                    "hr"
                  );
                }}
                variant="outlined"
              >
                Approve Increments
              </Button>
              <Button
                onClick={() => {
                  applyIncrements(
                    hrPayRecords,
                    "humanResourcePayRecords",
                    "hr"
                  );
                }}
                variant="outlined"
              >
                Approve Curr.Month Sal
              </Button>
              <DataGrid
                rows={hrPayRecords}
                columns={salColDefs}
                // onCellEditCommit={handleCellValueChange}
              />
            </div>
          </TabPanel>
          <TabPanel value="Intern">
            <div style={{ height: 500, width: "inherit", marginTop: "10px" }}>
              <FormComponent groupName="intern" />
              <Button
                onClick={() => {
                  applyIncrements(
                    internPayRecords,
                    "internPayRecords",
                    "intern"
                  );
                }}
                variant="outlined"
              >
                Approve Increments
              </Button>
              <Button
                onClick={() => {
                  applyIncrements(
                    internPayRecords,
                    "internPayRecords",
                    "intern"
                  );
                }}
                variant="outlined"
              >
                Approve Curr.Month Sal
              </Button>
              <DataGrid
                rows={internPayRecords}
                columns={salColDefs}
                // onCellEditCommit={handleCellValueChange}
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};
