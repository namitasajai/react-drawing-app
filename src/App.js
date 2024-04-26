
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';

const App = () => {
    const [color, setColor] = useState('#000000');
    const [width, setWidth] = useState(3);
    const [erasing, setErasing] = useState(false);

    const clearCanvas = () => {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const toggleEraser = () => {
        setErasing(!erasing);
    };

    return (
        <div className="App">
            <div className="controls">
                <label htmlFor="colorPicker">Color:</label>
                <input type="color" id="colorPicker" value={color} onChange={(e) => setColor(e.target.value)} disabled={erasing} />
                <label htmlFor="lineWidth">Line Width:</label>
                <input type="range" id="lineWidth" min="1" max="10" value={width} onChange={(e) => setWidth(e.target.value)} />
                <button onClick={clearCanvas}>Clear Canvas</button>
                <button onClick={toggleEraser}>{erasing ? "Switch to Pencil" : "Switch to Eraser"}</button>
            </div>
            <div className="canvas-container">
                <Canvas color={color} width={width} erasing={erasing} />
            </div>
        </div>
    );
};

export default App;
