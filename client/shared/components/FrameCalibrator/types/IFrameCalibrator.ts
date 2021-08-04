import Konva from 'konva';
import ShapeConfig = Konva.ShapeConfig;

export interface IFrameCalibratorCoords {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IFrameCalibratorCanvasProps {
    width: number;
    height: number;
}

export interface IFrameCalibrator<T = void> {
    canvasProps: IFrameCalibratorCanvasProps;
    rectangleProps: ShapeConfig;
    active?: boolean;
    data?: T;
}
