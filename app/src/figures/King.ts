import { isChessPiece, kingMoved } from "../figureRules";
import { Figure, tryMove } from "./Figure";

export class King implements Figure {
  id: string;
  isWhite: boolean;
  readonly weight: number;
  currentPosition: string;
  htmlEl: Element;
  constructor(el: Element, id: string, isWhite: boolean, pos: string) {
    this.id = id;
    this.isWhite = isWhite;
    this.weight = 20;
    this.currentPosition = pos;
    this.htmlEl = el;
  }
  move(dest: string): string {
    //check if he moved only one square
    let otherPiece: string = null;
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    //check if the destination contains a piece and if it's of opposite color, eat it
    if (kingMoved(this, dest)) {
      return tryMove(this, otherPiece, dest);
    }
    return this.currentPosition;
  }
  checkPossibleDestinations(fig: Figure): string[] {
    throw new Error("Method not implemented.");
  }
}
