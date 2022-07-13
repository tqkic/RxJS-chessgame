import { Alias, Figure, tryMove } from "./Figure";
import { checkPossibleDiagonals, isChessPiece } from "../figureRules";

export class Bishop implements Figure {
  id: string;
  isWhite: boolean;
  readonly alias: Alias;
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
  move(dest: string, possibleSquares: string[]): string {
    let otherPiece = null;
    //if there's a chessPiece on the destination, get the square it's in, and remember the figure so that you can eat it
    if (isChessPiece(dest)) {
      otherPiece = dest;
      dest = document.getElementById(dest).parentElement.id;
    }
    if (possibleSquares.includes(dest)) {
      return tryMove(this, otherPiece, dest);
    }
    //if there's in fact another piece and it's of opposite color, eat it and move the element
    return this.currentPosition;
    //if it's just a regular diagonal move and there's nothing on the destination square, just move
  }
  checkPossibleDestinations(): string[] {
    //while there's not an element in one direction add square to array
    //while
    //ako je na f4, smanji mu pocetak odakle se gleda tako da razlika izmedju 4 i 1 bude ista kao za indeksi kolona
    //tako da postavis na najleviju mogucu poziciju
    let possibleSquares: string[] = [];
    return checkPossibleDiagonals(this, possibleSquares);
  }
}
