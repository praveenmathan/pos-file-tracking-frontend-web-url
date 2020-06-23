import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import APIClient from '../APIClient';
import SnackBarUtility from '../../utility/snackBarUtility';

/* eslint-disable */
const columns = [
    { id: 'name', label: 'File Name', minWidth: 170 },
    { id: 'code', label: 'S3\u00a0Arrival\u00a0Time', minWidth: 100 },
    {
        id: 'population',
        label: 'Status',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(name, code, population) {
    return { name, code, population };
}

const rows = [
    createData('India', 'IN', 1324171354),
    createData('China', 'CN', 1403500365),
    createData('Italy', 'IT', 60483973),
    createData('United States', 'US', 327167434),
    createData('Canada', 'CA', 37602103),
    createData('Australia', 'AU', 25475400),
    createData('Germany', 'DE', 83019200),
    createData('Ireland', 'IE', 4857000),
    createData('Mexico', 'MX', 126577691),
    createData('Japan', 'JP', 126317000),
    createData('France', 'FR', 67022000),
    createData('United Kingdom', 'GB', 67545757),
    createData('Russia', 'RU', 146793744),
    createData('Nigeria', 'NG', 200962417),
    createData('Brazil', 'BR', 210147127),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 300,
    },
    tableHeadBackground: {
        background: '#bdbdbd',
        fontWeight: "bold",
        justifyContent: "space-between"
    },
    titleChecked: {
        flex: '1 1 50%',
        color: '#ddd'
    },
    title: {
        flex: '1 1 100%',
        flexGrow: '1'
    },
    appBarBackground: {
        background: '#212121',
    },
    customBoxShadow: {
        flex: '1 1 100%',
        boxShadow: '0px 8px 9px -5px rgba(0,0,0,0.1), 0px 10px 25px 2px rgba(0,0,0,0.10), 0px 6px 28px 5px rgba(0,0,0,0.1)',
        padding: '5px 10px',
        fontWeight: 'bold'
    }
});

export default function MissingFiles() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected, setSelected] = React.useState([]);
    const [snackbar, setSnackBar] = React.useState({});
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleNotifyVendor = () => {
        setSnackBarOpen(false);
        APIClient.getData().then((response) => {
            if (response.status === 200) {
                console.log(response);
                setSnackBarOpen(true);
                setSnackBar({
                    message: 'Notified the vendor',
                    severity: 'success'
                });
            }
        }).catch((error) => {
            setSnackBarOpen(true);
            setSnackBar({
                message: 'Error while loading the data. Contact Support',
                severity: 'error'
            });
            console.log(error);
        });
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
        <Fragment>
            {snackBarOpen ? <SnackBarUtility snackBar={snackbar} /> : null}
            <AppBar position="static" className={classes.appBarBackground}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Missing Files
                    </Typography>
                    {selected.length > 0 ?
                        <Fragment>
                            <Typography variant="subtitle2" className={classes.titleChecked}>
                                {selected.length} selected
                    </Typography>
                            <Button variant="contained" color="primary" className={classes.customBoxShadow} onClick=
                                {handleNotifyVendor}>Notify Vendor</Button>
                        </Fragment>
                        : ''}
                </Toolbar>
            </AppBar>
            <Paper className={classes.root} elevation={5}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"
                                    className={classes.tableHeadBackground}>
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                        checked={rows.length > 0 && selected.length === rows.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all desserts' }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className={classes.tableHeadBackground}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const isItemSelected = isSelected(row.name);
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={(event) => handleClick(event, row.name)}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Fragment>
    );
}