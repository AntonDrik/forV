import React, {ReactElement} from 'react';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './style';
import {IDefaultComponentProps} from '../../types/IDefaultComponentProps';

export function BackDrop({children}: IDefaultComponentProps): ReactElement {

    const classes = useStyles();

    return <>
        <Backdrop className={classes.backdrop} open={true}>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <CircularProgress color="inherit"/>
                <Box mt={3} display='flex' flexDirection='column' alignItems='center'>
                    {children}
                </Box>
            </Box>
        </Backdrop>
    </>

}
