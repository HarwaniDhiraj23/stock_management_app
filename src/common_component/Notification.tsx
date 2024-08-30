import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import {
  Inbox,
  RemoveRedEye,
  ShoppingCart,
  Update,
  Warning,
} from "@material-ui/icons";
import { Box } from "@material-ui/core";

const steps = [
  {
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#D7C4FA",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <ShoppingCart style={{ color: "#7C3AED" }} />
        </Box>{" "}
        You sold an item
      </Box>
    ),
    data: `Bonnie Green just purchased "Volt - Admin Dashboard"!`,
    days: "a day ago",
  },
  {
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#BDBFC5",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Inbox style={{ color: "#262B40" }} />
        </Box>{" "}
        New message
      </Box>
    ),

    data: `Let's meet at Starbucks at 11:30. Wdyt?`,
    days: "a day ago",
  },
  {
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#FEE5B9",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Warning style={{ color: "#FBA918" }} />
        </Box>{" "}
        Product issue
      </Box>
    ),
    data: `A new issue has been reported for Pixel Pro.`,
    days: "a day ago",
  },
  {
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#B7EAD9",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Update style={{ color: "#10B981" }} />
        </Box>{" "}
        Product update
      </Box>
    ),
    data: `Spaces - Listings Template has been updated.`,
    days: "a day ago",
  },
];

export default function Notification() {
  return (
    <div>
      <Stepper orientation="vertical">
        {steps.map((steps, index) => (
          <Step key={index} active={true} completed={true}>
            <StepLabel>{steps.icon}</StepLabel>
            <StepContent>
              <Typography>{steps.data}</Typography>
              <Typography>{steps.days}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
