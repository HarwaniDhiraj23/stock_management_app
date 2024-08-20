import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Select,
  Switch,
  Theme,
  Typography,
  createStyles,
  styled,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../common_component/Layout.tsx";
import { Formik, Form } from "formik";
import { UserInfoValidationSchema } from "../utility/validations/signUpValidation.ts";
import { UserInfoInitialValue } from "../utility/interfaces/IRoute.ts";
import CustomTextField from "../common_component/CustomTextField.tsx";
import { AttachFile, PersonAdd } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import userService from "../service/user-service.ts";
interface State {
  account_activity: boolean;
  meetups: boolean;
  company_news: boolean;
}
function Settings() {
  const [profileData, setProfileData] = useState<UserInfoInitialValue>({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [state, setState] = useState<State>({
    account_activity: false,
    meetups: false,
    company_news: false,
  });

  const initialValue: UserInfoInitialValue = {
    email: profileData?.email,
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    phone_number: profileData?.phone_number,
    address: profileData?.address,
    number: profileData?.block_no,
    city: profileData?.city,
    state: profileData?.state,
    zip: profileData?.zip,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      birthday: selectedDate,
      gender: selectedGender,
      phone_number: values.phone_number,
      address: values.address,
      block_no: values.number,
      city: values.city,
      state: values.state,
      zip: values.zip,
    };

    if (profileData?.user_id === null) {
      await userService.createUserInfo(data);
    } else {
      await userService.updateUserDetail(data);
    }

    resetForm();
    fetchData();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    const notificationKey = name;
    const notificationValue = checked;

    try {
      await userService.updateNotificationStatus({
        [notificationKey]: notificationValue,
      });
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 28,
        height: 16,
        padding: 0,
        display: "flex",
        paddingBottom: 2,
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        "&$checked": {
          transform: "translateX(12px)",
          color: theme.palette.common.white,
          "& + $track": {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
      thumb: {
        width: 12,
        height: 12,
        boxShadow: "none",
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    })
  )(Switch);
  const CustomSelect = withStyles({
    root: {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  })(Select);
  const errorHyperTextStyle = {
    marginLeft: "-10px",
    marginTop: "0px",
    marginBottom: "-12px",
    color: "red",
    lineHeight: 1,
  };

  const notification_data = [
    {
      id: 1,
      title: "Company News",
      description: "Get Rocket news, announcements, and product updates",
      stateKey: "company_news",
    },
    {
      id: 2,
      title: "Account Activity",
      description:
        "Get important notifications about you or activity you've missed",
      stateKey: "account_activity",
    },
    {
      id: 3,
      title: "Meetups Near You",
      description:
        "Get an email when a Dribble Meetup is posted close to my location",
      stateKey: "meetups",
    },
  ];

  const handleChangeGender = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGender(event.target.value as string);
  };
  const fetchData = async () => {
    try {
      const userProfile = await userService.getUserProfile();
      const profile = userProfile.data.data[0];
      setProfileData(profile);
      setSelectedDate(profile?.birthday);
      setSelectedGender(profile?.gender);
      setState((prevState) => ({
        ...prevState,
        company_news: profile?.company_news,
        account_activity: profile?.account_activity,
        meetups: profile?.meetups,
      }));

      function isValidDate(dateString) {
        const date = new Date(dateString);
        return date.toString() !== "Invalid Date";
      }

      if (isValidDate(profile?.birthday)) {
        setIsDateValid(true);
      } else {
        setIsDateValid(false);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const handleDateChange = (date_selected) => {
    setSelectedDate(date_selected);
    function isValidDate(dateString) {
      const date = new Date(dateString);
      return date.toString() !== "Invalid Date";
    }
    if (isValidDate(date_selected)) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };
  const handleImageChange = async (event, name) => {
    const file = event.target.files[0];
    console.log("event.target.files[0];=>", event.target.files[0].files.name);
    if (file) {
      setSelectedImage(file);
    }
    if (name === "profile_pic") {
      await userService.uploadProfilePic(file);
      fetchData();
    } else {
      await userService.uploadCoverPic(file);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const MainBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: 20,
  });
  const MainSubBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flex: 2,
  });
  const SettingBox = styled(Box)({
    backgroundColor: "#ffffff",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "15px",
  });
  const TitleStyle = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "15px",
  });
  const MainForm = styled(Form)({
    width: "100%",
  });
  const BirthDateBox = styled(Box)({
    marginBottom: "24px",
    width: "100%",
  });
  const BirthDateLabel = styled(InputLabel)({
    color: "black",
  });
  const LocationTitle = styled(Typography)({
    fontWeight: "bold",
  });
  const SubmitButton = styled(Button)({
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    textTransform: "capitalize",
  });
  const NotificationBox = styled(Box)({
    backgroundColor: "#ffffff",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  });
  const SubNotificationBox = styled(Box)({
    padding: "10px",
  });
  const NotificationName = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  });
  const ProfileMainBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flex: 1,
  });
  const ProfileImage = styled(Box)({
    height: "200px",
    position: "relative",
    borderRadius: "10px",
  });
  const ProfileCoverPic = styled("img")({
    height: "200px",
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "top",
    opacity: "70%",
    objectFit: "cover",
  });
  const ProfileMainPic = styled("img")({
    borderRadius: "50%",
    position: "absolute",
    bottom: "-30px",
    left: "calc(50% - 60px)",
    objectFit: "cover",
    width: "120px",
    height: "120px",
  });
  const ProfileBox = styled(Box)({
    backgroundColor: "#ffffff",
    border: "1px solid white",
    borderRadius: "10px",
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
  });
  const ProfileDetail = styled(Box)({
    height: "200px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  });
  const ProfileText = styled(Typography)({
    fontWeight: "bold",
    textTransform: "capitalize",
  });
  const ProfileButtonBox = styled(Box)({
    display: "flex",
    gap: 10,
    paddingTop: 10,
  });
  const ConnectButton = styled(Button)({
    backgroundColor: "#161D27",
    color: "#ffffff",
    textTransform: "capitalize",
  });
  const ConnectIcon = styled(PersonAdd)({
    marginRight: "5px",
    fontSize: "20px",
    transform: "scaleX(-1)",
  });
  const SendButton = styled(Button)({
    backgroundColor: "#48D4FA",
    color: "#1F2937",
    textTransform: "capitalize",
  });
  const UploadProfileBox = styled(Box)({
    backgroundColor: "#ffffff",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  });
  const UploadProfileMainBox = styled(Box)({
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  });
  const UploadProfileSubBox = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 3,
  });
  const UploadProfileTextBox = styled(Box)({
    alignItems: "center",
    display: "flex",
    marginLeft: "20px",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  });
  const UploadProfileImg = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  });
  const UploadProfileInput = styled("input")({
    display: "none",
  });
  const UploadProfileLabel = styled("label")({
    cursor: "pointer",
    display: "flex",
  });
  const AttachIcon = styled(AttachFile)({
    fontSize: "18px",
  });
  const ImageSizeText = styled(Typography)({
    marginTop: "10px",
  });
  const UploadMainCoverBox = styled(Box)({
    backgroundColor: "#ffffff",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  });
  const UploadCoverBox = styled(Box)({
    margin: "10px",
    display: "flex",
    flexDirection: "row",
  });
  const UploadCoverImageBox = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 3,
  });
  const UploadCoverImg = styled("img")({
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "cover",
  });
  const UploadProfileCoverBox = styled(Box)({
    alignItems: "center",
    display: "flex",
    marginLeft: "20px",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  });
  const UploadCoverLabel = styled("label")({
    cursor: "pointer",
    display: "flex",
  });

  return (
    <Layout>
      <MainBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sm={12}>
            <MainSubBox>
              <SettingBox>
                <TitleStyle variant="h5">General Information</TitleStyle>
                <Formik
                  initialValues={initialValue}
                  enableReinitialize
                  validationSchema={UserInfoValidationSchema}
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            label="First Name"
                            name="first_name"
                            id="first_name"
                            placeholder="Enter your first name"
                            value={values.first_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.first_name && !!errors.first_name}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.first_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            label="Last Name"
                            name="last_name"
                            id="last_name"
                            placeholder="Also your last name"
                            value={values.last_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.last_name && !!errors.last_name}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.last_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <BirthDateBox>
                            <BirthDateLabel>Birth Date</BirthDateLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                variant="inline"
                                margin="normal"
                                id="date-picker-dialog"
                                format="dd/MM/yyyy"
                                placeholder="Select Birth date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                style={{
                                  width: "100%",
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </BirthDateBox>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <BirthDateLabel>Gender</BirthDateLabel>
                          <CustomSelect
                            native
                            variant="outlined"
                            value={selectedGender}
                            onChange={handleChangeGender}
                            style={{
                              width: "100%",
                              height: "40px",
                              padding: 0,
                              marginTop: "7px",
                              borderRadius: "10px",
                            }}
                          >
                            <option aria-label="None" />
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </CustomSelect>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            label="Email"
                            name="email"
                            id="email"
                            placeholder="name@company.com"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.email && !!errors.email}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.email}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            label="Phone Number"
                            name="phone_number"
                            id="phone_number"
                            type="number"
                            placeholder="1234567890"
                            value={values.phone_number}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              touched.phone_number && !!errors.phone_number
                            }
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.phone_number}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <LocationTitle>Location</LocationTitle>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <CustomTextField
                            label="Address"
                            name="address"
                            id="address"
                            placeholder="Enter your home address"
                            value={values.address}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.address && !!errors.address}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.address}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <CustomTextField
                            label="Number"
                            name="number"
                            id="number"
                            placeholder="No."
                            value={values.number}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.number && !!errors.number}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.number}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextField
                            label="City"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={values.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.city && !!errors.city}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.city}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextField
                            label="State"
                            name="state"
                            id="state"
                            placeholder="State"
                            value={values.state}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.state && !!errors.state}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.state}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextField
                            label="ZIP"
                            name="zip"
                            id="zip"
                            placeholder="ZIP"
                            value={values.zip}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.zip && !!errors.zip}
                            touched={touched}
                            errors={errors}
                            errorHyperTextStyle={errorHyperTextStyle}
                            helperText={errors.zip}
                          />
                        </Grid>
                        <SubmitButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={
                            !isValid ||
                            !isDateValid ||
                            !selectedDate ||
                            !selectedGender
                          }
                        >
                          Save All
                        </SubmitButton>
                      </Grid>
                    </MainForm>
                  )}
                </Formik>
              </SettingBox>
              <NotificationBox>
                <LocationTitle variant="h5">
                  Alerts & Notifications
                </LocationTitle>
                {notification_data.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <SubNotificationBox>
                      <Typography variant="body1">{item.title}</Typography>
                      <NotificationName>
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                        <AntSwitch
                          checked={state[item.stateKey]}
                          onChange={handleChange}
                          name={item.stateKey}
                        />
                      </NotificationName>
                    </SubNotificationBox>
                    {index < notification_data.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </NotificationBox>
            </MainSubBox>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <ProfileMainBox>
              <ProfileBox>
                <ProfileImage>
                  <ProfileCoverPic
                    src={
                      profileData.cover_pic
                        ? "http://localhost:3001/images/" +
                          profileData.cover_pic
                        : "https://rb.gy/3jub6u"
                    }
                    alt="cover_pic"
                  />
                  <ProfileMainPic
                    src={
                      profileData.profile_pic
                        ? "http://localhost:3001/images/" +
                          profileData?.profile_pic
                        : "https://shorturl.at/MXKca"
                    }
                    alt="profile_pic"
                  />
                </ProfileImage>

                <ProfileDetail>
                  <ProfileText>{profileData.full_name}</ProfileText>
                  <Typography>Senior Software Engineer</Typography>
                  <Typography>New York, USA</Typography>
                  <ProfileButtonBox>
                    <ConnectButton variant="contained">
                      <ConnectIcon />
                      connect
                    </ConnectButton>
                    <SendButton variant="contained">send message</SendButton>
                  </ProfileButtonBox>
                </ProfileDetail>
              </ProfileBox>
              <UploadProfileBox>
                <LocationTitle variant="h5">Select profile photo</LocationTitle>
                <UploadProfileMainBox>
                  <UploadProfileSubBox>
                    <UploadProfileImg
                      alt="profile_upload_image"
                      src="https://shorturl.at/Gl2ro"
                    />
                  </UploadProfileSubBox>
                  <UploadProfileTextBox>
                    <Box>
                      <UploadProfileInput
                        accept="image/*"
                        id="raised-button-file-profile"
                        type="file"
                        onChange={(event) =>
                          handleImageChange(event, "profile_pic")
                        }
                      />
                      <UploadProfileLabel htmlFor="raised-button-file-profile">
                        <AttachIcon />
                        <Typography
                          variant="body2"
                          component="span"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                        >
                          Choose Image
                        </Typography>
                      </UploadProfileLabel>
                    </Box>
                    <Box>
                      <ImageSizeText variant="body2">
                        JPG or PNG. Max size of 800K
                      </ImageSizeText>
                    </Box>
                  </UploadProfileTextBox>
                </UploadProfileMainBox>
              </UploadProfileBox>
              <UploadMainCoverBox>
                <LocationTitle variant="h5">Select cover photo</LocationTitle>
                <UploadCoverBox>
                  <UploadCoverImageBox>
                    <UploadCoverImg
                      alt="profile_upload_image"
                      src="https://shorturl.at/boMJd"
                    />
                  </UploadCoverImageBox>
                  <UploadProfileCoverBox>
                    <Box>
                      <UploadProfileInput
                        accept="image/*"
                        id="raised-button-file-cover"
                        type="file"
                        onChange={(event) =>
                          handleImageChange(event, "cover_pic")
                        }
                      />
                      <UploadCoverLabel htmlFor="raised-button-file-cover">
                        <AttachIcon />
                        <Typography
                          variant="body2"
                          component="span"
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                        >
                          Choose Image
                        </Typography>
                      </UploadCoverLabel>
                    </Box>
                    <Box>
                      <ImageSizeText variant="body2">
                        JPG or PNG. Max size of 800K
                      </ImageSizeText>
                    </Box>
                  </UploadProfileCoverBox>
                </UploadCoverBox>
              </UploadMainCoverBox>
            </ProfileMainBox>
          </Grid>
        </Grid>
      </MainBox>
    </Layout>
  );
}

export default Settings;
