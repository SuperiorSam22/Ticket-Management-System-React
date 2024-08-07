import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTaskModal from "../../components/AddTaskModal/modal";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BoardView from "../../components/board/boardView";
import ListView from "../../components/board/listView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";

function Board() {
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = useState("Select");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const [toggleView, setToggleView] = useState("List");

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePriority = (value) => {
    setPriority(value);
    setPopperOpen(false);
  };

  const handleToggleView = (view) => {
    setToggleView(view);
  };

  const [getAllUserTickets, setGetAllUserTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tickets/66a8b803d6d0770e4036263c`);
        setGetAllUserTickets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, []);


 

  const todoList = getAllUserTickets.filter((ticket) => ticket.status === "open");
const inprogressList = getAllUserTickets.filter((ticket) => ticket.status === "closed");
const completedList = getAllUserTickets.filter((ticket) => ticket.status === "on hold");

  return (
    <div className="main-dashboard">
      <Header />
      <Divider />
      <Box className="content">
        <Box className="heading">
          <h2>Board</h2>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add task
          </Button>
        </Box>
        <Box className="project-block" mt={3}>
          <Box className="project-title">
            <Box className="icon">
              <AccountTreeIcon />
            </Box>
            <p>
              Project 1
              <span>
                <KeyboardArrowDownIcon />
              </span>
            </p>
          </Box>
          <Box className="filter-section">
            <Box className="view-toggle">
              <Box
                className={`${toggleView === "List" ? "selected" : ""}`}
                onClick={() => handleToggleView("List")}
              >
                <p className="toggle-button">
                  <span>
                    <FormatListBulletedIcon />
                  </span>
                  List
                </p>
              </Box>
              <Box
                className={`${toggleView === "Board" ? "selected" : ""}`}
                onClick={() => handleToggleView("Board")}
              >
                <p className="toggle-button">
                  <span>
                    <GridViewIcon />
                  </span>
                  Board
                </p>
              </Box>
            </Box>
            <Box className="priority-filter">
              <p>
                Priority :{" "}
                <span
                  onBlur={() => setPopperOpen(false)}
                  onClick={handleClick("bottom")}
                >
                  {priority}
                </span>
                <span>
                  <KeyboardArrowDownIcon />
                </span>
              </p>
              <Popper
                sx={{ zIndex: 1200, width: "200px", padding: "10px" }}
                open={popperOpen}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{ padding: "10px" }}>
                      <Box onClick={() => handlePriority("High")}>
                        <p>High</p>
                        <Divider />
                      </Box>
                      <Box onClick={() => handlePriority("Medium")}>
                        <p>Medium</p>
                        <Divider />
                      </Box>
                      <Box onClick={() => handlePriority("Low")}>
                        <p>Low</p>
                      </Box>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </Box>
            <Box className="assigne-filter">
              <AccountCircleIcon />
              <p>Assignee</p>
            </Box>
          </Box>
        </Box>
        {toggleView === "Board" ? (
          <BoardView
            todoList={todoList}
            inprogressList={inprogressList}
            completedList={completedList}
            priority={priority}
          />
        ) : (
          <ListView />
        )}
      </Box>
      <AddTaskModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default Board;
