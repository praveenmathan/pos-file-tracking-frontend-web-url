import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchByFilename from './searchByFilename';
import SearchByOthers from './searchByOthers';

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function FileSearch() {
    const classes = useStyles();
    const [selectValue, setSelectValue] = React.useState('');

    const handleChange = (event) => {
        setSelectValue(event.target.value);
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Search based on</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectValue}
                            onChange={handleChange}
                        >
                            <MenuItem value={'sbf'}>search by file name</MenuItem>
                            <MenuItem value={'sbo'}>search by others</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            selectValue === 'sbf' ? <SearchByFilename /> : selectValue === 'sbo' ? <SearchByOthers /> : ''
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}