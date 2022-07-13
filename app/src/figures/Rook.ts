import { Figure, tryMove, Alias } from "./Figure";
import { checkPossibleStraights, isChessPiece } from "../figureRules";

export class Rook implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  readonly alias: Alias;
  currentPosition: string;
  htmlEl: Element;
  constructor(el: Element, id: string, isWhite: boolean, pos: string) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 50;
    this.alias = "R";
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
    return checkPossibleStraights(this, possibleSquares);
  }
}
