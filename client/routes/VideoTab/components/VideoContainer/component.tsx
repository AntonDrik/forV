import React, {ReactElement, useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import useStyles from '../../styles';
import clsx from 'clsx';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Konva from 'konva';
import {debounce} from 'lodash';
import {IVideoContainerProps} from '../types/IVideoContainerProps';
import ShapeConfig = Konva.ShapeConfig;
import {FocusValueSlider} from '../FocusValueSlider/component';
import {
    IFrameCalibrator,
    IFrameCalibratorCanvasProps,
    IFrameCalibratorCoords
} from '@shared/components/FrameCalibrator/types/IFrameCalibrator';
import {
    centerRectangle,
    FrameCalibratorControl,
    keepRectangleRatio
} from '@shared/components/FrameCalibrator/component';

const initFrameCalibrator: IFrameCalibrator = {
    active: false,
    canvasProps: {
        width: 0,
        height: 0
    },
    rectangleProps: {
        id: 'rect',
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: '#FF0000',
        strokeWidth: 2,
        draggable: true
    }
}


export default function VideoContainer({socket}: IVideoContainerProps): ReactElement {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [frameCalibrator, setFrameCalibrator] = useState<IFrameCalibrator>(initFrameCalibrator);

    const containerRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const handleFrameCalibratorOpen = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const coords: IFrameCalibratorCoords = centerRectangle(containerWidth, containerHeight);
        console.log('handle open');
        console.log('containerWidth: ', containerWidth);
        console.log('containerHeight: ', containerHeight);
        console.log('coords: ', coords);
        setFrameCalibrator((prev) => ({
            ...prev,
            canvasProps: {width: containerWidth, height: containerHeight},
            rectangleProps: {...prev.rectangleProps, ...coords},
            active: true
        }));
    }

    const handleRectangleChange = (config: ShapeConfig) => {
        console.log(config);
        setFrameCalibrator((prev) => ({
            ...prev,
            rectangleProps: {
                ...prev.rectangleProps,
                x: config.x,
                y: config.y,
                width: config.width,
                height: config.height,
                stroke: '#FF0000'
            }
        }))
    }

    const sendFrameCalibratorCoords = () => {
        const roundedCoords = {
            x: (frameCalibrator.rectangleProps.x / frameCalibrator.canvasProps.width).toFixed(3),
            y: (frameCalibrator.rectangleProps.y / frameCalibrator.canvasProps.height).toFixed(3),
            width: (frameCalibrator.rectangleProps.width / frameCalibrator.canvasProps.width).toFixed(3),
            height: (frameCalibrator.rectangleProps.height / frameCalibrator.canvasProps.height).toFixed(3)
        }
        console.log(roundedCoords);
        console.log(frameCalibrator);
        socket.emit('framesize', roundedCoords);
        setFrameCalibrator((prev) => ({
            ...prev,
            rectangleProps: {
                ...prev.rectangleProps,
                stroke: '#4CFF00'
            }
        }))
    }

    const updateFrameCalibratorArea = () => {
        const canvasProps: IFrameCalibratorCanvasProps = {
            width: containerRef.current?.offsetWidth,
            height: containerRef.current?.offsetHeight
        }
        setFrameCalibrator((prev) => ({
            ...prev,
            canvasProps,
            rectangleProps: {
                ...prev.rectangleProps,
                ...keepRectangleRatio(canvasProps.width, canvasProps.height, prev)
            }
        }))
    }

    useEffect(debounce(updateFrameCalibratorArea, 200), [isExpanded]);

    useEffect(() => {
        const listener = debounce(updateFrameCalibratorArea, 200)
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, []);

    return <>
        <div ref={containerRef} className={clsx({
            [classes.root]: !isExpanded,
            [classes.rootExpanded]: isExpanded
        })}>

            <FocusValueSlider socket={socket}/>

            <img className={classes.img} src={`http://192.168.31.51:5002/stream`} alt=""/>

            {
                frameCalibrator.active &&
                <FrameCalibratorControl
                    canvasProps={frameCalibrator.canvasProps}
                    rectangleProps={frameCalibrator.rectangleProps}
                    onChange={handleRectangleChange}
                />
            }

            <Box className={classes.videoControls}>
                <IconButton
                    onClick={frameCalibrator.active ? sendFrameCalibratorCoords : handleFrameCalibratorOpen}
                    color="primary"
                >
                    {frameCalibrator.active ? <CheckCircleOutlineIcon/> : <CenterFocusStrongIcon/>}
                </IconButton>

                <IconButton onClick={handleExpand} color="primary">
                    <AspectRatioIcon/>
                </IconButton>
            </Box>

        </div>
    </>
}
