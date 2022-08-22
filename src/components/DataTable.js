import { DataGrid } from "@mui/x-data-grid";

export const DataTable = (props) => {
  let id = props.rowId;
  const handleCellClick = (params) => {
    const value = params.colDef.field;
    if (value === "actions") {
      props.onClickEdit(params);
    } else {
      return;
    }
  };

  const handleCellEdit = (event) => {
    props.onCellEdit(event);
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
        onCellEditCommit={handleCellEdit}
        onCellClick={handleCellClick}
        getRowId={(row) => row[id]}
      />
    </>
  );
};
