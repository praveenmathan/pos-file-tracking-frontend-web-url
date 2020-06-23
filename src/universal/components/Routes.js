import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListItemIcon, ListItemText, ListItem } from '@material-ui/core';

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import loadable from 'react-loadable';

/* eslint-disable */
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarBackground: {
        background: '#212121'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const LoadingComponent = () => <h3>please wait...</h3>;

const HomePageCompPromise = () => {
    return import(
        /* webpackChunkName: "bundle.home" */
        './homepage/HomePage'
    );
};

const AsyncHomePageComponent = loadable({
    loader: HomePageCompPromise,
    loading: LoadingComponent
});

const FileStatusCompPromise = () => {
    return import(
        /* webpackChunkName: "bundle.fileStatus" */
        './filestatus/FileStatus'
    );
};

const AsyncFileStatusComponent = loadable({
    loader: FileStatusCompPromise,
    loading: LoadingComponent
});

const NotificationCompPromise = () => {
    return import(
        /* webpackChunkName: "bundle.notifications" */
        './notifications/Notifications'
    );
};

const AsyncNotificationComponent = loadable({
    loader: NotificationCompPromise,
    loading: LoadingComponent
});

const homeRoute = () => {
    return <AsyncHomePageComponent />;
};

const fileStatus = () => {
    return <AsyncFileStatusComponent />;
};

const notification = () => {
    return <AsyncNotificationComponent />;
};

const navigationLinkDetails = [
    {
        name: 'Home',
        linkTo: '/'
    },
    {
        name: 'File Status',
        linkTo: '/filestatus'
    },
    {
        name: 'Notification',
        linkTo: '/notification'
    }];

export default function Routes() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        console.log('opening the menu bar')
        setOpen(true);
    };

    const handleDrawerClose = () => {
        console.log('closing the menu bar')
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    elevation={15}
                    className={clsx(classes.appBar, classes.appBarBackground, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuRoundedIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <strong>iAUDiT</strong>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    PaperProps={{ elevation: 15 }}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {navigationLinkDetails.map((each, index) => (
                            <ListItem button key={each.name} component={Link} to={each.linkTo}>
                                <ListItemIcon>{index === 0 ? <HomeRoundedIcon fontSize="large" /> : index === 1 ? <BarChartRoundedIcon fontSize="large" /> : <TableChartRoundedIcon fontSize="large" />}</ListItemIcon>
                                <ListItemText primary={each.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Switch>
                        <Route path="/" exact render={homeRoute} />
                        <Route path="/filestatus" render={fileStatus} />
                        <Route path="/notification" render={notification} />
                    </Switch>

                </main>
            </BrowserRouter>
        </div>
    );
}
