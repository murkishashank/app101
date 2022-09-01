import React, { useEffect } from "react";
import Pdf from "react-to-pdf";
import { payslipMockData } from "./mockdata";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { monthsForDays } from "../../utils/months";
import {
  selectCurrentSelectedPayslip,
  selectedMonth,
  selectEmployeeDetails,
  selectEmployeeLeavesDetails,
  selectFinancialDetails,
} from "./slice/selector";
import { useSelector, useDispatch } from "react-redux";
import { usePayslipSliceSaga } from "./slice/actions";
import { getUserById } from "../../api/getUserById";
import { getFinancialDetails } from "../../api/payslip/getFinanciaDetails";
import { getLeavesById } from "../../api/getLeavesById";

export const style = {
  marginTop: "30px",
  height: "1218px",
  width: "950px",
  backgroundColor: "whitesmoke",
};

export const months = ["--Select month--", "June", "July", "August"];
export const centerStyle = {
  display: "flex",
  justifyContent: "center",
};
export const Payslip = () => {
  const month = useSelector(selectedMonth);
  const { actions } = usePayslipSliceSaga();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userID");
  const financialDetails = useSelector(selectFinancialDetails);
  const employeeDetails = useSelector(selectEmployeeDetails);
  const selectedMonthPayslip = useSelector(selectCurrentSelectedPayslip);
  const leavesData = useSelector(selectEmployeeLeavesDetails);
  const {
    accountNumber,
    pfAccountNumber,
    panNumber,
    bankBranchName,
    basic,
    houseRentAllowance,
    conveyance,
    medicalAllowance,
    profPursuitsAllow,
    arears,
    otherAllowances,
    professionTax,
    providentFund,
  } = selectedMonthPayslip;

  const { id, firstName, lastName, joiningDate, emailId, designation } =
    employeeDetails;

  const getTotalDeductions = () => {
    return professionTax + providentFund;
  };
  const getTotalAllowances = () => {
    return (
      basic +
      houseRentAllowance +
      conveyance +
      medicalAllowance +
      profPursuitsAllow +
      otherAllowances +
      arears
    );
  };
  const monthsForTotalDays = monthsForDays;
  const totalDays =
    month.length &&
    (month !== "--Select month--" ? monthsForTotalDays[month].noOfDays : 0);
  const ref = React.createRef();

  useEffect(() => {
    getUserById(userId).then((data) => {
      dispatch(actions.loadEmployeeDetails(data));
    });
    getFinancialDetails(userId).then((data) => {
      dispatch(actions.loadFinancialDetails(data));
    });
    getLeavesById(userId).then((data) => {
      dispatch(actions.loadEmployeeLeavesRecords(data));
    });
  }, []);

  // useEffect(() => {
  //   let noOfLeaves = 0;
  //   const approvedLeaves = leavesData
  //     .filter((row) => row.approvedFlag === "Approve")
  //     .filter((record) => {
  //       const { fromDate, toDate } = record;
  //       const fromDateDay = fromDate.slice(8, 10);
  //       const toDateDay = toDate.slice(8, 10);
  //       const date = new Date();

  //       console.log("name", date, date.getMonth() + 1);
  //       if (
  //         fromDate.slice(5, 7) === monthsForTotalDays[month].monthNumber ||
  //         toDate.slice(5, 7) === monthsForTotalDays[month].monthNumber
  //       ) {
  //         console.log("name", fromDateDay, toDateDay);
  //         // if (fromDate === toDate) {
  //         //   noOfLeaves = noOfLeaves++;
  //         // } else if (toDateDay > fromDateDay) {
  //         //   noOfLeaves = noOfLeaves + (toDateDay - fromDateDay);
  //         // } else {
  //         //   if (toDateDay < fromDateDay) {
  //         //     noOfLeaves = noOfLeaves + toDate;
  //         //   } else {
  //         //     noOfLeaves = noOfLeaves + (31 - toDateDay);
  //         //   }
  //         // }
  //       }
  //     });
  //   // Assuming here 3 is the count of over all leaves.
  //   if (noOfLeaves > 3) {
  //     const lossOfPay = (approvedLeaves - 3) * 400;
  //   }
  // }, [month]);

  const handleOnChange = (event) => {
    dispatch(actions.updateMonth(event.target.value));
    const currentSelectedMonth = event.target.value + "-2022";

    const payslip = financialDetails.filter(
      (record) => record.salCreditedMonth === currentSelectedMonth
    );
    if (Object.keys(payslip).length) {
      dispatch(actions.updateSelectedMonthPayslip(payslip[0]));
    } else {
      dispatch(actions.updateSelectedMonthPayslip({}));
    }
  };
  return (
    <div>
      <center>
        <div style={style}>
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Month"
                onChange={handleOnChange}
              >
                {months.map((month) => {
                  return <MenuItem value={month}>{month}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          {/* <div style={{ marginLeft: "257px", marginTop: "-39px" }}>
            <Button variant="outlined">Go</Button>
          </div> */}
          <div
            style={{
              width: "790px",
              height: "1218px",
              backgroundColor: "white",
              border: "2px",
              borderColor: "white",
              marginTop: "20px",
            }}
            ref={ref}
          >
            <Box
              component="img"
              style={{ marginLeft: "-274px", height: "98px" }}
              src="../../Payslip.bmp"
            ></Box>
            <hr></hr>
            <Typography variant="h5" gutterBottom component="div">
              {"Payslip for the Month of "}
              {month.length ? month : '"select month"'} 2022
            </Typography>
            <hr></hr>
            <TableContainer component={Paper}>
              <Table
                sx={{ border: 0, height: 2, minWidth: "90px" }}
                aria-label="simple table"
              >
                <TableBody>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>EmpCode </TableCell>
                    <TableCell sx={{ border: 0 }}> : {id}</TableCell>
                    <TableCell sx={{ border: 0 }}>DepartMent </TableCell>
                    <TableCell sx={{ border: 0 }}> : Java</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>Name </TableCell>
                    <TableCell sx={{ border: 0 }}>
                      : {firstName + " " + lastName}
                    </TableCell>
                    <TableCell sx={{ border: 0 }}>Designation </TableCell>
                    <TableCell sx={{ border: 0 }}> : {designation}</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>E-mail </TableCell>
                    <TableCell sx={{ border: 0 }}> : {emailId} </TableCell>
                    <TableCell sx={{ border: 0 }}>Absent </TableCell>
                    <TableCell sx={{ border: 0 }}> : </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>Date Of Join </TableCell>
                    <TableCell sx={{ border: 0 }}>: {joiningDate}</TableCell>
                    <TableCell sx={{ border: 0 }}>Paid days </TableCell>
                    <TableCell sx={{ border: 0 }}> : </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>Account number </TableCell>
                    <TableCell sx={{ border: 0 }}>: {accountNumber}</TableCell>
                    <TableCell sx={{ border: 0 }}>Total Days </TableCell>
                    <TableCell sx={{ border: 0 }}>:{totalDays}</TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>BranchName </TableCell>
                    <TableCell sx={{ border: 0 }}>: {bankBranchName}</TableCell>
                    <TableCell sx={{ border: 0 }}>Pf number </TableCell>
                    <TableCell sx={{ border: 0 }}>
                      : {pfAccountNumber}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>PAN number </TableCell>
                    <TableCell sx={{ border: 0 }}> : {panNumber} </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <hr></hr>
              <Table
                sx={{ border: 0, height: 2, minWidth: "90px" }}
                aria-label="simple table"
              >
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>
                    <b>Earnings</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b> Amount</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>Deductions</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>Amount</b>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>BASIC </TableCell>
                  <TableCell sx={{ border: 0 }}> :{basic} </TableCell>
                  <TableCell sx={{ border: 0 }}>PROVIDENT FUND </TableCell>
                  <TableCell sx={{ border: 0 }}> : {providentFund} </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>HOUSE RENT ALLOWANCE</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    : {houseRentAllowance}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>PROFESSION TAX </TableCell>
                  <TableCell sx={{ border: 0 }}> : {professionTax} </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>CONVEYANCE </TableCell>
                  <TableCell sx={{ border: 0 }}> : {conveyance} </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>MEDICAL ALLOWANCE </TableCell>
                  <TableCell sx={{ border: 0 }}>: {medicalAllowance}</TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>
                    PROF. PURSUITS ALLOW.
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    : {profPursuitsAllow}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>AREARS</TableCell>
                  <TableCell sx={{ border: 0 }}> : {arears} </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>OTHER ALLOWANCE</TableCell>
                  <TableCell sx={{ border: 0 }}>: {otherAllowances}</TableCell>
                </TableRow>
              </Table>
              <hr></hr>
              <Table
                sx={{ border: 0, height: 2, minWidth: "90px" }}
                aria-label="simple table"
              >
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>
                    <b>Total Earnings</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>: {getTotalAllowances()}</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>Total Deductions</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>: {getTotalDeductions()}</b>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
        </div>
      </center>
      <Pdf targetRef={ref} filename="payslip.pdf">
        {({ toPdf }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={toPdf} variant="outlined">
              Download PaySlip
            </Button>
          </div>
        )}
      </Pdf>
    </div>
  );
};
