import {useContext, useEffect} from 'react';

import CanvasContext from './canvasContext';
import {TILE_SIZE} from './constants';

const Grid = ({width, height, children}) => {
    const ctx = useContext(CanvasContext);
    useEffect(() => {
        for(let i = 0; i < height; i++) {    
            const y = i * TILE_SIZE;         

        }
        for(let j = 0; j < width; j++) {
            const x = j * TILE_SIZE;

        } 
    }, [ctx, height, width]);

    return children;
}

export default Grid;
