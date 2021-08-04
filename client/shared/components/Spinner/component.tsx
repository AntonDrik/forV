import React from "react";
import useStyles from './styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export function Spinner(): JSX.Element {

    const classes = useStyles();

    return <>
        <Box className={classes.container}><CircularProgress/></Box>
    </>
}
