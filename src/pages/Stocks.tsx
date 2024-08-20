import React, { Key, useEffect, useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  styled,
  Theme,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Add,
} from "@material-ui/icons";
import Layout from "../common_component/Layout.tsx";
import StockApi from "../service/stock-service.ts";
import SimpleDialog from "../common_component/StockDialog.tsx";

interface Data {
  name: string;
  current_price: number;
  opening_price: number;
  closing_price: number;
  high_price: number;
  low_price: number;
  action: string;
  id: number;
}

function createData(
  id: number,
  name: string,
  current_price: number,
  opening_price: number,
  closing_price: number,
  high_price: number,
  low_price: number,
  action: string
): Data {
  return {
    id,
    name,
    current_price,
    opening_price,
    closing_price,
    high_price,
    low_price,
    action,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Stock Name",
  },
  {
    id: "current_price",
    numeric: true,
    disablePadding: false,
    label: "Current Price",
  },
  {
    id: "opening_price",
    numeric: true,
    disablePadding: false,
    label: "Opening Price",
  },
  {
    id: "closing_price",
    numeric: true,
    disablePadding: false,
    label: "Closing Price",
  },
  {
    id: "high_price",
    numeric: true,
    disablePadding: false,
    label: "High Price",
  },
  { id: "low_price", numeric: true, disablePadding: false, label: "Low Price" },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  fetchData: () => void;
  selectedId: number[];
  clearSelectedId: () => void;
  clearAllSelectedId: () => void;
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const [open, setOpen] = useState(false);
  const {
    numSelected,
    fetchData,
    selectedId,
    clearSelectedId,
    clearAllSelectedId,
    searchValue,
    onSearchChange,
  } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSaveForm = () => {
    setOpen(false);
    fetchData();
  };

  const deleteMultipleStock = async (selectedId: number[]) => {
    const data = {
      id: [selectedId],
    };

    await StockApi.deleteMultipleStocks(data);
    clearSelectedId();
    clearAllSelectedId();
    fetchData();
  };
  const HeaderTitle = styled(Typography)({
    flex: "1",
    fontWeight: "bold",
  });
  const HeaderSubTitle = styled(Typography)({
    flex: "1",
  });
  const AddButton = styled(Button)({
    backgroundColor: "#161D27",
    color: "#ffffff",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#161D27",
    },
  });
  const AddIcon = styled(Add)({
    marginRight: "5px",
  });
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <HeaderSubTitle color="inherit" variant="subtitle1">
          {numSelected} selected
        </HeaderSubTitle>
      ) : (
        <HeaderTitle variant="h5" id="tableTitle">
          Stock
        </HeaderTitle>
      )}
      {numSelected === 0 && (
        <TextField
          variant="outlined"
          placeholder="Search"
          style={{ width: "320px" }}
          value={searchValue}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon color="action" style={{ marginRight: "8px" }} />
            ),
            style: {
              height: "40px",
            },
          }}
        />
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => deleteMultipleStock(selectedId)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected === 0 && (
        <AddButton onClick={handleClickOpen}>
          <AddIcon />
          Add New
        </AddButton>
      )}
      <SimpleDialog open={open} onClose={handleClose} onSave={onSaveForm} />
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: "1%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
interface Data {
  id: number;
  name: string;
  current_price: number;
  opening_price: number;
  closing_price: number;
  high_price: number;
  low_price: number;
}
export default function Stocks() {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stockData, setStockData] = useState<Data[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<string | null | number>(
    null
  );
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filteredData = stockData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const rows = filteredData.map((item) =>
    createData(
      item.id,
      item.name,
      item.current_price,
      item.opening_price,
      item.closing_price,
      item.high_price,
      item.low_price,
      ""
    )
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: number) => {
    setMultipleSelect((prev) => {
      let newSelectedIDS: number[] = [];
      if (prev.includes(name)) {
        newSelectedIDS = prev.filter((item) => item !== name);
      } else {
        newSelectedIDS = [...prev, name];
      }
      return newSelectedIDS;
    });

    const selectedIndex = selected.indexOf(name);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  useEffect(() => {}, [multipleSelect]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowName: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleDeleteStocks = async (id) => {
    setAnchorEl(null);
    setSelectedRow(null);
    await StockApi.deleteStock(id);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const getStock: any = await StockApi.getStocks();
      setStockData(getStock.data?.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (id) => {
    setSelectedId(...selected, id);
    setOpen(true);
  };

  const handleSave = () => {
    setOpen(false);
    setSelectedId(null);
    setAnchorEl(null);
    setSelectedRow(null);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
    setAnchorEl(null);
    setSelectedRow(null);
  };
  return (
    <Layout>
      <Box style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <Box className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              fetchData={fetchData}
              selectedId={multipleSelect}
              clearSelectedId={() => setMultipleSelect([])}
              clearAllSelectedId={() => setSelected([])}
              searchValue={searchValue}
              onSearchChange={(event) => setSearchValue(event.target.value)}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id as number);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(row.id as number)}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.current_price}
                          </TableCell>
                          <TableCell align="right">
                            {row.opening_price}
                          </TableCell>
                          <TableCell align="right">
                            {row.closing_price}
                          </TableCell>
                          <TableCell align="right">{row.high_price}</TableCell>
                          <TableCell align="right">{row.low_price}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) =>
                                handleMenuClick(event, row?.id as number)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl) && selectedRow === row.id}
                              onClose={handleMenuClose}
                            >
                              <MenuItem
                                onClick={(event) => handleClickOpen(row?.id)}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={(event) => handleDeleteStocks(row?.id)}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        id={selectedId}
        onSave={handleSave}
      />
    </Layout>
  );
}
