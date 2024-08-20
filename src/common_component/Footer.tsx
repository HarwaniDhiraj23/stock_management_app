import { Box, Typography, styled } from "@material-ui/core";
import React from "react";

function Footer() {
  const MainBox = styled(Box)({
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    border: "1px solid white",
    padding: "50px",
    borderRadius: "10px",
    marginTop: "15px",
    backgroundColor: "#FFFFFF",
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "20px",
  });
  const SubBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 20,
  });
  return (
    <MainBox>
      <Typography>© 2019-2024 StockIO</Typography>
      <SubBox>
        <Typography>About</Typography>
        <Typography>Themes</Typography>
        <Typography>Blog</Typography>
        <Typography>Contact</Typography>
      </SubBox>
    </MainBox>
  );
}

export default Footer;
