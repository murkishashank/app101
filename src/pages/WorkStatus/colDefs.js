export const taskStatusOptions = [
  "Assigned",
  "Work in progress",
  "QA",
  "Completed",
];
export const workStatusColDefs = [
  { field: "taskName", headerName: "Task Name" },
  { field: "taskDescription", headerName: "Task description", width: "270" },
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
    field: "taskAssignedDate",
    headerName: "Assigned Date",
    type: "date",
    width: "150",
  },
  { field: "taskCompletedDate", headerName: "Completed Date", width: "120" },
  { field: "remarks", headerName: "Remarks", width: "500", editable: true },
];
