import Box from "@mui/material/Box";
export const OuBoxTable = (props) => {
  const { sx, ...other } = props;

  const boxTableStyle = {
    // bgcolor: (theme) =>
    //   theme.palette.mode === "dark" ? "#101010" : "#fff",
    // color: (theme) =>
    //   theme.palette.mode === "dark" ? "grey.300" : "grey.800",
    border: "0px solid",
    // borderColor: (theme) =>
    //   theme.palette.mode === "dark" ? "grey.800" : "grey.300",
    p: 0.2,
    m: 0.5,
    // borderRadius: 0,
    // fontSize: "0.875rem",
    // fontWeight: "700",
    ...sx,
  };
  return <Box sx={boxTableStyle} {...other} />;
};
