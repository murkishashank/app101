export const taskStatusOptions = [
  "Assigned",
  "Work in progress",
  "QA",
  "Completed",
];
export const workStatusColDefs = [
  { field: "taskName", headerName: "Task Name" },
  { field: "taskDescription", headerName: "Task description" },
  {
    field: "taskStatus",
    headerName: "Task Status",
    type: "singleSelect",
    valueOptions: taskStatusOptions,
    editable: true,
  },
  { field: "assignedBy", headerName: "Assigned By" },
  { field: "assignedTimeStamp", headerName: "Assigned Date", type: "date" },
  { field: "completedTimeStamp", headerName: "Completed Date" },
];
