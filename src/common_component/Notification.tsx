import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { steps } from "../utility/constant/DashboardConstants.tsx";

export default function Notification() {
  return (
    <div>
      <Stepper orientation="vertical">
        {steps.map((steps) => (
          <Step key={steps.id} active={true} completed={true}>
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
