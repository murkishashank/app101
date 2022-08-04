const designation = ["HR", "Manager", "Associate", "Intern"];
export const empColDefs = [
  { field: "id", headerName: "Employee ID" },
  { field: "firstName", headerName: "First name", editable: true },
  { field: "lastName", headerName: "Last name", editable: true },
  {
    field: "mobileNumber",
    headerName: "Mobile number",
    editable: true,
  },
  {
    field: "alternativeMobileNumber",
    headerName: " Alt. Mobile number",
    editable: true,
  },
  { field: "dateOfBirth", headerName: "DOB", type: "Date", editable: true },
  { field: "designation", headerName: "Designation", editable: true },
  { field: "joiningDate", headerName: "Joining date" },
  { field: "emailId", headerName: " E-mail", editable: true },
  { field: "personalEmailId", headerName: "Personal E-mail", editable: true },
  {
    field: "permanentAddress",
    headerName: "Permanent address",
    editable: true,
  },
  { field: "contactAddress", headerName: "Contact address", editable: true },
  {
    field: "reportingManager",
    headerName: "Reporting manager",
    editable: true,
  },
];
