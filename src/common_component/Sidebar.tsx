import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Box,
  Theme,
  Typography,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { To, useNavigate, useLocation } from "react-router-dom";
import {
  AccountBalanceWalletOutlined,
  DateRangeOutlined,
  HomeOutlined,
  PinDropOutlined,
  QuestionAnswerOutlined,
  SettingsOutlined,
  Timeline,
} from "@material-ui/icons";
import {
  drawerWidth,
  closedDrawerWidth,
} from "../utility/constant/SidebarConstants.ts";
import { RoutePaths } from "../utility/enums/router.enums.ts";

const useStyles = makeStyles<Theme>((theme) => ({
  listItem: {
    width: drawerWidth - 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#2E3650",
      borderRadius: "10px",
    },
  },
  activeListItem: {
    marginTop: "5px",
    marginLeft: "10px",
    backgroundColor: "#2E3650",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: drawerWidth - 20,
    "&:hover": {
      backgroundColor: "#2E3650",
      borderRadius: "10px",
    },
  },
  listItemClosed: {
    width: closedDrawerWidth - 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
    marginTop: "5px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#2E3650",
      borderRadius: "10px",
    },
  },
  activeListItemClosed: {
    marginTop: "5px",
    marginLeft: "10px",
    backgroundColor: "#2E3650",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: closedDrawerWidth - 20,
    "&:hover": {
      backgroundColor: "#2E3650",
      borderRadius: "10px",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    backgroundColor: "#262B40",
  },
}));

interface SidebarProps {
  open: boolean;
}

type IconType = typeof HomeOutlined;

interface IconConfig {
  IconComponent: IconType;
  path: RoutePaths;
}

export default function Sidebar({ open }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const homeIcon: Record<string, IconConfig> = {
    Home: { IconComponent: HomeOutlined, path: RoutePaths.Dashboard },
    Messages: {
      IconComponent: QuestionAnswerOutlined,
      path: RoutePaths.Dashboard,
    },
    Transactions: {
      IconComponent: AccountBalanceWalletOutlined,
      path: RoutePaths.Dashboard,
    },
    Settings: { IconComponent: SettingsOutlined, path: RoutePaths.Settings },
    Calendar: { IconComponent: DateRangeOutlined, path: RoutePaths.Dashboard },
    Map: { IconComponent: PinDropOutlined, path: RoutePaths.Dashboard },
    Stock: { IconComponent: Timeline, path: RoutePaths.Stocks },
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const tab = Object.entries(homeIcon).find(
      ([_, { path }]) => path === currentPath
    );
    if (tab) {
      setActiveTab(tab[0]);
    }
  }, [location.pathname]);

  const handleItemClick = (text: string, path: To) => {
    setActiveTab(text);
    navigate(path);
  };

  return (
    <Box style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        PaperProps={{
          className: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Box
          style={{
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
          }}
        >
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            {open ? (
              <>
                <Timeline />
                StockIo
              </>
            ) : (
              <Timeline />
            )}
          </Typography>
        </Box>
        <List>
          {Object.entries(homeIcon).map(([text, { IconComponent, path }]) => (
            <ListItem
              button
              key={text}
              className={clsx({
                [classes.activeListItem]: open && activeTab === text,
                [classes.listItem]: open && activeTab !== text,
                [classes.activeListItemClosed]: !open && activeTab === text,
                [classes.listItemClosed]: !open && activeTab !== text,
              })}
              onClick={() => handleItemClick(text, path)}
            >
              <ListItemIcon
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconComponent style={{ color: "#ffffff" }} />
              </ListItemIcon>
              {open && (
                <ListItemText primary={text} style={{ color: "#ffffff" }} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
