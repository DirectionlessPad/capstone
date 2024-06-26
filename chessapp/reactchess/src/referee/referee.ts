import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";
export default class Referee {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
        console.log("Checking if tile is occupied...")
        const piece = boardState.find(p => p.x === x && p.y === y)
        if (piece) {
            return true;
        } else {
            return false;
        }

    }

    isValidMove(
        prevX: number,
        prevY: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ) {
        console.log("Referee is checking the move...")
        console.log(prevX + ", " + prevY)
        console.log(x + ", " + y)
        console.log(type)
        console.log(team)

        if (type === PieceType.PAWN) {
            const specialRow = (team === TeamType.WHITE) ? 6 : 1;
            const pawnDirection = (team === TeamType.WHITE) ? -1 : 1;
            if (prevX === x && prevY === specialRow && y - prevY === 2 * pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDirection, boardState)) {
                    return true;
                }
            } else if (prevX === x && y - prevY === pawnDirection) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
        }
        return false;
    }
}
