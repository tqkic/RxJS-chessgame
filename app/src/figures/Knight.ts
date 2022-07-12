import { Figure, tryMove } from "./Figure";
import {
  areSameColor,
  eatFigure,
  getByID,
  isChessPiece,
  isLMove,
  moveElement,
} from "../figureRules";

export class Knight implements Figure {
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
    let otherPiece: string = null;
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    if (isLMove(this, dest)) {
      return tryMove(this, otherPiece, dest);
    }
    return this.currentPosition;
  }
  checkPossibleDestinations(fig: Figure): string[] {
    throw new Error("Method not implemented.");
  }
}
