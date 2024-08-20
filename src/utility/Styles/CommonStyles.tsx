import {
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";

export const TypoTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "10px",
  textAlign: "left",
});

export const InputLabelStyle = styled(InputLabel)({
  fontSize: "13px",
  color: "black",
  marginTop: "12px",
});

export const HyperTextStyle = styled(FormHelperText)({
  marginLeft: "-10px",
  marginTop: "0px",
  marginBottom: "-12px",
  color: "red",
  lineHeight: 1,
});

export const TextFieldStyled = styled(TextField)({
    marginTop: "5px",
    width: "100%",
    "& .MuiInputBase-input": {
      height: "40px",
      borderRadius: "10px",
    },
  });
