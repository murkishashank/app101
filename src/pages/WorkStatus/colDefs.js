export const taskStatusOptions = [
  "Assigned",
  "Work in progress",
  "QA",
  "Completed",
];
export const workStatusColDefs = [
  { field: "taskName", headerName: "Task Name" },
  { field: "taskDescription", headerName: "Task description", width: "350" },
  {
    field: "taskStatus",
    headerName: "Task Status",
    type: "singleSelect",
    valueOptions: taskStatusOptions,
    editable: true,
    width: "170",
  },
  { field: "assignedBy", headerName: "Assigned By" },
  {
    field: "assignedTimeStamp",
    headerName: "Assigned Date",
    type: "date",
    width: "150",
  },
  { field: "completedTimeStamp", headerName: "Completed Date" },
  { field: "remarks", headerName: "Remarks", width: "500", editable: true },
];
