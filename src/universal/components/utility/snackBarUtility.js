import React, { useEffect } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

/* eslint-disable */
export default function SnackBarUtility(props) {
    const { snackBar } = props;
    const [open, setOpen] = React.useState(true);
    useEffect(
        () => {
            setOpen(true);
        },
        [snackBar.severity]
    );

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
            open={open}
            autoHideDuration={3000}>
            <Alert onClose={handleClose} severity={snackBar.severity}>
                {snackBar.message}
            </Alert>
        </Snackbar>
    )
}