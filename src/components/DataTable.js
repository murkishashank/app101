import { Button, Paper, Toolbar, Typography } from "@mui/material";
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

  const TableToolbar = () => {
    return (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Leaves
        </Typography>
        <Button variant="contained">Apply</Button>
      </Toolbar>
    );
  };

  return (
    <Paper elevation={3}>
      <DataGrid
        components={{
          Toolbar: TableToolbar,
        }}
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
    </Paper>
  );
};
