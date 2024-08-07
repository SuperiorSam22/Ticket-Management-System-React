import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';


const getAllUserTickets = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/tickets/66a8b803d6d0770e4036263c',
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YThiODAzZDZkMDc3MGU0MDM2MjYzYyIsImlhdCI6MTcyMjkyMzc2MiwiZXhwIjoxNzI1NTE1NzYyfQ.3WrVkJU8mYtfvT8OT6EA5a-Sh9NJyxtB3hSpc0yrUd4' // replace with your actual auth token
      }
    };

    const response = await axios.request(config);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "on hold":
      return "#ffd19f";
    case "open":
      return "#ffe082";
    default:
      return "#fff";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "#ff9b9b";
    case "medium":
      return "#f9b062";
    case "low":
      return "#c6f4d6";
    case "closed":
      return "#2a67eb"
    default:
      return "#fff";
  }
};

function BoardView({ priority }) {
  const [tickets, setTickets] = useState([]);
  const [todoTickets, setTodoTickets] = useState([]);
  const [inprogressTickets, setInprogressTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await getAllUserTickets();
      setTickets(tickets);
      setTodoTickets(tickets.filter((ticket) => ticket.status === "open"));
      setInprogressTickets(tickets.filter((ticket) => ticket.status === "on hold"));
      setCompletedTickets(tickets.filter((ticket) => ticket.status === "closed"));
    };
    fetchTickets();
  }, []);


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
            {todoTickets
              .filter((ticket) =>
                priority && priority !== "Select"
                  ? ticket.priority === priority
                  : ticket
              )
              .map((ticket) => {
                return (
                  <Box className="task-card" draggable>
                    <p className="title">{ticket.title}</p>
                    <p className="detail">{ticket.description}</p>
                    <Box className="card-footer" mt={2}>
                      <Box className="assigne">
                        <Box className="avatar"></Box>
                      </Box>
                      <Box
                        className="priority"
                        sx={{ background: getPriorityColor(ticket.severity) }}
                      >
                        <p>{ticket.severity}</p>
                      </Box>
                      <Box
                        className="status"
                        sx={{ background: getStatusColor(ticket.status) }}
                      >
                        <p>{ticket.status}</p>{" "}
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
            {inprogressTickets
              .filter((ticket) =>
                priority && priority !== "Select"
                  ? ticket.priority === priority
                  : ticket
              )
              .map((ticket) => {
                return (
                  <Box className="task-card" draggable>
                    <p className="title">{ticket.title}</p>
                    <p className="detail">{ticket.description}</p>
                    <Box className="card-footer" mt={2}>
                      <Box className="assigne">
                        <Box className="avatar"></Box>
                      </Box>
                      <Box
                        className="priority"
                        sx={{ background: getPriorityColor(ticket.severity) }}
                      >
                        <p>{ticket.severity}</p>
                      </Box>
                      <Box
                        className="status"
                        sx={{ background: getStatusColor(ticket.status) }}
                      >
                        <p>{ticket.status}</p>{" "}
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
              <p>closed</p>
              <Box>
                <AddIcon />
              </Box>
            </Box>
            {completedTickets
              .filter((ticket) =>
                priority && priority !== "Select"
                  ? ticket.priority === priority
                  : ticket
              )
              .map((ticket) => {
                return (
                  <Box className="task-card" draggable>
                    <p className="title">{ticket.title}</p>
                    <p className="detail">{ticket.description}</p>
                    <Box className="card-footer" mt={2}>
                      <Box className="assigne">
                        <Box className="avatar"></Box>
                      </Box>
                      <Box
                        className="priority"
                        sx={{ background: getPriorityColor(ticket.severity) }}
                      >
                        <p>{ticket.severity}</p>
                      </Box>
                      <Box
                        className="status"
                        sx={{ background: getStatusColor(ticket.status) }}
                      >
                        <p>{ticket.status}</p>{" "}
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
