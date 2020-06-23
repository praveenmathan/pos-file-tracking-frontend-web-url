import React, { Fragment, useEffect } from 'react';
import PosSlaMisses from './pos-sla-missed-files/posSlaMiss';
import MissingFiles from './missing-files/missingFiles';
import LongRunningSkippedFiles from './long-running-skipped-files/longRunningSkippedFiles';
import HeldCorruptedSkippedFiles from './held-corrupted-files/heldCorruptedSkippedFiles';
import APIClient from '../notifications/APIClient';
import NotificationSkeleton from '../utility/notificationSkeleton';
import SnackBarUtility from '../utility/snackBarUtility';


/* eslint-disable */
export default function Notifications() {

    //create state variables
    const [tabularResponseData, setTabularResponseData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setSnackBar] = React.useState({});
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    //create fetch data function from API
    useEffect(() => {
        setLoading(true);
        APIClient.getData().then((response) => {
            if (response.status === 200) {
                let tabularResponseData = [...response.data];
                setTabularResponseData(tabularResponseData);
                setLoading(false);
            }
        }).catch((error) => {
            setSnackBarOpen(true);
            setSnackBar({
                message: 'Error while loading the data. Contact Support',
                severity: 'error'
            });
            console.log(error);
        });
    }, []);

    return (
        <Fragment>
            {snackBarOpen ? <SnackBarUtility snackBar={snackbar} /> : null}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        {loading ?
                            <NotificationSkeleton /> : <PosSlaMisses posResponseData={tabularResponseData} />}
                    </div>
                    <div className="col-md-6">
                        {loading ? <NotificationSkeleton /> : <MissingFiles />}
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        {loading ? <NotificationSkeleton /> : <LongRunningSkippedFiles longRunSkipResponseData={tabularResponseData} />}
                    </div>
                    <div className="col-md-6">
                        {loading ? <NotificationSkeleton /> : <HeldCorruptedSkippedFiles />}
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </Fragment>
    );
}
