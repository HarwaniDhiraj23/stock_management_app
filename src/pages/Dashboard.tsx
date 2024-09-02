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
const SalesMainBox = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "600px",
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
  const [showSales, setSales] = useState<any>([]);
  const [alignment, setAlignment] = useState<string>("day");

  useEffect(() => {
    const fetchData = async () => {
      const result = await StockApi.getRandomStock();
      setSales(result.data.data);
    };
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
      <SubBox style={{}}>
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
          <Grid item xs={12} sm={12} md={4}>
            <SalesMainBox>
              <SalesTitle variant="h6">Weekly Sales</SalesTitle>
              <SalesAvgTitle variant="body2">28 Daily Avg.</SalesAvgTitle>
              <Divider />
              <SalesDataMainBox>
                <SalesDataMainBox>
                  <Typography variant="h3" style={{ fontWeight: "bold" }}>
                    $456,678
                  </Typography>
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
          <Grid item xs={12} sm={12} md={4}>
            <SalesMainBox>
              <Typography
                variant="h6"
                style={{ padding: "20px", fontWeight: "bold" }}
              >
                Top Author Earnings
              </Typography>
              <Divider />
              <Box>
                {profiles.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ display: "flex" }}>
                        <img
                          src="https://demo.themesberg.com/volt-pro-react/static/media/profile-picture-1.508e07ee.jpg"
                          alt="img"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10px",
                            marginRight: "10px",
                          }}
                        />

                        <Box>
                          <Typography>{profile.name}</Typography>
                          <Typography variant="body2">
                            {profile.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography>{profile.salary}</Typography>
                      </Box>
                    </Box>
                    {index < profiles.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
            </SalesMainBox>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SalesMainBox>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ padding: "20px", fontWeight: "bold" }}
                >
                  Notifications
                </Typography>
                <Button
                  style={{
                    textTransform: "capitalize",
                    marginRight: "20px",
                  }}
                >
                  <Visibility style={{ marginRight: "5px" }} />
                  View All
                </Button>
              </Box>
              <Divider />
              <Stepper
                orientation="vertical"
                style={{
                  overflowY: "auto",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
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
            </SalesMainBox>
          </Grid>
        </Grid>
      </SalesBox>
      <Box
        style={{
          margin: "20px 10px 10px 10px",
          gap: 20,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          style={{
            display: "flex",
            flex: 2,
            backgroundColor: "#F5F8FB",
            borderRadius: "10px",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Box width={"100%"} style={{ borderRadius: "10px" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFF",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Typography
                variant="h6"
                style={{ padding: "20px", fontWeight: "bold" }}
              >
                Page visits
              </Typography>
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "#FFF",
                  backgroundColor: "#1D2030",
                  marginRight: "20px",
                  borderRadius: "10px",
                }}
              >
                See All
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#F2F4F6" }}>
                  <TableRow>
                    <TableCell>Page Name</TableCell>
                    <TableCell align="right">Page Views</TableCell>
                    <TableCell align="right">Page Value</TableCell>
                    <TableCell align="right">Bounce rate</TableCell>
                  </TableRow>
                </TableHead>
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
          </Box>
          <Box style={{ display: "flex", gap: 20 }}>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ padding: "20px", fontWeight: "bold" }}
                >
                  Team members
                </Typography>
                <Button
                  style={{
                    textTransform: "capitalize",
                    color: "#FFF",
                    backgroundColor: "#1D2030",
                    marginRight: "20px",
                    borderRadius: "10px",
                  }}
                >
                  See All
                </Button>
              </Box>
              <Divider />
              <Box>
                {teamMembers.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src="https://demo.themesberg.com/volt-pro-react/static/media/profile-picture-1.508e07ee.jpg"
                          alt="img"
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "10px",
                            marginRight: "10px",
                          }}
                        />

                        <Box>
                          <Typography>{profile.name}</Typography>
                          <Typography variant="body2">
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <FiberManualRecordSharp
                                style={{
                                  fontSize: "small",
                                  color: statusColors[profile.status] || "red",
                                }}
                              />
                              {profile.status}
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                      <Box>{profile.action}</Box>
                    </Box>
                    {index < teamMembers.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
            </Box>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ padding: "20px", fontWeight: "bold" }}
                >
                  Progress track
                </Typography>
                <Button
                  style={{
                    textTransform: "capitalize",
                    color: "#FFF",
                    backgroundColor: "#1D2030",
                    marginRight: "20px",
                    borderRadius: "10px",
                  }}
                >
                  See Tasks
                </Button>
              </Box>
              <Divider />
              <Box>
                {teamProgress.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "10px 0 10px 0",
                      }}
                    >
                      <Assignment />

                      <Box
                        width={"100%"}
                        marginRight={"10px"}
                        marginLeft={"10px"}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2">
                            {profile.name}
                          </Typography>
                          <Typography variant="body2">
                            {profile.barPer}
                          </Typography>
                        </Box>
                        <ProgressBar
                          variant="determinate"
                          value={profile.value}
                          barColor={profile.color}
                        />
                      </Box>
                    </Box>
                    {index < teamProgress.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
            </Box>
          </Box>
          <Box style={{ display: "flex", gap: 20 }}>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography
                variant="h6"
                style={{ padding: "20px", fontWeight: "bold" }}
              >
                Events
              </Typography>

              <Divider />
              <Box>
                {eventData.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Box
                          style={{ borderRadius: "10px", marginLeft: "20px" }}
                        >
                          <Box
                            style={{
                              backgroundColor: "#E11D48",
                              color: "#FFF",
                              width: "50px",
                              height: "20px",
                              borderTopRightRadius: "10px",
                              borderTopLeftRadius: "10px",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {profile.month}
                          </Box>
                          <Box
                            style={{
                              backgroundColor: "#F2F4F6",
                              width: "50px",
                              height: "40px",
                              borderBottomRightRadius: "10px",
                              borderBottomLeftRadius: "10px",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                              fontSize: "20px",
                            }}
                          >
                            {profile.day}
                          </Box>
                        </Box>

                        <Box style={{ marginLeft: "50px" }}>
                          <Typography variant="h5">{profile.title}</Typography>
                          <Typography variant="body1">
                            {profile.organizedBy}
                          </Typography>
                          <Typography variant="body1">
                            {profile.time}
                          </Typography>
                          <Typography variant="body1">
                            {profile.place}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {index < teamMembers.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
              <Divider />
              <Button
                style={{
                  textTransform: "capitalize",
                  padding: "15px 0 15px 0",
                }}
              >
                <Visibility style={{ marginRight: "5px" }} />
                View All
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "#F5F8FB",
            borderRadius: "10px",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box style={{ display: "flex", gap: 20, width: "100%" }}>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Box>
                {globalRank.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ display: "flex" }}>
                        {profile.icon}

                        <Box style={{ marginLeft: "10px" }}>
                          <Typography>{profile.name}</Typography>
                          <Typography variant="body2">
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              {profile.details}
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                      <Box>{profile.position}</Box>
                    </Box>
                    {index < globalRank.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
            </Box>
          </Box>
          <Box style={{ display: "flex", gap: 20, width: "100%" }}>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Box>
                <Box style={{ padding: "20px 20px 15px 20px" }}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Acquisition
                  </Typography>
                  <Typography variant="body2">
                    Tells you where your visitors originated from, such as
                    search engines, social networks or website referrals.
                  </Typography>
                </Box>
                {AcquisitionData.map((profile) => (
                  <Box
                    key={profile.id}
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box style={{ display: "flex", alignItems: "center" }}>
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
                      <Box marginLeft={"10px"}>
                        <Typography>{profile.title}</Typography>
                        <Typography variant="body2">
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              fontSize: "20px",
                            }}
                          >
                            {profile.data}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box style={{ display: "flex", gap: 20, width: "100%" }}>
            <Box
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ padding: "20px", fontWeight: "bold" }}
                >
                  Visits past 30 days by country
                </Typography>
              </Box>
              <Divider />
              <Box>
                {CountryProgress.map((profile, index) => (
                  <>
                    <Box
                      style={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "10px 0 10px 0",
                      }}
                    >
                      <img
                        src={profile.imgPath}
                        alt="profile"
                        style={{ width: "30px", height: "30px" }}
                      />

                      <Box
                        width={"100%"}
                        marginRight={"10px"}
                        marginLeft={"10px"}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              display: "flex",
                              gap: "10px",
                            }}
                          >
                            {profile.name}{" "}
                            <Typography
                              variant="body2"
                              style={{ color: "gray" }}
                            >
                              {profile.data}
                            </Typography>
                          </Typography>
                          <Typography variant="body2">
                            {profile.barPer}
                          </Typography>
                        </Box>
                        <ProgressBar
                          variant="determinate"
                          value={profile.value}
                          barColor={profile.color}
                        />
                      </Box>
                    </Box>
                    {index < CountryProgress.length - 1 && (
                      <Divider style={{ margin: "0px 10px 0px 10px" }} />
                    )}
                  </>
                ))}
              </Box>
              <Divider />
              <Button
                style={{
                  textTransform: "capitalize",
                  padding: "15px 0 15px 0",
                }}
              >
                <Visibility style={{ marginRight: "5px" }} />
                View All
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Dashboard;
