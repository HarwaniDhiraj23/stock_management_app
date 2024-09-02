import {
  Menu,
  Badge,
  Box,
  TextField,
  Typography,
  MenuItem,
  Divider,
  styled,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  AccountCircle,
  ExitToApp,
  Help,
  Inbox,
  Menu as MenuIcon,
  Notifications,
  Settings,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import userService from "../service/user-service.ts";
import { handleRedirect } from "../utility/helper/handleRedirect.ts";

const MenuBox = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});
const NotificationIcon = styled(Notifications)({
  "&:hover": {
    cursor: "pointer",
  },
});
const MenuIconNew = styled(MenuIcon)({
  "&:hover": {
    cursor: "pointer",
  },
});

const classes = {
  iconStyle: {
    width: "20px",
    height: "20px",
    marginRight: "15px",
  },
};

interface NavbarProps {
  SideBarOpen: boolean;
  handleDrawerOpen: () => void;
}

interface ProfileData {
  profile_pic?: string;
  full_name?: string;
}

export default function Navbar({ SideBarOpen, handleDrawerOpen }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate(RoutePaths.SignIn);
    localStorage.removeItem("token");
  };

  const open = Boolean(anchorEl);
  const fetchData = async () => {
    try {
      const userProfile = await userService.getUserProfile();
      setProfileData(userProfile.data.data[0]);
    } catch (error) {
      handleRedirect(error, navigate);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      style={{
        paddingTop: "25px",
        display: "flex",
        justifyContent: "space-between",
        transition: "margin-left 0.3s",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <MenuIconNew onClick={handleDrawerOpen} />
        <TextField
          variant="outlined"
          placeholder="Search"
          style={{ width: "320px" }}
          InputProps={{
            startAdornment: (
              <SearchIcon color="action" style={{ marginRight: "8px" }} />
            ),
            style: {
              height: "40px",
            },
          }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: "30px",
          gap: 30,
        }}
      >
        <Badge color="error" variant="dot">
          <NotificationIcon />
        </Badge>
        <MenuBox
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          onClick={handleClick}
        >
          <img
            width="35px"
            height="35px"
            style={{ borderRadius: "50%" }}
            src={
              profileData.profile_pic
                ? "http://localhost:3001/images/" + profileData.profile_pic
                : "https://shorturl.at/MXKca"
            }
            alt="profile_image"
          />
          <Typography style={{ textTransform: "capitalize" }}>
            {profileData.full_name}
          </Typography>
        </MenuBox>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{ marginTop: "50px" }}
        >
          <MenuItem onClick={handleClose}>
            <AccountCircle style={classes.iconStyle} />
            My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Settings style={classes.iconStyle} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Inbox style={classes.iconStyle} />
            Messages
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Help style={classes.iconStyle} />
            Support
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ExitToApp style={classes.iconStyle} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
