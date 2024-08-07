import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Chip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "detail", label: "Detail", minWidth: 100 },
  {
    id: "priority",
    label: "Priority",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "#ff9b9b";
    case "medium":
      return "#f9b062";
    case "low":
      return "#c6f4d6";
    default:
      return "#fff";
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

export default function ListView() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [todoList, setTodoList] = React.useState([]);

  React.useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await getAllUserTickets();
      setTodoList(tickets);
    };
    fetchTickets();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }} mt={3}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ticket._id} onClick={() => handleShow(ticket)}>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.severity.charAt(0).toUpperCase() + ticket.severity.slice(1)}
                        sx={{ background: getPriorityColor(ticket.severity) }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        sx={{ background: getStatusColor(ticket.status) }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={todoList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}