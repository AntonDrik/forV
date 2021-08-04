import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Layer, Rect, Stage, Transformer} from 'react-konva';
import Konva from 'konva';
import {IFrameCalibratorProps} from './types/IFrameCalibratorProps';
import {Box as TransformBox} from 'konva/lib/shapes/Transformer';
import {
    IFrameCalibrator,
    IFrameCalibratorCoords
} from './types/IFrameCalibrator';
import KonvaEventObject = Konva.KonvaEventObject;
import RectRef = Konva.Rect;
import TransformerRef = Konva.Transformer;
import Vector2d = Konva.Vector2d;
import ShapeConfig = Konva.ShapeConfig;

export function centerRectangle(
    containerWidth: number,
    containerHeight: number,
    scalePercentage = 50
): IFrameCalibratorCoords {
    const shapeWidth = containerWidth * scalePercentage / 100;
    const shapeHeight = containerHeight * scalePercentage / 100;
    return {
        width: shapeWidth,
        height: shapeHeight,
        x: (containerWidth / 2) - (shapeWidth / 2),
        y: (containerHeight / 2) - (shapeHeight / 2)
    }
}

export function keepRectangleRatio(
    containerWidth: number,
    containerHeight: number,
    frameCalibrator: IFrameCalibrator
): IFrameCalibratorCoords {
    const scaleXPercentage = containerWidth / frameCalibrator.canvasProps.width;
    const scaleYPercentage = containerHeight / frameCalibrator.canvasProps.height;
    return {
        width: frameCalibrator.rectangleProps.width * scaleXPercentage,
        height: frameCalibrator.rectangleProps.height * scaleYPercentage,
        x: frameCalibrator.rectangleProps.x * scaleXPercentage,
        y: frameCalibrator.rectangleProps.y * scaleYPercentage
    }
}

export function FrameCalibratorControl(
    {canvasProps, onChange, transformProps, rectangleProps}: IFrameCalibratorProps
): ReactElement {

    const [isSelected, setIsSelected] = useState<boolean>(false);

    const shapeRef = useRef<RectRef>();
    const transformerRef = useRef<TransformerRef>();

    const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setIsSelected(false);
        }
    };

    const handleSelect = () => {
        setIsSelected(true);
    }
    const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
        const x = e.target.x();
        const y = e.target.y();
        onChange({...rectangleProps, x, y});
    }

    const handleTransformEnd = () => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        const data: ShapeConfig = {
            ...rectangleProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
        }

        onChange(data);
    }

    const handleBoundBox = (oldBox: TransformBox, newBox: TransformBox) => {

        const {width, height} = newBox;

        if (width >= canvasProps.width || height >= canvasProps.height) {
            return oldBox;
        }

        return newBox;
    }

    const handleDragBound = (pos: Vector2d) => {
        const endAreaX = canvasProps.width - rectangleProps.width;
        const endAreaY = canvasProps.height - rectangleProps.height;
        const x = pos.x < 0 ? 0 : pos.x > endAreaX ? endAreaX : pos.x;
        const y = pos.y < 0 ? 0 : pos.y > endAreaY ? endAreaY : pos.y;
        return {x, y};
    }

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return <>
        <Stage
            width={canvasProps.width}
            height={canvasProps.height}
            style={{position: 'absolute', top: 0, left: 0}}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
        >
            <Layer>

                <Rect
                    onClick={handleSelect}
                    onTap={handleSelect}
                    ref={shapeRef}
                    {...rectangleProps}
                    dragBoundFunc={handleDragBound}
                    onDragEnd={handleDragEnd}
                    onTransformEnd={handleTransformEnd}
                />

                {
                    isSelected &&
                    <Transformer
                        ref={transformerRef}
                        rotateEnabled={false}
                        boundBoxFunc={handleBoundBox}
                        {...transformProps}
                    />
                }

            </Layer>
        </Stage>
    </>
}
