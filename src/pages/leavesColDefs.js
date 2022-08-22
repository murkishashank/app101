import { Button } from "@mui/material";

export const leavesColDefs = [
  {
    field: "userName",
    headerName: "User Name",
    valueGetter: (params) => {
      return `${params.row.user.userName}`;
    },
  },
  { field: "fromDate", headerName: "From Date" },
  { field: "toDate", headerName: "To Date" },
  { field: "appliedDate", headerName: "Applied Date" },
  { field: "approvedDate", headerName: "Approved Date" },
  { field: "reason", headerName: "Reason" },
  { field: "leaveType", headerName: "LeaveType" },
  {
    field: "approvedFlag",
    headerName: "Approved Status",
    valueGetter: (params) => {
      return params.row.approvedFlag === ""
        ? "Pending"
        : params.row.approvedFlag;
    },
  },
  { field: "remarks", headerName: "Remarks" },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      return <Button>Edit</Button>;
    },
  },
];
