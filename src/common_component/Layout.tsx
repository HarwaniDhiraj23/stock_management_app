import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar open={open} />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          transition: "margin-left 0.3s",
          overflow: "auto",
        }}
      >
        <Navbar SideBarOpen={open} handleDrawerOpen={handleDrawerOpen} />
        <Box
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            flex: 1,
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
