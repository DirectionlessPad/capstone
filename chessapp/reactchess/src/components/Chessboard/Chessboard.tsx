import React from 'react';

import './Chessboard.css';
import Tile from '../Tile/Tile';

const horizonatalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
export default function Chessboard() {
    let board = [];
    for (let j = 0; j < verticalAxis.length; j++) {
        for (let i = 0; i < horizonatalAxis.length; i++) {
            const parity = i + j + 2
            board.push(<Tile number={parity} />)
        }
    }
    return <div id="chessboard">{board}</div>
}