import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ResetPasswordValidationSchema } from "../utility/validations/signUpValidation.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordInitialValue } from "../utility/interfaces/IRoute.ts";
import userService from "../service/user-service.ts";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import LoginLayout from "../common_component/CommonLayout.tsx";
import {
  HyperTextStyle,
  InputLabelStyle,
  TextFieldStyled,
  TypoTitle,
} from "../utility/Styles/CommonStyles.tsx";
import { handleRedirect } from "../utility/helper/handleRedirect.ts";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const initialValue: ResetPasswordInitialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { resetForm }) => {
    resetForm();
    try {
      await userService.resetPassword({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        token: token,
      });
      navigate(RoutePaths.SignIn);
    } catch (error) {
      handleRedirect(error, navigate);
    }
  };

  const SubmitButton = styled(Button)({
    marginTop: "24px",
    textTransform: "capitalize",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });

  return (
    <LoginLayout>
      <TypoTitle>Reset Password</TypoTitle>
      <Formik
        initialValues={initialValue}
        enableReinitialize
        validationSchema={ResetPasswordValidationSchema}
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
            <TextFieldStyled
              variant="outlined"
              name="email"
              id="email"
              type="text"
              autoComplete="off"
              placeholder="john@company.com"
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
            <InputLabelStyle>New Password</InputLabelStyle>
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
                touched.password
                  ? errors.password && (
                      <HyperTextStyle error>{errors.password}</HyperTextStyle>
                    )
                  : undefined
              }
            />
            <InputLabelStyle>Confirm Password</InputLabelStyle>
            <TextFieldStyled
              variant="outlined"
              name="confirmPassword"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
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
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={
                touched.confirmPassword
                  ? errors.confirmPassword && (
                      <HyperTextStyle error>
                        {errors.confirmPassword}
                      </HyperTextStyle>
                    )
                  : undefined
              }
            />
            <SubmitButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={!isValid}
            >
              Recover Password
            </SubmitButton>
            {/* </Box> */}
          </MainForm>
        )}
      </Formik>
    </LoginLayout>
  );
};

export default ResetPassword;
