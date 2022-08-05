import Button from '@mui/material/Button';
import { TaskForm } from "../components/TaskForm.js";


export const taskStatusOptions = ["Assigned", "Work in progress", "QA", "Completed"];
export const taskColDefs = [
  { field: "id", headerName: "Task Id"},
  // {field: "userId", headerName: "User Id"}
  { field: "userName", headerName: "User Name", required: true },

  { field: "taskName", headerName: "Task Name" , editable: true, required: true},
  { field: "taskDescription", headerName: "Task description", editable: true, required: true },
  {
    field: "taskStatus",
    headerName: "Task Status",
    type: "singleSelect",
    valueOptions: taskStatusOptions,
    editable: true,required: true
  },
  { field: "assignedBy", headerName: "Assigned By", required: true },
  { field: "taskAssignedDate", headerName: "Assigned Date", required: true },
  { field: "taskCompletedDate", headerName: "To Be Completed Date" },
  { field: "remarks", headerName: "Remarks", },

];