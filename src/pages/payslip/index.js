import React from "react";
import { NavBar } from "../../components/NavBar";
import Pdf from "react-to-pdf";
import { payslipMockData } from "./mockdata";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { monthsForDays } from "../../utils/months";
import { selectedMonth } from "./slice/selector";
import { useSelector } from "react-redux";
import { usePayslipSliceSaga } from "./slice/actions";
import { useDispatch } from "react-redux";
import { allowances } from "../../utils/Allowences";

export const style = {
  marginTop: "30px",
  height: "1218px",
  width: "950px",
  backgroundColor: "whitesmoke",
};

export const months = ["--Select month--", "May", "June", "July"];
export const centerStyle = {
  display: "flex",
  justifyContent: "center",
};
export const Payslip = () => {
  const month = useSelector(selectedMonth);
  const { actions } = usePayslipSliceSaga();
  const dispatch = useDispatch();
  const {
    id,
    firstName,
    lastName,
    joiningDate,
    emailId,
    designation,
    financialDetails: {
      accountNumber,
      pfAccountNumber,
      panNumber,
      bankBranchName,
    },
  } = payslipMockData;

  const {
    basic,
    houseRentAllowance,
    conveyance,
    medicalAllowance,
    profPursuitsAllow,
    arears,
    otherAllowances,
    professionTax,
  } = allowances;
  const getTotalAllowances = () => {
    return (
      basic[designation] +
      houseRentAllowance +
      conveyance +
      medicalAllowance[designation] +
      profPursuitsAllow +
      otherAllowances +
      arears
    );
  };
  const monthsForTotalDays = monthsForDays;
  const ref = React.createRef();

  const handleOnChange = (event) => {
    dispatch(actions.updateMonth(event.target.value));
  };
  return (
    <div>
      <NavBar />
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
          <div style={{ marginLeft: "257px", marginTop: "-39px" }}>
            <Button variant="outlined">Go</Button>
          </div>
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
                    <TableCell sx={{ border: 0 }}>
                      {" "}
                      : {monthsForTotalDays[month]}
                    </TableCell>
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
                  <TableCell sx={{ border: 0 }}>
                    {" "}
                    :{basic[designation]}{" "}
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>PROVIDENT FUND </TableCell>
                  <TableCell sx={{ border: 0 }}> : </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>HOUSE RENT ALLOWANCE</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {" "}
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
                  <TableCell sx={{ border: 0 }}>
                    {" "}
                    : {medicalAllowance[designation]}{" "}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>
                    PROF. PURSUITS ALLOW.
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {" "}
                    : {profPursuitsAllow}{" "}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>AREARS</TableCell>
                  <TableCell sx={{ border: 0 }}> : {arears} </TableCell>
                </TableRow>
                <TableRow sx={{ border: 0 }}>
                  <TableCell sx={{ border: 0 }}>OTHER ALLOWANCE</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {" "}
                    : {otherAllowances}{" "}
                  </TableCell>
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
                    <b>:{getTotalAllowances()}</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>Total Deductions</b>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <b>:{}</b>
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
