import Button from '@mui/material/Button';
import { TaskForm } from "../components/TaskForm.js";


const taskStatusOptions = ["Assigned", "Work in progress", "QA", "Completed"];
export const taskColDefs = [
  { field: "id", headerName: "Status Id" },
  { field: "userId", headerName: "User Id" },

  { field: "taskName", headerName: "Task Name" , editable: true},
  { field: "taskDescription", headerName: "Task description", editable: true },
  {
    field: "taskStatus",
    headerName: "Task Status",
    type: "singleSelect",
    valueOptions: taskStatusOptions,
    editable: true,
  },
  { field: "assignedBy", headerName: "Assigned By" },
];