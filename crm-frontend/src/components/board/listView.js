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

const todoList = [
  {
    title: "API Integration",
    detail: "Integrate Api of Admin page for updating data.",
    priority: "High",
    status: "Open",
    priorityColor: "#ff9b9b",
    statusColor: "#ffd19f",
  },
  {
    title: "API Integration",
    detail: "Integrate Api of Admin page for updating data.",
    priority: "High",
    status: "To Do",
    priorityColor: "#ff9b9b",
    statusColor: "#ffd19f",
  },
  {
    title: "API Integration",
    detail: "Integrate Api of Admin page for updating data.",
    priority: "Medium",
    status: "Open",
    priorityColor: "#f9b062",
    statusColor: "#ffd19f",
  },
];

export default function ListView() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.detail}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.priority}
                        sx={{ background: row.priorityColor }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        sx={{ background: row.statusColor }}
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
