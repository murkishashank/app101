import clsx from "clsx";
import { Button } from "@mui/material";

export const taskStatusOptions = [
  "Assigned",
  "Work in progress",
  "QA",
  "Completed",
];

export const taskColDefs = [
  {
    field: "statusId",
    headerName: "Task Id",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "userName",
    headerClassName: "super-app-theme--header",
    headerName: "User Name",
    valueGetter: (params) => {
      return `${params.row.user.userName}`;
    },
  },
  {
    field: "taskName",
    headerName: "Task Name",
    headerClassName: "super-app-theme--header",
    editable: true,
    required: true,
  },
  {
    field: "taskDescription",
    headerName: "Task Description",
    width: 200,
    headerClassName: "super-app-theme--header",
    editable: true,
    required: true,
  },
  {
    field: "taskStatus",
    headerName: "Task Status",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    cellClassName: (params) =>
      clsx("super-app", {
        completed: params.value === "Completed",
        QA: params.value === "QA",
        pending: params.value === "Work in progress",
      }),
    valueOptions: taskStatusOptions,
    editable: true,
    required: true,
  },
  {
    field: "taskAssignedDate",
    headerName: "Task Assigned Date",
    type: "date",
    width: 180,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "assignedBy",
    headerName: "Assigned By",
    headerClassName: "super-app-theme--header",
    required: true,
    valueGetter: (params) => {
      return `${params.row.assignedByUser.userName}`;
    },
  },
  {
    field: "taskCompletedDate",
    headerName: "To Be Completed Date",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "remarks",
    headerName: "Remarks",
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      return <Button variant="secondary">Edit</Button>;
    },
  },
];
