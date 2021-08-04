import { TransformerConfig } from 'konva/lib/shapes/Transformer';
import Konva from 'konva';
import RectConfig = Konva.RectConfig;
import ShapeConfig = Konva.ShapeConfig;
import {IFrameCalibratorCanvasProps} from './IFrameCalibrator';

export interface IFrameCalibratorProps {
    onChange: (config: ShapeConfig) => void;
    canvasProps: IFrameCalibratorCanvasProps;
    rectangleProps: RectConfig;
    transformProps?: TransformerConfig;
}
