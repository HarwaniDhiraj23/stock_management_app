import {
  Button,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { forgotPAsswordValidationSchema } from "../utility/validations/signUpValidation.ts";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import { ForgotPasswordInitialValue } from "../utility/interfaces/IRoute.ts";
import userService from "../service/user-service.ts";
import { useNavigate } from "react-router-dom";
import LoginLayout from "../common_component/CommonLayout.tsx";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const initialValue: ForgotPasswordInitialValue = {
    email: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    resetForm();

    await userService.forgotPassword({
      email: values.email,
    });
    navigate(RoutePaths.SignIn);
  };
  const TypoTitle = styled(Typography)({
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "left",
  });
  const TypoSubTitle = styled(Typography)({
    fontSize: "15px",
    marginBottom: "24px",
    textAlign: "left",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });
  const ResetButton = styled(Button)({
    marginTop: "24px",
    textTransform: "capitalize",
  });
  const InputLabelStyle = styled(InputLabel)({
    fontSize: "13px",
    color: "black",
    marginTop: "12px",
  });
  const HyperTextStyle = styled(FormHelperText)({
    marginLeft: "-10px",
    marginTop: "0px",
    marginBottom: "-12px",
    color: "red",
    lineHeight: 1,
  });
  return (
    <LoginLayout>
      <TypoTitle>Forgot your password?</TypoTitle>
      <TypoSubTitle>
        Don't fret! Just type in your email and we will send you a link to reset
        your password!
      </TypoSubTitle>
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={forgotPAsswordValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
        }) => (
          <MainForm onSubmit={handleSubmit}>
            <InputLabelStyle>Your Email</InputLabelStyle>
            <TextField
              variant="outlined"
              name="email"
              id="email"
              type="text"
              autoComplete="off"
              placeholder="john@company.com"
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
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={
                touched.email
                  ? errors.email && (
                      <HyperTextStyle error>{errors.email}</HyperTextStyle>
                    )
                  : undefined
              }
            />

            <ResetButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Recover Password
            </ResetButton>
          </MainForm>
        )}
      </Formik>
    </LoginLayout>
  );
};

export default ForgotPassword;
