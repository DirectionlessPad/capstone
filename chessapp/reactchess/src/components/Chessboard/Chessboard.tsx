import React from 'react';
import { useRef, useState } from 'react';

import './Chessboard.css';
import Tile from '../Tile/Tile';
import Referee from "../../referee/Referee"

const tileSize = 50;

export interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType {
    WHITE,
    BLACK
}

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.BLACK : TeamType.WHITE;
    const type = (teamType === TeamType.BLACK) ? "d" : "l";
    const y = (teamType === TeamType.BLACK) ? 0 : 7;
    initialBoardState.push({
        image: `static/assets/images/Chess_r${type}t60.png`,
        x: 0,
        y: y,
        type: PieceType.ROOK,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_r${type}t60.png`,
        x: 7,
        y: y,
        type: PieceType.ROOK,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_n${type}t60.png`,
        x: 1,
        y: y,
        type: PieceType.KNIGHT,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_n${type}t60.png`,
        x: 6,
        y: y,
        type: PieceType.KNIGHT,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_b${type}t60.png`,
        x: 2,
        y: y,
        type: PieceType.BISHOP,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_b${type}t60.png`,
        x: 5,
        y: y,
        type: PieceType.BISHOP,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_q${type}t60.png`,
        x: 3,
        y: y,
        type: PieceType.QUEEN,
        team: teamType
    })
    initialBoardState.push({
        image: `static/assets/images/Chess_k${type}t60.png`,
        x: 4,
        y: y,
        type: PieceType.KING,
        team: teamType
    })
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({
        image: "static/assets/images/Chess_pdt60.png",
        x: i,
        y: 1,
        type: PieceType.PAWN,
        team: TeamType.BLACK
    })
}

for (let i = 0; i < 8; i++) {
    initialBoardState.push({
        image: "static/assets/images/Chess_plt60.png",
        x: i,
        y: 6,
        type: PieceType.PAWN,
        team: TeamType.WHITE
    })
}



const horizonatalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / tileSize))
            setGridY(Math.floor((e.clientY - chessboard.offsetTop) / tileSize))
            const x = e.clientX - (tileSize / 2);
            const y = e.clientY - (tileSize / 2) + window.scrollY;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }


    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - (tileSize / 2);
            const minY = chessboard.offsetTop - (tileSize / 2);
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - (tileSize / 2);
            const maxY = chessboard.offsetTop + chessboard.clientHeight - (tileSize / 2);
            const x = e.clientX - (tileSize / 2);
            const y = e.clientY - (tileSize / 2) + window.scrollY;
            activePiece.style.position = "absolute";
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }
            // activePiece.style.left = x < minX ? `${minX}px` : `${x}px`;
            // activePiece.style.top = y < minY ? `${minY}px` : `${y}px`;
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize);
            const y = Math.floor((e.clientY - chessboard.offsetTop) / tileSize);

            setPieces((value) => {
                const pieces = value.map(p => {
                    if (p.x === gridX && p.y === gridY) {
                        console.log(p.type, p.team)
                        const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value);
                        console.log(validMove)
                        if (validMove) {
                            p.x = x;
                            p.y = y;
                        } else {
                            activePiece.style.position = "relative";
                            activePiece.style.removeProperty("top");
                            activePiece.style.removeProperty("left")
                        }
                    }
                    return p;
                })
                return pieces;
            })
            setActivePiece(null);
        }
    }

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
    return <div
        onMouseMove={e => movePiece(e)}
        onMouseDown={e => grabPiece(e)}
        onMouseUp={e => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}>
        {board}
    </div>
}