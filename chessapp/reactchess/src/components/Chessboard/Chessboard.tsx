import React from 'react';

import './Chessboard.css';
import Tile from '../Tile/Tile';

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = []

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "d" : "l";
    const y = (p === 0) ? 0 : 7;
    pieces.push({ image: `static/assets/images/Chess_r${type}t60.png`, x: 0, y: y })
    pieces.push({ image: `static/assets/images/Chess_r${type}t60.png`, x: 7, y: y })
    pieces.push({ image: `static/assets/images/Chess_n${type}t60.png`, x: 1, y: y })
    pieces.push({ image: `static/assets/images/Chess_n${type}t60.png`, x: 6, y: y })
    pieces.push({ image: `static/assets/images/Chess_b${type}t60.png`, x: 2, y: y })
    pieces.push({ image: `static/assets/images/Chess_b${type}t60.png`, x: 5, y: y })
    pieces.push({ image: `static/assets/images/Chess_q${type}t60.png`, x: 3, y: y })
    pieces.push({ image: `static/assets/images/Chess_k${type}t60.png`, x: 4, y: y })
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "static/assets/images/Chess_pdt60.png", x: i, y: 1 })
}

for (let i = 0; i < 8; i++) {
    pieces.push({ image: "static/assets/images/Chess_plt60.png", x: i, y: 6 })
}

const horizonatalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
        const x = e.clientX - 25;
        const y = e.clientY - 25 + window.scrollY;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        activePiece = element;
    }
}

function movePiece(e: React.MouseEvent) {
    if (activePiece) {

        const x = e.clientX - 25;
        const y = e.clientY - 25 + window.scrollY;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
        activePiece = null;
    }
}

export default function Chessboard() {
    let board = [];
    for (let j = 0; j < verticalAxis.length; j++) {
        for (let i = 0; i < horizonatalAxis.length; i++) {
            const parity = i + j + 2
            let image = undefined;

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${j},${i}`} image={image} number={parity} />)
        }
    }
    // 
    return <div onMouseMove={e => movePiece(e)} onMouseDown={e => grabPiece(e)} onMouseUp={e => dropPiece(e)} id="chessboard">{board}</div>
}