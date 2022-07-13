import { Alias, Figure, tryMove } from "./Figure";
import {
  eatFigure,
  getByID,
  getPieceBySquareID,
  isChessPiece,
  isEnPassant,
  moveElement,
  pawnMoved,
} from "../figureRules";
import { generateMoveString } from "../utils/helper";

export class Pawn implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  readonly alias: Alias;
  currentPosition: string;
  htmlEl: Element;

  constructor(
    htmlEl: Element,
    id: string,
    isWhite: boolean,
    currentPos: string
  ) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 10;
    this.alias = "P";
    this.currentPosition = currentPos;
    this.htmlEl = htmlEl;
  }
  move(dest: string): string {
    //if pawn moved two squares ccheck if there's not another piece
    let otherPiece: string = null;
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }

    //if pawn moved one square up check if there's not another piece
    if (pawnMoved(this, dest) === "straight") {
      if (otherPiece) return this.currentPosition;
      moveElement(this.htmlEl, this.currentPosition, dest);
      console.log(
        generateMoveString(this, dest, getByID(otherPiece), null, null)
      );
      return dest;
    }
    //en passant check
    if (pawnMoved(this, dest) === "diagonal") {
      if (otherPiece) return tryMove(this, otherPiece, dest);
      const enPassant = isEnPassant(this, dest);
      if (enPassant) {
        moveElement(this.htmlEl, this.currentPosition, dest);
        const piece = getPieceBySquareID(enPassant);
        eatFigure(piece);
        console.log(
          generateMoveString(this, dest, getByID(piece), "en passant", null)
        );
      }
      return dest;
    }

    return this.currentPosition;
  }
  checkPossibleDestinations(): string[] {
    //get current position

    //calculate if there's something innetween

    //check diagonals

    return [];
  }
}
