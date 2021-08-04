import React, {useEffect, useState} from "react";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './styles';
import {IVideoContainerProps} from '../types/IVideoContainerProps';


function valuetext(value: number) {
    return `${value}°C`;
}

export function FocusValueSlider({socket}: IVideoContainerProps): JSX.Element {

    const [maxValue, setMaxValue] = useState(0);
    const [focusValue, setFocusValue] = useState(0);

    const classes = useStyles();

    const resetMaxHandler = () => {
        setMaxValue(0);
    }

    useEffect(() => {
        if (focusValue > maxValue) {
            setMaxValue(focusValue);
        }

    }, [focusValue]);

    useEffect(() => {
        socket.on('data', (value: number) => {
            setFocusValue(value);
        });
    }, []);

    return <>
        <Box pb={2} className={classes.root}>
            <Slider
                color="secondary"
                defaultValue={0}
                value={focusValue}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                max={maxValue}
                valueLabelDisplay="on"
            />
            <Box className={classes.sliderMaxLabel}>{maxValue}</Box>
            <Box ml={1} zIndex={1}>
                <IconButton onClick={resetMaxHandler} color="secondary">
                    <RefreshIcon/>
                </IconButton>
            </Box>
        </Box>
    </>
}
