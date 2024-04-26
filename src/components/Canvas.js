import React, { useRef, useEffect } from 'react';

const Canvas = ({ color, width, erasing }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = erasing ? '#FFFFFF' : color;
        context.lineWidth = erasing ? width * 2 : width;  
    }, [color, width, erasing]);

    const startDrawing = ({ nativeEvent }) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { offsetX, offsetY } = nativeEvent;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        context.globalCompositeOperation = erasing ? 'destination-out' : 'source-over'; 
        canvas.isDrawing = true;
    };

    const draw = ({ nativeEvent }) => {
        if (!canvasRef.current.isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { offsetX, offsetY } = nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.closePath();
        canvas.isDrawing = false;
    };

    return (
        <canvas
            ref={canvasRef}
            width="800"
            height="600"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
        />
    );
};

export default Canvas;
