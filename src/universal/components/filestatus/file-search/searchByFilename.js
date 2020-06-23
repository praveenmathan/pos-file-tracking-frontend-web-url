import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/* eslint-disable */
const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: '#212121',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
        color: '#fff'
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100ch',
        },
    },
    customBoxShadow: {
        boxShadow: '0px 8px 9px -5px rgba(0,0,0,0.1), 0px 10px 25px 2px rgba(0,0,0,0.10), 0px 6px 28px 5px rgba(0,0,0,0.1)',
        padding: '15px 25px',
        fontWeight: 'bold'
    }
}));

export default function SearchByFilename() {
    const [expanded, setExpanded] = React.useState('panel1');
    const classes = useStyles();
    const [name, setName] = React.useState('INF_IN01_RLTR_SALES_315692_D_2020021');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleTextChange = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">Search By File Name</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.root}>
                        <div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-name"
                                    label="File Name"
                                    value={name}
                                    onChange={handleTextChange}
                                    variant="outlined"
                                />
                            </form>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" className={classes.customBoxShadow} onClick={e => fetchData(e)}>SEARCH</Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}