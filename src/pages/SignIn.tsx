import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { signInValidationSchema } from "../utility/validations/signUpValidation.ts";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import { Link, useNavigate } from "react-router-dom";
import { SignInInitialValue } from "../utility/interfaces/IRoute.ts";
import userService from "../service/user-service.ts";
import LoginLayout from "../common_component/CommonLayout.tsx";

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const initialValue: SignInInitialValue = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setKeepSignedIn(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { resetForm }) => {
    resetForm();
    const result = await userService.loginUser({
      email: values.email,
      password: values.password,
    });
    localStorage.setItem("token", result.data?.token);
    navigate(RoutePaths.Dashboard);
  };
  const HeaderTypography = styled(Typography)({
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "left",
  });
  const TitleTypography = styled(Typography)({
    fontSize: "15px",
    marginBottom: "24px",
    textAlign: "center",
  });
  const ForgotTypography = styled(Typography)({
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
  });
  const FooterTypography = styled(Typography)({
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "24px",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });
  const FooterBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
  });
  const StyledLink = styled(Link)({
    textDecoration: "none",
  });
  const SubmitButton = styled(Button)({
    marginTop: "24px",
    textTransform: "capitalize",
  });
  const FormError = styled(FormHelperText)({
    marginLeft: "-10px",
    marginTop: "0px",
    marginBottom: "-12px",
    color: "red",
    lineHeight: 1,
  });
  return (
    <LoginLayout>
      <HeaderTypography>Welcome Back!</HeaderTypography>
      <TitleTypography>
        Sign in to access your dashboard, settings and projects.
      </TitleTypography>
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={signInValidationSchema}
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
            <TextField
              variant="outlined"
              name="email"
              id="email"
              type="text"
              autoComplete="off"
              placeholder="Email"
              style={{
                marginBottom: "24px",
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
                touched.email && <FormError error>{errors.email}</FormError>
              }
            />
            <TextField
              variant="outlined"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{
                marginTop: "5px",
                width: "100%",
              }}
              InputProps={{
                style: {
                  height: "40px",
                  borderRadius: "10px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={
                touched.password && (
                  <FormError error>{errors.password}</FormError>
                )
              }
            />
            <FooterBox>
              <label>
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={handleCheckboxChange}
                />{" "}
                Keep me signed in
              </label>
              <ForgotTypography>
                <StyledLink to={RoutePaths.ForgotPassword}>
                  Forgot password?
                </StyledLink>
              </ForgotTypography>
            </FooterBox>
            <SubmitButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Sign In
            </SubmitButton>
          </MainForm>
        )}
      </Formik>
      <FooterTypography>
        Don't have an account?{" "}
        <StyledLink to={RoutePaths.SignUp}>Sign Up</StyledLink>
      </FooterTypography>
    </LoginLayout>
  );
};

export default SignIn;
