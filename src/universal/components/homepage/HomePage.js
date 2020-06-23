import * as React from 'react';
import './HomePage.css';
import Form from 'react-bootstrap/Form';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import APIClient from '../homepage/APIClient';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import SnackBarUtility from '../utility/snackBarUtility';

/* eslint-disable */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    customBoxShadow: {
        boxShadow: '0px 8px 9px -5px rgba(0,0,0,0.1), 0px 10px 25px 2px rgba(0,0,0,0.10), 0px 6px 28px 5px rgba(0,0,0,0.1)',
        padding: '15px 25px',
        fontWeight: 'bold'
    }
}));

export default function HomePage() {
    const classes = useStyles();

    // Create state variables
    const [age, setAge] = React.useState('');
    const [responseData, setResponseData] = React.useState([]);
    const [snackbar, setSnackBar] = React.useState({});
    const fileStatus = {
        data: []
    };

    // fetches data
    const fetchData = () => {
        //e.preventDefault()
        APIClient.postData()
            .then((response) => {
                if (response.status === 200) {
                    console.log('response from lambda', response.data);
                    setSnackBar({
                        message: 'Data successfully loaded to chart',
                        severity: 'success'
                    });
                    setResponseData([...response.data]);
                }
            })
            .catch((error) => {
                setSnackBar({
                    message: 'Error while loading the data. Contact Support',
                    severity: 'error'
                });
                console.log(error);
            })
    }

    const handleChange = (event, child) => {
        if (event.target.value != null) {
            fetchData();
        }
        setAge(event.target.value);
    };

    // Sample data - TODO this has to be retrived via service.
    const POSSLA = {
        data: [
            { name: 'POS miss', value: 80, label: '70%' },
            { name: 'POS met', value: 9, label: '30%' },
            { name: 'POS miss', value: 11, label: '20%' }
        ]
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        console.log('percent', percent);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <React.Fragment>
            {responseData.length != 0 ? <SnackBarUtility snackBar={snackbar} /> : null}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Vendors</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                                className={classes.selectEmpty}>
                                <MenuItem value="" disabled>Select Vendor from the list</MenuItem>
                                <MenuItem value={10}>DAS Auto communications</MenuItem>
                                <MenuItem value={20}>Volkswagon Automobile service</MenuItem>
                                <MenuItem value={30}>Lantrasoft solutions</MenuItem>
                            </Select>
                            <FormHelperText>Select a vendor to view chart</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="container-fluid">
                <div className="row min-height-px">
                    <div className="col-md-6 text-align-center vertical-line">
                        <h4 align="center" className="heading">VENDOR SLA</h4>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart height={400}>
                                <Pie
                                    data={POSSLA.data}
                                    innerRadius={60}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                    {
                                        POSSLA.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-md-6 text-align-center">
                        <h4 align="center" className="heading">POS SLA</h4>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart height={400}>
                                <Pie
                                    data={POSSLA.data}
                                    innerRadius={60}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                    {
                                        POSSLA.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <hr className="horizontalline" />
                <div className="row min-height-px">
                    <div className="col-md-6 text-align-center vertical-line">
                        <h4 align="center" className="heading">FILE STATUS</h4>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart height={400}>
                                <Pie
                                    data={POSSLA.data}
                                    innerRadius={60}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                    {
                                        POSSLA.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-md-6 text-align-center">
                        <h4 align="center" className="heading">FILE REPROCESSING</h4>
                        {/* TODO - This has to be a component */}
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Select File(s)</Form.Label>
                                <Form.Control as="select" multiple>
                                    <option>INF_IN01_RLTR_SALES_315692_D_2020021</option>
                                    <option>INF_IN01_RLTR_SALES_315692_D_2020021</option>
                                    <option>INF_IN01_RLTR_SALES_315692_D_2020021</option>
                                    <option>INF_IN01_RLTR_SALES_315692_D_2020021</option>
                                    <option>INF_IN01_RLTR_SALES_315692_D_2020021</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="contained" color="primary" className={classes.customBoxShadow} onClick={e => fetchData(e)}>Test code</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}
