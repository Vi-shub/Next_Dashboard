import { useMemo, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editRecord = (row) => {
    setPage(newPage);
  };

  const deleteRecord = (row) => {
    setPage(newPage);
  };

  const dataFormatter = (data) => {
    const parsedDate = new Date(data);
    return format(parsedDate, "MMMM d,yyyy h:mm a");
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ minWidth: 70 }}>
                ID
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Type
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Created At
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={index} align="right">
                      {row.id}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.name}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.email}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.type}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {dataFormatter(row.created_at)}
                    </TableCell>
                    <TableCell key={index} align="right">
                      <div className="flex justify-center">
                        <div
                          className="cursor-pointer text-green-700 mr-2 "
                          onClick={() => editRecord(row)}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="cursor-pointer text-orange-700"
                          onClick={() => deleteRecord(row)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
