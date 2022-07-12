import { Figure, tryMove } from "./Figure";
import { isChessPiece, moveElement, pawnMoved } from "../figureRules";

export class Pawn implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
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
    this.weight = 1;
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
      return dest;
    }
    if (pawnMoved(this, dest) === "diagonal" && otherPiece) {
      return tryMove(this, otherPiece, dest);
    }

    return this.currentPosition;
  }
  checkPossibleDestinations(fig: Figure): string[] {
    //get current position

    //calculate if there's something innetween

    //check diagonals

    return [];
  }
}
