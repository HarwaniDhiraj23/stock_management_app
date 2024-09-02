import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import {
  AccountCircle,
  LockOutlined,
  MailOutlineOutlined,
  PersonOutlineOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { signUpValidationSchema } from "../utility/validations/signUpValidation.ts";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import { Link, useNavigate } from "react-router-dom";
import { SignUpInitialValue } from "../utility/interfaces/IRoute.ts";
import userService from "../service/user-service.ts";
import LoginLayout from "../common_component/CommonLayout.tsx";
import { handleRedirect } from "../utility/helper/handleRedirect.ts";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues: SignUpInitialValue = {
    full_name: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      resetForm();
      await userService.createUser({
        full_name: values.full_name,
        email: values.email,
        password: values.password,
      });
      navigate(RoutePaths.SignIn);
    } catch (error) {
      handleRedirect(error, navigate);
    }
  };
  const FormError = styled(FormHelperText)({
    marginLeft: "-10px",
    marginTop: "0px",
    marginBottom: "-12px",
    color: "red",
    lineHeight: 1,
  });
  const MainBox = styled(Box)({
    borderRadius: "50%",
    backgroundColor: "#FAF9FC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  });
  const AccountCircleIcon = styled(AccountCircle)({
    fontSize: "30px",
  });
  const MainTitle = styled(Typography)({
    fontSize: "20px",
    fontWeight: "bold",
  });
  const DetailTitle = styled(Typography)({
    fontSize: "13px",
    marginBottom: "24px",
  });
  const MainDivider = styled(Divider)({
    width: "100%",
    marginBottom: "12px",
  });
  const MainLabel = styled(InputLabel)({
    fontSize: "13px",
    color: "black",
    marginTop: "12px",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });
  const SubmitButton = styled(Button)({
    marginTop: "24px",
    textTransform: "capitalize",
  });
  const FooterText = styled(Typography)({
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    marginBottom: "24px",
  });
  const LinkText = styled(Link)({
    textDecoration: "none",
  });
  const FooterTypography = styled(Typography)({
    marginTop: "24px",
  });
  return (
    <LoginLayout>
      <MainBox>
        <AccountCircleIcon />
      </MainBox>
      <MainTitle>Create a new Account</MainTitle>
      <DetailTitle>Enter your details to register</DetailTitle>
      <MainDivider />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={signUpValidationSchema}
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
          <MainForm onSubmit={handleSubmit} style={{ width: "100%" }}>
            <MainLabel>Full Name</MainLabel>
            <TextField
              variant="outlined"
              name="full_name"
              id="full_name"
              type="text"
              placeholder="Full Name"
              style={{
                marginBottom: "12px",
                marginTop: "5px",
                width: "100%",
              }}
              InputProps={{
                style: {
                  height: "40px",
                  borderRadius: "10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlined />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              value={values.full_name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.full_name && !!errors.full_name}
              helperText={
                touched.full_name && (
                  <FormError error>{errors.full_name}</FormError>
                )
              }
            />
            <MainLabel>Email</MainLabel>
            <TextField
              variant="outlined"
              name="email"
              id="email"
              type="text"
              autoComplete="off"
              placeholder="Email"
              style={{
                marginBottom: "15px",
                marginTop: "5px",
                width: "100%",
              }}
              InputProps={{
                style: {
                  height: "40px",
                  borderRadius: "10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineOutlined />
                  </InputAdornment>
                ),
              }}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={
                touched.email && <FormError error>{errors.email}</FormError>
              }
            />
            <MainLabel>Password</MainLabel>
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
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
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

            <SubmitButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Sign Up
            </SubmitButton>
          </MainForm>
        )}
      </Formik>
      <FooterText>
        By clicking Sign Up, you agree to accept Apex Financial's{" "}
        <LinkText to={RoutePaths.SignUp}>Terms and Conditions</LinkText>
      </FooterText>
      <MainDivider />
      <FooterTypography>
        Already a member? <LinkText to={RoutePaths.SignIn}>Sign In</LinkText>
      </FooterTypography>
    </LoginLayout>
  );
};

export default SignUp;
