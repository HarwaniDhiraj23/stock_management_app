import { Button, Box, styled } from "@material-ui/core";
import {
  Sms,
  CalendarToday,
  Public,
  Timeline,
  Flag,
  ExpandLess,
  Folder,
  SignalCellularAlt,
  ShoppingCart,
  Inbox,
  Warning,
  Update,
  ArrowDownward,
  ArrowUpward,
} from "@material-ui/icons";
import React from "react";
import {
  unitedStates,
  canada,
  germany,
  france,
  japan,
  italy,
  netherlands,
  sweden,
} from "../../assets/index.ts";

export const profiles = [
  { name: "Chris Wood", role: "Graphic Designer", salary: "$1834" },
  { name: "Alex Johnson", role: "Web Developer", salary: "$2100" },
  { name: "Jane Doe", role: "UI/UX Designer", salary: "$1950" },
  { name: "Michael Smith", role: "Project Manager", salary: "$2500" },
  { name: "Jane Doe", role: "UI/UX Designer", salary: "$1950" },
  { name: "Michael Smith", role: "Project Manager", salary: "$2500" },
  { name: "Alex Johnson", role: "Web Developer", salary: "$2100" },
];

export const teamMembers = [
  {
    name: "Chris Wood",
    status: "Online",
    action: (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#48D4FA",
          textTransform: "capitalize",
          fontSize: "15px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
      >
        <Sms style={{ fontSize: "17px", marginRight: "5px" }} />
        Invite
      </Button>
    ),
  },
  {
    name: "Alex Johnson",
    status: "In a meeting",
    action: (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#48D4FA",
          textTransform: "capitalize",
          fontSize: "15px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
      >
        <CalendarToday style={{ fontSize: "17px", marginRight: "5px" }} />
        Message
      </Button>
    ),
  },
  {
    name: "Jane Doe",
    status: "Offline",
    action: (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#48D4FA",
          textTransform: "capitalize",
          fontSize: "15px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
      >
        <Sms style={{ fontSize: "17px", marginRight: "5px" }} />
        Invite
      </Button>
    ),
  },
  {
    name: "Michael Smith",
    status: "Online",
    action: (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#48D4FA",
          textTransform: "capitalize",
          fontSize: "15px",
          marginRight: "10px",
          borderRadius: "10px",
        }}
      >
        <CalendarToday style={{ fontSize: "17px", marginRight: "5px" }} />
        Message
      </Button>
    ),
  },
];

export const teamProgress = [
  {
    name: "Rocket - SaaS Template",
    color: "#7C3AED",
    barPer: "34 %",
    value: 34,
  },
  {
    name: "Rocket - SaaS Template",
    color: "#10B981",
    barPer: "60 %",
    value: 60,
  },
  {
    name: "Homepage Design in Figma",
    color: "#FBA918",
    barPer: "45 %",
    value: 45,
  },
  {
    name: "Backend for Themesberg v2",
    color: "#E11D48",
    barPer: "34 %",
    value: 34,
  },
];

export const eventData = [
  {
    day: 30,
    month: "Aug",
    title: "Newmarket Nights",
    organizedBy: "Organized by University of Oxford",
    time: "Time: 20:00 PM",
    place: "Cambridge Boat Club, Cambridge",
  },
  {
    day: 4,
    month: "Sep",
    title: "Noco Hemp Expo",
    organizedBy: "Organized by University of Oxford",
    time: "Wed, 4 Sep - Fri, 6 Sep 2024",
    place: "Denver Expo Club, USA",
  },
  {
    day: 10,
    month: "Oct",
    title: "Canadian National Exhibition (CNE)",
    organizedBy: "Organized by University of Oxford",
    time: "Thu, 10 Oct - Thu, 17 Oct 2024",
    place: "Toronto, Canada",
  },
  {
    day: 15,
    month: "Oct",
    title: "Great Opera Hits",
    organizedBy: "Organized by University of Oxford",
    time: "Tue, 15 Oct - Wed, 16 Oct 2024",
    place: "Sydney Opera House, Australia",
  },
];

export const globalRank = [
  {
    icon: <Public />,
    name: "Global Rank",
    position: (
      <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
        #755 <Timeline />
      </Box>
    ),
  },
  {
    icon: <Flag />,
    name: "Country Rank",
    position: (
      <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
        #32 <Timeline />
      </Box>
    ),
    details: (
      <>
        United States <ExpandLess style={{ color: "green" }} />
      </>
    ),
  },
  {
    icon: <Folder />,
    name: "Category Rank",
    position: (
      <Box style={{ display: "flex", alignItems: "center", gap: 5 }}>
        #11 <Timeline />
      </Box>
    ),
    details: (
      <>
        Computer Technology
        <ExpandLess style={{ color: "green" }} />
      </>
    ),
  },
];

export const AcquisitionData = [
  {
    id: 1,
    icon: <Timeline style={{ color: "#E11D48" }} />,
    title: "Bounce Rate",
    data: "33.50%",
    iconBg: "#F6BBC8",
  },
  {
    id: 2,
    icon: <SignalCellularAlt style={{ color: "#7C3AED" }} />,
    title: "Sessions",
    data: "9,567",
    iconBg: "#D7C4FA",
  },
];

export const CountryProgress = [
  {
    imgPath: unitedStates,
    name: "United States",
    color: "#262B40",
    barPer: "36 %",
    value: 36,
    data: "(272.109)",
  },
  {
    imgPath: canada,
    name: "Canada",
    color: "#61DAFB",
    barPer: "20 %",
    value: 20,
    data: "(160.064)",
  },
  {
    imgPath: germany,
    name: "Germany",
    color: "#1B998B",
    barPer: "15 %",
    value: 15,
    data: "(120.048)",
  },
  {
    imgPath: france,
    name: "France",
    color: "#7C3AED",
    barPer: "8 %",
    value: 8,
    data: "(100.048)",
  },
  {
    imgPath: japan,
    name: "Japan",
    color: "#262B40",
    barPer: "7 %",
    value: 7,
    data: "(56.022)",
  },
  {
    imgPath: italy,
    name: "Italy",
    color: "#262B40",
    barPer: "6 %",
    value: 6,
    data: "(48.019)",
  },
  {
    imgPath: netherlands,
    name: "Netherlands",
    color: "#262B40",
    barPer: "6 %",
    value: 6,
    data: "(40.016)",
  },
  {
    imgPath: sweden,
    name: "Sweden",
    color: "#262B40",
    barPer: "3 %",
    value: 3,
    data: "(26.016)",
  },
];

export const steps = [
  {
    id: 1,
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#D7C4FA",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <ShoppingCart style={{ color: "#7C3AED" }} />
        </Box>{" "}
        You sold an item
      </Box>
    ),
    data: `Bonnie Green just purchased "Volt - Admin Dashboard"!`,
    days: "a day ago",
  },
  {
    id: 2,
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#BDBFC5",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Inbox style={{ color: "#262B40" }} />
        </Box>{" "}
        New message
      </Box>
    ),

    data: `Let's meet at Starbucks at 11:30. Wdyt?`,
    days: "a day ago",
  },
  {
    id: 3,
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#FEE5B9",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Warning style={{ color: "#FBA918" }} />
        </Box>{" "}
        Product issue
      </Box>
    ),
    data: `A new issue has been reported for Pixel Pro.`,
    days: "a day ago",
  },
  {
    id: 4,
    icon: (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box
          style={{
            backgroundColor: "#B7EAD9",
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          <Update style={{ color: "#10B981" }} />
        </Box>{" "}
        Product update
      </Box>
    ),
    data: `Spaces - Listings Template has been updated.`,
    days: "a day ago",
  },
];

const TableRateValue = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
});

function createData(Name: string, View: string, Value: string, Rate: any) {
  return { Name, View, Value, Rate };
}

export const rows = [
  createData(
    "/demo/admin/index.html",
    "4.525",
    "$255",
    <TableRateValue>
      <ArrowDownward style={{ color: "red" }} /> 42.22%
    </TableRateValue>
  ),
  createData(
    "/demo/admin/forms.html",
    "2.987",
    "$139",
    <TableRateValue>
      <ArrowUpward style={{ color: "green" }} /> 12.02%
    </TableRateValue>
  ),
  createData(
    "/demo/admin/util.html",
    "2.844",
    "$124",
    <TableRateValue>
      <ArrowDownward style={{ color: "red" }} /> 86.20%
    </TableRateValue>
  ),
  createData(
    "/demo/admin/validation.html",
    "1.22",
    "$55",
    <TableRateValue>
      <ArrowDownward style={{ color: "red" }} /> 01.22%
    </TableRateValue>
  ),
  createData(
    "/demo/admin/modals.html",
    "505",
    "$3",
    <TableRateValue>
      <ArrowUpward style={{ color: "green" }} /> 08.99%
    </TableRateValue>
  ),
];
