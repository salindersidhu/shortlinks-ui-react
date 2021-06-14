import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
} from "@material-ui/core";

import useStyles from "./styles";
import CustomTableHead from "./CustomTableHead";
import CustomTableToolbar from "./CustomTableToolbar";
import { getComparator, stableSort } from "../../utils";

function DataTable(props) {
  const { rows, cols, title } = props;

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(cols[1].id);
  const [numRowsPerPage, setNumRowsPerPage] = useState(5);

  const numEmptyRows =
    numRowsPerPage -
    Math.min(numRowsPerPage, rows.length - page * numRowsPerPage);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setNumRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <CustomTableToolbar title={title} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <CustomTableHead
            cols={cols}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(
                page * numRowsPerPage,
                page * numRowsPerPage + numRowsPerPage
              )
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {cols.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {col.render ? col.render(row) : row[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {numEmptyRows > 0 && (
              <TableRow style={{ height: 53 * numEmptyRows }}>
                <TableCell colSpan={cols.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={numRowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  cols: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
