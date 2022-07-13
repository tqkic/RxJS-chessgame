import { Alias, Figure, tryMove } from "./Figure";
import { checkSquare, isChessPiece } from "../figureRules";
import { ChessBoard } from "../chessBoard";

export class Knight implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  readonly alias: Alias;
  currentPosition: string;
  htmlEl: Element;
  constructor(el: Element, id: string, isWhite: boolean, pos: string) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 30;
    this.alias = "N";
    this.currentPosition = pos;
    this.htmlEl = el;
  }
  move(dest: string, possibleSquares: string[]): string {
    let otherPiece: string = null;
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    if (possibleSquares.includes(dest)) {
      return tryMove(this, otherPiece, dest);
    }
    return this.currentPosition;
  }
  checkPossibleDestinations(): string[] {
    let possibleSquares: string[] = [];
    const rank: number = parseInt(this.currentPosition[1]);
    const file: number = ChessBoard.columns.indexOf(this.currentPosition[0]);

    let rankBrojac: number = rank + 2;
    let fileBrojac: number = file + 1;
    let square = ChessBoard.columns[fileBrojac] + rankBrojac;

    //check the vertical directions
    if (rankBrojac < 9 && fileBrojac < 8) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    fileBrojac = file - 1;
    if (rankBrojac < 9 && fileBrojac > 0) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    rankBrojac = rank - 2;
    if (rankBrojac > 0 && fileBrojac > 0) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    fileBrojac = file + 1;
    if (rankBrojac > 0 && fileBrojac < 8) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }

    //check the horizontal squares
    rankBrojac = rank - 1;
    fileBrojac = file - 2;
    if (rankBrojac > 0 && fileBrojac >= 0) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    rankBrojac = rank + 1;
    if (rankBrojac < 9 && fileBrojac >= 0) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    fileBrojac = file + 2;
    if (rankBrojac < 9 && fileBrojac < 8) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    rankBrojac = rank - 1;
    if (rankBrojac > 0 && fileBrojac < 8) {
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);
    }
    return possibleSquares;
  }
}
