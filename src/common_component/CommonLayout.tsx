import React from "react";
import { Box, useMediaQuery, useTheme } from "@material-ui/core";

const LoginLayout: React.FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#EBECF2",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {!isMobile && (
        <Box style={{ display: "flex", flex: 2 }}>
          <img
            src="https://shorturl.at/65XKG"
            alt="common_image"
            style={{ height: "100vh", width: "100%" }}
          />
        </Box>
      )}
      {isMobile && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom right,  rgba(173, 216, 230, 0.5),rgba(135, 206, 250, 0.8),rgba(255, 255, 255, 0.5))",
            opacity: "60%",
          }}
        />
      )}
      <Box
        style={{
          backgroundColor: isMobile ? "transparent" : "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          padding: "24px",
          width: isMobile ? "100%" : "25%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LoginLayout;
