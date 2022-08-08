import { DataGrid } from "@mui/x-data-grid";
import { NavBar } from "./NavBar";

export const DataTable = (props) => {
  const handleCellEdit = (params) => {
    const value = params.colDef.field;
    if (value === "actions") {
      props.onClickEdit(params);
    } else {
      return;
    }
  };

  return (
    <>
      <DataGrid
        autoHeight={true}
        pagination={true}
        rows={props.rowData}
        columns={props.colData}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleCellEdit}
      />
    </>
  );
};
