import { Box } from "@mui/material";
import React from "react";
import SearchBar from "../search/search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

function Header() {
  return (
    <Box className="header">
      {/* <h1>Dashboard</h1> */}
      <SearchBar />
      <Box className="header-group">
        <Box className="notify">
          <NotificationsNoneOutlinedIcon />
        </Box>
        <Box className="profile">
          <AccountCircleIcon />
          <p> User </p>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
