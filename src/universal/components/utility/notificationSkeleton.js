import React, { Fragment } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

/* eslint-disable */
export default function NotificationSkeleton() {
    const numberOfRows = [1, 2, 3, 4, 5, 6].map(each => {
        return (
            <div className="row" key={each}>
                <div className="col-md-4">
                    <Skeleton animation="wave" variant="rect" height={40} width="100%" style={{ marginBottom: 6 }} />
                </div>
                <div className="col-md-4">
                    <Skeleton animation="wave" variant="rect" height={40} width="100%" style={{ marginBottom: 6 }} />
                </div>
                <div className="col-md-4">
                    <Skeleton animation="wave" variant="rect" height={40} width="100%" style={{ marginBottom: 6 }} />
                </div>
            </div>
        )
    });
    return (
        <Fragment>
            <Skeleton animation="wave" variant="rect" height={60} style={{ marginBottom: 6 }} />
            <span>{numberOfRows}</span>
        </Fragment>
    )
}