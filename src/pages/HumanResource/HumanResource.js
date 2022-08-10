import { commonColumns } from "../LeaveManagement/CommonColumns";
import { DataGrid } from "@mui/x-data-grid";
import { NavBar } from "../../components/NavBar";
import { useState, useRef } from "react";
import { getAllLeaves } from "../../api/getAllLeaves";
import { useEffectOnce } from "../../CustomHooks/useEffectOnce";
import { getAllUsers } from "../../api/getAllUsers";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const HumanResource = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [leavesWithinHrDates, setleavesWithinHrDates] = useState([]);
  const [fromDateByHr, setFromDateByHr] = useState();
  const [toDateByHr, setToDateByHr] = useState();
  const [ids, setIds] = useState([]);
  const fromDateRef = useRef();
  const toDateRef = useRef();
  var diffDays = null;

  const calDays = (params) => {
    var timeDiff = Math.abs(
      new Date(params.row.toDate).getTime() -
        new Date(params.row.fromDate).getTime()
    );
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  const leavesCol = [
    { field: "approvedDate", headerName: "Approved Date", width: "130" },
    {
      field: "numberOfDays",
      headerName: "Number of days",
      width: "130",
      valueGetter: (params) => calDays(params),
      renderCell: () => {
        return diffDays;
      },
    },
  ];

  const finalCol = commonColumns.concat(leavesCol);

  const getLeaves = () => {
    const getAllLeavesResponse = getAllLeaves();
    getAllLeavesResponse.then((allLeaves) => {
      allLeaves.map((leaves) => {
        const userName = leaves.userName.userName;
        if (leaves.approvedFlag === "Approve") {
          leaves.userName = userName;
          setApprovedLeaves((approvedLeaves) => [...approvedLeaves, leaves]);
        }
      });
    });
  };

  const arrangeIds = () => {
    const allUsers = getAllUsers();
    allUsers.then((usersArray) => {
      usersArray.map((user) => {
        setIds((ids) => [...ids, user.id]);
      });
    });
  };

  useEffectOnce(() => {
    arrangeIds();
    commonColumns.splice(6, 1);
    setDataLoading(false);
    getLeaves();
  });

  const handleClearBttn = () => {
    fromDateRef.current.value = "yyyy-mm-dd";
    toDateRef.current.value = "yyyy-mm-dd";
    setFromDateByHr();
    setToDateByHr();
    setleavesWithinHrDates([]);
  };

  const handleDatesByHr = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "fromDate") {
      setFromDateByHr(value);
    } else if (name === "toDate") {
      setToDateByHr(value);
    }
  };

  const filterLeaves = (approvedLeave) => {
    let toDate = approvedLeave.toDate;
    let fromDate = approvedLeave.fromDate;
    if (fromDate >= fromDateByHr && toDate <= toDateByHr) {
      return approvedLeave;
    }
  };

  const handleSubmitBttn = () => {
    const leavesWithinHrDatesClone = approvedLeaves.filter(filterLeaves);
    if(leavesWithinHrDatesClone.length === 0){
      alert("No records found in the range.");
    }else{
      setleavesWithinHrDates(leavesWithinHrDatesClone);
    }
  };

  return (
    <>
      {dataLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={{ width: "100%", height: "400px" }}>
          <NavBar></NavBar>
          <Form.Label
            htmlFor="userName"
            style={{ marginLeft: "30px", marginTop: "150px" }}
          >
            <h6>From Date: </h6>
          </Form.Label>
          <Form.Control
            name="fromDate"
            type="date"
            style={{ width: 200, marginLeft: "30px" }}
            onChange={handleDatesByHr}
            ref={fromDateRef}
          />
          <Form.Label
            htmlFor="userName"
            style={{ marginTop: "10px", marginLeft: "30px" }}
          >
            <h6>To Date: </h6>
          </Form.Label>
          <Form.Control
            name="toDate"
            type="date"
            style={{ width: 200, marginLeft: "30px" }}
            onChange={handleDatesByHr}
            ref={toDateRef}
          />
          <Button
            variant="secondary"
            onClick={handleSubmitBttn}
            style={{
              marginLeft: "30px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearBttn}
            style={{
              borderRadius: "10px",
              marginTop: "10px",
              marginLeft: "30px",
            }}
          >
            Clear Filters
          </Button>
          <div
            style={{
              height: "133%",
              display: "flex",
              marginTop: "-327px",
              width: "955px",
              marginLeft: "300px",
            }}
          >
            <DataGrid
              rows={
                leavesWithinHrDates.length
                  ? leavesWithinHrDates
                  : approvedLeaves
              }
              pagination={true}
              columns={finalCol}
              pageSize={8}
              rowsPerPageOptions={[8]}
            />
          </div>
        </div>
      )}
    </>
  );
};
