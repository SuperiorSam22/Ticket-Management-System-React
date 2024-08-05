import { Box, Grid } from '@mui/material';
import React from 'react'
import AddIcon from "@mui/icons-material/Add";

function BoardView({todoList, inprogressList, completedList, priority}) {
  return (
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
  )
}

export default BoardView
