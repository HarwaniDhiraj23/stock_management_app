import React from "react";
import { TextField, InputLabel, FormHelperText, Box } from "@material-ui/core";

const CustomTextField = ({
  label,
  name,
  id,
  type = "text",
  autoComplete = "off",
  placeholder,
  value,
  onBlur,
  onChange,
  error,
  helperText,
  touched,
  errors,
  errorHyperTextStyle,
}) => {
  return (
    <Box style={{ marginBottom: "24px", width: "100%" }}>
      <InputLabel htmlFor={id} style={{ color: "black" }}>
        {label}
      </InputLabel>
      <TextField
        variant="outlined"
        name={name}
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        style={{
          marginTop: "5px",
          width: "100%",
        }}
        InputProps={{
          style: {
            height: "40px",
            borderRadius: "10px",
          },
        }}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        helperText={
          touched[name]
            ? errors[name] && (
                <FormHelperText error style={errorHyperTextStyle}>
                  {errors[name]}
                </FormHelperText>
              )
            : undefined
        }
      />
    </Box>
  );
};

export default CustomTextField;
