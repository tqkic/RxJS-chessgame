import { ChessBoard } from "../chessBoard";
import { checkSquare, isChessPiece } from "../figureRules";
import { Alias, Figure, tryMove } from "./Figure";
export class King implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  readonly alias: Alias;
  currentPosition: string;
  htmlEl: Element;
  constructor(el: Element, id: string, isWhite: boolean, pos: string) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 900;
    this.alias = "K";
    this.currentPosition = pos;
    this.htmlEl = el;
  }
  move(dest: string, possibleSquares: string[]): string {
    //check if he moved only one square
    let otherPiece: string = null;
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    //check if the destination contains a piece and if it's of opposite color, eat it
    if (possibleSquares.includes(dest)) {
      return tryMove(this, otherPiece, dest);
    }
    return this.currentPosition;
  }
  checkPossibleDestinations(): string[] {
    let possibleSquares: string[] = [];
    const rank: number = parseInt(this.currentPosition[1]);
    const file: number = ChessBoard.columns.indexOf(this.currentPosition[0]);
    let rankBrojac: number = rank + 1;
    let fileBrojac: number = file + 1;
    //you have to check if king will be in check if he makes a certain move
    let square = ChessBoard.columns[fileBrojac] + rankBrojac;

    if (rankBrojac < 9) {
      if (fileBrojac < 8)
        possibleSquares = checkSquare(this, square, possibleSquares);

      fileBrojac = file;
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      possibleSquares = checkSquare(this, square, possibleSquares);

      fileBrojac = file - 1;
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      if (fileBrojac >= 0)
        possibleSquares = checkSquare(this, square, possibleSquares);
    }
    fileBrojac = file - 1;
    rankBrojac = rank;
    square = ChessBoard.columns[fileBrojac] + rankBrojac;
    if (fileBrojac >= 0) {
      possibleSquares = checkSquare(this, square, possibleSquares);

      rankBrojac = rank - 1;
      square = ChessBoard.columns[fileBrojac] + rankBrojac;
      if (rankBrojac > 0)
        possibleSquares = checkSquare(this, square, possibleSquares);
    }
    fileBrojac = file;
    rankBrojac = rank - 1;
    square = ChessBoard.columns[fileBrojac] + rankBrojac;
    if (rankBrojac > 0)
      possibleSquares = checkSquare(this, square, possibleSquares);

    fileBrojac = file + 1;
    square = ChessBoard.columns[fileBrojac] + rankBrojac;
    if (fileBrojac < 8 && rankBrojac > 0)
      possibleSquares = checkSquare(this, square, possibleSquares);

    rankBrojac = rank;
    square = ChessBoard.columns[fileBrojac] + rankBrojac;
    if (fileBrojac < 8 && rankBrojac > 0)
      possibleSquares = checkSquare(this, square, possibleSquares);

    return possibleSquares;
  }
}
