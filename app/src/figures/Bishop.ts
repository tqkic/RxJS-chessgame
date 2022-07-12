import { Figure, tryMove } from "./Figure";
import { isDiagonalMove, isChessPiece } from "../figureRules";

export class Bishop implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  currentPosition: string;
  htmlEl: Element;
  constructor(el: Element, id: string, isWhite: boolean, pos: string) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 3;
    this.currentPosition = pos;
    this.htmlEl = el;
  }
  move(dest: string): string {
    let otherPiece = null;
    //if there's a chessPiece on the destination, get the square it's in, and remember the figure so that you can eat it
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    //if there's in fact another piece and it's of opposite color, eat it and move the element
    if (isDiagonalMove(this, dest)) {
      return tryMove(this, otherPiece, dest);
    }
    return this.currentPosition;
    //if it's just a regular diagonal move and there's nothing on the destination square, just move
  }
  checkPossibleDestinations(fig: Figure): string[] {
    throw new Error("Method not implemented.");
  }
}
