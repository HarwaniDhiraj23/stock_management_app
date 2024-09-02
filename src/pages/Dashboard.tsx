import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../common_component/Layout.tsx";
import LineChart from "../common_component/LineChart.tsx";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import StockApi from "../service/stock-service.ts";
import {
  Assignment,
  ExpandLess,
  ExpandMore,
  FiberManualRecordSharp,
  Visibility,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import {
  AcquisitionData,
  CountryProgress,
  eventData,
  globalRank,
  profiles,
  rows,
  steps,
  teamMembers,
  teamProgress,
} from "../utility/constant/DashboardConstants.tsx";
import { StockData } from "../utility/interfaces/IRoute.ts";
import { handleRedirect } from "../utility/helper/handleRedirect.ts";
const MainBox = styled(Box)({
  backgroundColor: "#ACEBFD",
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
});

const HeaderBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const StockTitle = styled(Typography)({
  fontWeight: "bold",
});

const StockStatus = styled(Typography)({
  display: "flex",
});

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)({
  height: "30px",
});

const StatusSpan = styled("span")(({ status }: any) => ({
  color: status === "high" ? "green" : "red",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const ToggleButtonStyled = styled(ToggleButton)(
  ({ alignment, period }: any) => ({
    backgroundColor: alignment === period ? "red" : "#00A1CE",
    "& .MuiToggleButton-label": {
      color: "black",
    },
  })
);

const ChartBox = styled(Box)({
  flex: 1,
  display: "flex",
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
});

const ProgressBar = styled(LinearProgress)(({ barColor }: any) => ({
  height: "8px",
  width: "100%",
  borderRadius: "10px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: barColor || "pink",
  },
}));

const SubBox = styled(Box)({
  gap: 10,
  marginLeft: "10px",
  marginRight: "10px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
const SalesBox = styled(Box)({
  display: "flex",
  gap: 10,
  margin: "10px",
});
const MainSalesBox = styled(Box)({
  margin: "20px 10px 10px 10px",
  gap: 20,
  display: "flex",
  flexDirection: "row",
});
const SubSalesBox = styled(Box)({
  display: "flex",
  flex: 2,
  backgroundColor: "#F5F8FB",
  borderRadius: "10px",
  flexDirection: "column",
  gap: 20,
});
const ThirdSalesBox = styled(Box)({
  display: "flex",
  flex: 1,
  backgroundColor: "#F5F8FB",
  borderRadius: "10px",
  flexDirection: "column",
  gap: "20px",
});
const GlobalRankMainBox = styled(Box)({
  display: "flex",
  gap: 20,
  width: "100%",
});
const GlobalRankBox = styled(Box)({
  display: "flex",
});
const GlobalRankSubBox = styled(Box)({
  marginLeft: "10px",
});
const PageVisitMainBox = styled(Box)({
  borderRadius: "10px",
  width: "100%",
});
const TeamMemberMainBox = styled(Box)({
  display: "flex",
  gap: 20,
});
const TeamMemberSubBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});
const AcquisitionBox = styled(Box)({
  padding: "20px 20px 15px 20px",
});
const AcquisitionSubBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: "20px",
});
const TeamMemberTitleBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});
const ProgressMainBox = styled(Box)({
  padding: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "10px 0 10px 0",
});
const VisitImage = styled("img")({
  width: "30px",
  height: "30px",
});
const ProgressBox = styled(Box)({
  width: "100%",
  marginLeft: "10px",
  marginRight: "10px",
});
const PageVisitSubBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#FFF",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
});
const PageVisitHeadTitle = styled(TableHead)({
  backgroundColor: "#F2F4F6",
});
const PageVisitTitle = styled(Typography)({
  padding: "20px",
  fontWeight: "bold",
});
const PageVisitButton = styled(Button)({
  textTransform: "capitalize",
  color: "#FFF",
  backgroundColor: "#1D2030",
  marginRight: "20px",
  borderRadius: "10px",
});
const SalesMainBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "600px",
});
const NotificationMainBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
const VisitProfileName = styled(Typography)({
  display: "flex",
  gap: "10px",
});
const VisitProfileData = styled(Typography)({
  color: "gray",
});
const NotificationStepper = styled(Stepper)({
  overflowY: "auto",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
});
const NotificationTitle = styled(Typography)({
  padding: "20px",
  fontWeight: "bold",
});
const NotificationButton = styled(Button)({
  textTransform: "capitalize",
  marginRight: "20px",
});
const NotificationViewIcon = styled(Visibility)({
  marginRight: "5px",
});
const TopAuthorTitle = styled(Typography)({
  padding: "20px",
  fontWeight: "bold",
});
const TopAuthorBox = styled(Box)({
  padding: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});
const EventViewButton = styled(Button)({
  textTransform: "capitalize",
  padding: "15px 0 15px 0",
});
const TeamMemberBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
const EventBox = styled(Box)({
  borderRadius: "10px",
  marginLeft: "20px",
});
const EventDataBox = styled(Box)({
  marginLeft: "50px",
});
const EventMainBox = styled(Box)({
  backgroundColor: "#E11D48",
  color: "#FFF",
  width: "50px",
  height: "20px",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
});
const EventSubBox = styled(Box)({
  backgroundColor: "#F2F4F6",
  width: "50px",
  height: "40px",
  borderBottomRightRadius: "10px",
  borderBottomLeftRadius: "10px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  fontSize: "20px",
});
const TeamMemberImg = styled("img")({
  width: "35px",
  height: "35px",
  borderRadius: "10px",
  marginRight: "10px",
});
const TeamMemberStatusBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
});
const TopAuthorMainBox = styled(Box)({
  display: "flex",
});
const TopAuthorImg = styled("img")({
  width: "50px",
  height: "50px",
  borderRadius: "10px",
  marginRight: "10px",
});
const TopAuthorDivider = styled(Divider)({
  margin: "0px 10px 0px 10px",
});

const SalesTitle = styled(Typography)({
  paddingLeft: "20px",
  paddingTop: "10px",
});
const SalesAvgTitle = styled(Typography)({
  paddingLeft: "20px",
  paddingBottom: "10px",
});
const ChartSubBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px 0px 10px 10px",
});
const SalesDataMainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flex: 1,
});
const SalesButton = styled(Button)({
  color: "white",
  backgroundColor: "#1D2030",
});
const ChartBox2 = styled(Box)({
  display: "flex",
  alignItems: "left",
  justifyContent: "center",
  flexDirection: "column",
  marginLeft: "10px",
});
const ChartCurrentText = styled(Typography)({
  fontWeight: "bold",
});
const ChartDayText = styled(Typography)({
  fontSize: "11px",
});

function Dashboard() {
  const navigate = useNavigate();
  const [showSales, setShowSales] = useState<StockData[]>([]);
  const [alignment, setAlignment] = useState<string>("day");

  const fetchData = async () => {
    try {
      const result = await StockApi.getRandomStock();
      setShowSales(result.data.data as StockData[]);
    } catch (error) {
      handleRedirect(error, navigate);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const labels = {
    day: showSales[0]?.day,
    week: showSales[0]?.week,
    month: showSales[0]?.month,
    year: showSales[0]?.year,
  };

  const values = {
    day: showSales[0]?.day_value,
    week: showSales[0]?.week_value,
    month: showSales[0]?.month_value,
    year: showSales[0]?.year_value,
  };

  const data = {
    labels: labels[alignment],
    datasets: [
      {
        label: showSales[0]?.stock_name,
        data: values[alignment],
        borderColor: "#17A5CE",
        backgroundColor: "#17A5CE",
        fill: true,
        tension: 0.1,
        pointBackgroundColor: "#17A5CE",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 7,
      },
    ],
  };

  const generateBarData = (index: number) => ({
    labels: showSales[index]?.day,
    datasets: [
      {
        label: showSales[index]?.stock_name,
        data: showSales[index]?.day_value,
        borderColor: "#17A5CE",
        backgroundColor: "#17A5CE",
        fill: true,
        tension: 0.1,
        pointBackgroundColor: "#17A5CE",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 7,
      },
    ],
  });
  const statusColors = {
    Online: "green",
    "In a meeting": "yellow",
    Offline: "red",
  };

  return (
    <Layout>
      <MainBox>
        <HeaderBox>
          <Box>
            <Typography variant="h6">Sales Value</Typography>
            <StockTitle variant="h5">${showSales[0]?.current_value}</StockTitle>
            <StockStatus variant="body2">
              Yesterday{" "}
              <StatusSpan status={showSales[0]?.status}>
                {showSales[0]?.status === "high" ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
                {showSales[0]?.average}%
              </StatusSpan>
            </StockStatus>
          </Box>
          <ToggleButtonGroupStyled
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            {["day", "week", "month", "year"].map((period) => (
              <ToggleButtonStyled
                key={period}
                value={period}
                aria-label={`${period} aligned`}
                alignment={alignment}
                period={period}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </ToggleButtonStyled>
            ))}
          </ToggleButtonGroupStyled>
        </HeaderBox>
        <LineChart data={data} chartType="line" labels={true} />
      </MainBox>
      <SubBox>
        <Grid container spacing={2}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} key={index}>
              <ChartBox>
                <ChartSubBox>
                  <LineChart
                    data={generateBarData(index)}
                    chartType="line"
                    labels={false}
                    style={{ width: "150px" }}
                  />
                </ChartSubBox>
                <ChartBox2>
                  <ChartCurrentText variant="h6">
                    ${showSales[index]?.current_value}
                  </ChartCurrentText>
                  <ChartDayText>
                    {showSales[index]?.day[0]}-{showSales[index]?.day[9]}
                  </ChartDayText>
                  <StockStatus style={{ fontSize: "13px" }}>
                    <StatusSpan status={showSales[index]?.status}>
                      {showSales[index]?.status === "high" ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                      {showSales[index]?.average}%
                    </StatusSpan>
                  </StockStatus>
                </ChartBox2>
              </ChartBox>
            </Grid>
          ))}
        </Grid>
      </SubBox>
      <SalesBox>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <SalesMainBox>
              <SalesTitle variant="h6">Weekly Sales</SalesTitle>
              <SalesAvgTitle variant="body2">28 Daily Avg.</SalesAvgTitle>
              <Divider />
              <SalesDataMainBox>
                <SalesDataMainBox>
                  <ChartCurrentText variant="h3">$456,678</ChartCurrentText>
                  <Typography variant="body1">
                    Total Themesberg Sales
                  </Typography>
                  <SalesButton variant="contained">Generate Report</SalesButton>
                </SalesDataMainBox>
                <SalesDataMainBox>
                  <LineChart data={data} chartType="bar" labels={false} />
                </SalesDataMainBox>
              </SalesDataMainBox>
            </SalesMainBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <SalesMainBox>
              <TopAuthorTitle variant="h6">Top Author Earnings</TopAuthorTitle>
              <Divider />
              <Box>
                {profiles.map((profile, index) => (
                  <>
                    <TopAuthorBox>
                      <TopAuthorMainBox>
                        <TopAuthorImg
                          src="https://demo.themesberg.com/volt-pro-react/static/media/profile-picture-1.508e07ee.jpg"
                          alt="img"
                        />

                        <Box>
                          <Typography>{profile.name}</Typography>
                          <Typography variant="body2">
                            {profile.role}
                          </Typography>
                        </Box>
                      </TopAuthorMainBox>
                      <Box>
                        <Typography>{profile.salary}</Typography>
                      </Box>
                    </TopAuthorBox>
                    {index < profiles.length - 1 && <TopAuthorDivider />}
                  </>
                ))}
              </Box>
            </SalesMainBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <SalesMainBox>
              <NotificationMainBox>
                <NotificationTitle variant="h6">
                  Notifications
                </NotificationTitle>
                <NotificationButton>
                  <NotificationViewIcon />
                  View All
                </NotificationButton>
              </NotificationMainBox>
              <Divider />
              <NotificationStepper orientation="vertical">
                {steps.map((steps, index) => (
                  <Step key={steps.id} active={true} completed={true}>
                    <StepLabel>{steps.icon}</StepLabel>
                    <StepContent>
                      <Typography>{steps.data}</Typography>
                      <Typography>{steps.days}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </NotificationStepper>
            </SalesMainBox>
          </Grid>
        </Grid>
      </SalesBox>
      <MainSalesBox>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <SubSalesBox>
              <PageVisitMainBox>
                <PageVisitSubBox>
                  <PageVisitTitle variant="h6">Page visits</PageVisitTitle>
                  <PageVisitButton>See All</PageVisitButton>
                </PageVisitSubBox>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <PageVisitHeadTitle>
                      <TableRow>
                        <TableCell>Page Name</TableCell>
                        <TableCell align="right">Page Views</TableCell>
                        <TableCell align="right">Page Value</TableCell>
                        <TableCell align="right">Bounce rate</TableCell>
                      </TableRow>
                    </PageVisitHeadTitle>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.Name}>
                          <TableCell component="th" scope="row">
                            {row.Name}
                          </TableCell>
                          <TableCell align="right">{row.View}</TableCell>
                          <TableCell align="right">{row.Value}</TableCell>
                          <TableCell align="right">{row.Rate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </PageVisitMainBox>
              <TeamMemberMainBox>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TeamMemberSubBox>
                      <TeamMemberTitleBox>
                        <TopAuthorTitle variant="h6">
                          Team members
                        </TopAuthorTitle>
                        <PageVisitButton>See All</PageVisitButton>
                      </TeamMemberTitleBox>
                      <Divider />
                      <Box>
                        {teamMembers.map((profile, index) => (
                          <>
                            <TopAuthorBox>
                              <TeamMemberBox>
                                <TeamMemberImg
                                  src="https://demo.themesberg.com/volt-pro-react/static/media/profile-picture-1.508e07ee.jpg"
                                  alt="img"
                                />

                                <Box>
                                  <Typography>{profile.name}</Typography>
                                  <Typography variant="body2">
                                    <TeamMemberStatusBox>
                                      <FiberManualRecordSharp
                                        style={{
                                          fontSize: "small",
                                          color:
                                            statusColors[profile.status] ||
                                            "red",
                                        }}
                                      />
                                      {profile.status}
                                    </TeamMemberStatusBox>
                                  </Typography>
                                </Box>
                              </TeamMemberBox>
                              <Box>{profile.action}</Box>
                            </TopAuthorBox>
                            {index < teamMembers.length - 1 && (
                              <TopAuthorDivider />
                            )}
                          </>
                        ))}
                      </Box>
                    </TeamMemberSubBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <TeamMemberSubBox>
                      <TeamMemberTitleBox>
                        <TopAuthorTitle variant="h6">
                          Progress track
                        </TopAuthorTitle>
                        <PageVisitButton>See Tasks</PageVisitButton>
                      </TeamMemberTitleBox>
                      <Divider />
                      <Box>
                        {teamProgress.map((profile, index) => (
                          <>
                            <ProgressMainBox>
                              <Assignment />
                              <ProgressBox>
                                <NotificationMainBox>
                                  <Typography variant="body2">
                                    {profile.name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {profile.barPer}
                                  </Typography>
                                </NotificationMainBox>
                                <ProgressBar
                                  variant="determinate"
                                  value={profile.value}
                                  barColor={profile.color}
                                />
                              </ProgressBox>
                            </ProgressMainBox>
                            {index < teamProgress.length - 1 && (
                              <TopAuthorDivider />
                            )}
                          </>
                        ))}
                      </Box>
                    </TeamMemberSubBox>
                  </Grid>
                </Grid>
              </TeamMemberMainBox>
              <TeamMemberMainBox>
                <TeamMemberSubBox>
                  <TopAuthorTitle variant="h6">Events</TopAuthorTitle>

                  <Divider />
                  <Box>
                    {eventData.map((profile, index) => (
                      <>
                        <TopAuthorBox>
                          <TeamMemberBox>
                            <EventBox>
                              <EventMainBox>{profile.month}</EventMainBox>
                              <EventSubBox>{profile.day}</EventSubBox>
                            </EventBox>

                            <EventDataBox>
                              <Typography variant="h5">
                                {profile.title}
                              </Typography>
                              <Typography variant="body1">
                                {profile.organizedBy}
                              </Typography>
                              <Typography variant="body1">
                                {profile.time}
                              </Typography>
                              <Typography variant="body1">
                                {profile.place}
                              </Typography>
                            </EventDataBox>
                          </TeamMemberBox>
                        </TopAuthorBox>
                        {index < teamMembers.length - 1 && <TopAuthorDivider />}
                      </>
                    ))}
                  </Box>
                  <Divider />
                  <EventViewButton>
                    <NotificationViewIcon />
                    View All
                  </EventViewButton>
                </TeamMemberSubBox>
              </TeamMemberMainBox>
            </SubSalesBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <ThirdSalesBox>
              <GlobalRankMainBox>
                <TeamMemberSubBox>
                  <Box>
                    {globalRank.map((profile, index) => (
                      <>
                        <TopAuthorBox>
                          <GlobalRankBox>
                            {profile.icon}
                            <GlobalRankSubBox>
                              <Typography>{profile.name}</Typography>
                              <Typography variant="body2">
                                <TeamMemberStatusBox>
                                  {profile.details}
                                </TeamMemberStatusBox>
                              </Typography>
                            </GlobalRankSubBox>
                          </GlobalRankBox>
                          <Box>{profile.position}</Box>
                        </TopAuthorBox>
                        {index < globalRank.length - 1 && <TopAuthorDivider />}
                      </>
                    ))}
                  </Box>
                </TeamMemberSubBox>
              </GlobalRankMainBox>

              <GlobalRankMainBox>
                <TeamMemberSubBox>
                  <Box>
                    <AcquisitionBox>
                      <ChartCurrentText variant="h6">
                        Acquisition
                      </ChartCurrentText>
                      <Typography variant="body2">
                        Tells you where your visitors originated from, such as
                        search engines, social networks or website referrals.
                      </Typography>
                    </AcquisitionBox>
                    {AcquisitionData.map((profile) => (
                      <TopAuthorBox key={profile.id}>
                        <TeamMemberBox>
                          <Box
                            style={{
                              backgroundColor: profile.iconBg,
                              height: "50px",
                              width: "50px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "10px",
                            }}
                          >
                            {profile.icon}
                          </Box>
                          <GlobalRankSubBox>
                            <Typography>{profile.title}</Typography>
                            <Typography variant="body2">
                              <AcquisitionSubBox>
                                {profile.data}
                              </AcquisitionSubBox>
                            </Typography>
                          </GlobalRankSubBox>
                        </TeamMemberBox>
                      </TopAuthorBox>
                    ))}
                  </Box>
                </TeamMemberSubBox>
              </GlobalRankMainBox>

              <GlobalRankMainBox>
                <TeamMemberSubBox>
                  <NotificationMainBox>
                    <TopAuthorTitle variant="h6">
                      Visits past 30 days by country
                    </TopAuthorTitle>
                  </NotificationMainBox>
                  <Divider />
                  <Box>
                    {CountryProgress.map((profile, index) => (
                      <>
                        <ProgressMainBox>
                          <VisitImage src={profile.imgPath} alt="profile" />

                          <ProgressBox>
                            <NotificationMainBox>
                              <VisitProfileName variant="body2">
                                {profile.name}{" "}
                                <VisitProfileData variant="body2">
                                  {profile.data}
                                </VisitProfileData>
                              </VisitProfileName>
                              <Typography variant="body2">
                                {profile.barPer}
                              </Typography>
                            </NotificationMainBox>
                            <ProgressBar
                              variant="determinate"
                              value={profile.value}
                              barColor={profile.color}
                            />
                          </ProgressBox>
                        </ProgressMainBox>
                        {index < CountryProgress.length - 1 && (
                          <TopAuthorDivider />
                        )}
                      </>
                    ))}
                  </Box>
                  <Divider />
                  <EventViewButton>
                    <NotificationViewIcon />
                    View All
                  </EventViewButton>
                </TeamMemberSubBox>
              </GlobalRankMainBox>
            </ThirdSalesBox>
          </Grid>
        </Grid>
      </MainSalesBox>
    </Layout>
  );
}

export default Dashboard;
