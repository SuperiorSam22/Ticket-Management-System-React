import React, { useState } from "react";
import Header from "../../components/header/header";
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

function Board() {
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = useState("Select");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePriority = (value) => {
    setPriority(value);
    setPopperOpen(false)
  };

  const todoList = [
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "High",
      status: "Open",
      priorityColor: "#f9b062",
      statueColor: "#ffd19f",
    },
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "High",
      status: "To Do",
      priorityColor: "#ff9b9b",
      statueColor: "#ffd19f",
    },
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "Medium",
      status: "Open",
      priorityColor: "#f9b062",
      statueColor: "#ffd19f",
    },
  ];
  const inprogressList = [
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "High",
      status: "In progress",
      priorityColor: "#ff9b9b",
      statueColor: "#B9E6FD",
    },
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "High",
      status: "In progress",
      priorityColor: "#ff9b9b",
      statueColor: "#B9E6FD",
    },
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "Medium",
      status: "In progress",
      priorityColor: "#f9b062",
      statueColor: "#B9E6FD",
    },
  ];
  const completedList = [
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "High",
      status: "completed",
      priorityColor: "#ff9b9b",
      statueColor: "#ACDC79",
    },
    {
      title: "API Integration",
      detail: "Integrate Api of Admin page for updating data.",
      priority: "Medium",
      status: "completed",
      priorityColor: "#f9b062",
      statueColor: "#ACDC79",
    },
  ];

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
            <Box className="priority-filter">
              <p>
                Priority :{" "}
                <span
                  onBlur={() => setPopperOpen(false)}
                  onClick={handleClick("bottom`")}
                >
                  {priority}
                </span>
                <span>
                  <KeyboardArrowDownIcon />
                </span>
              </p>
              <Popper
                sx={{ zIndex: 1200, width:"200px", padding:"10px" }}
                open={popperOpen}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:"10px"}}>
                      <Box onClick={() => handlePriority("High")}>
                        <p>High</p>
                        <Divider/>
                      </Box>
                      <Box onClick={() => handlePriority("Medium")}>
                        <p>Medium</p>
                        <Divider/>
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
        <Box className="board task-container" mt={4}>
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <Box className="task-grid">
                <Box className="task-header">
                  <p>To do</p>
                  <Box>
                    <AddIcon />
                  </Box>
                </Box>
                {todoList
                  .filter((list) =>
                    priority && priority !== "Select"
                      ? list.priority === priority
                      : list
                  )
                  .map((list) => {
                    return (
                      <Box className="task-card" draggable>
                        <p className="title">{list.title}</p>
                        <p className="detail">{list.detail}</p>
                        <Box className="card-footer" mt={2}>
                          <Box className="assigne">
                            <Box className="avatar"></Box>
                          </Box>
                          <Box
                            className="priority"
                            sx={{ background: list.priorityColor }}
                          >
                            <p>{list.priority}</p>
                          </Box>
                          <Box
                            className="status"
                            sx={{ background: list.statueColor }}
                          >
                            <p>{list.status}</p>{" "}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box className="task-grid">
                <Box className="task-header">
                  <p>In progress</p>
                  <Box>
                    <AddIcon />
                  </Box>
                </Box>
                {inprogressList
                  .filter((list) =>
                    priority && priority !== "Select"
                      ? list.priority === priority
                      : list
                  )
                  .map((list) => {
                    return (
                      <Box className="task-card" draggable>
                        <p className="title">{list.title}</p>
                        <p className="detail">{list.detail}</p>
                        <Box className="card-footer" mt={2}>
                          <Box className="assigne">
                            <Box className="avatar"></Box>
                          </Box>
                          <Box
                            className="priority"
                            sx={{ background: list.priorityColor }}
                          >
                            <p>{list.priority}</p>
                          </Box>
                          <Box
                            className="status"
                            sx={{ background: list.statueColor }}
                          >
                            <p>{list.status}</p>{" "}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box className="task-grid">
                <Box className="task-header">
                  <p>Completed</p>
                  <Box>
                    <AddIcon />
                  </Box>
                </Box>
                {completedList
                  .filter((list) =>
                    priority && priority !== "Select"
                      ? list.priority === priority
                      : list
                  )
                  .map((list) => {
                    return (
                      <Box className="task-card" draggable>
                        <p className="title">{list.title}</p>
                        <p className="detail">{list.detail}</p>
                        <Box className="card-footer" mt={2}>
                          <Box className="assigne">
                            <Box className="avatar"></Box>
                          </Box>
                          <Box
                            className="priority"
                            sx={{ background: list.priorityColor }}
                          >
                            <p>{list.priority}</p>
                          </Box>
                          <Box
                            className="status"
                            sx={{ background: list.statueColor }}
                          >
                            <p>{list.status}</p>{" "}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </Box>
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
