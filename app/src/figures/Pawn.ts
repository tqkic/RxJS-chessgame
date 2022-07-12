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
    //if pawn moved one square diagonally check if the piece is of opposite color

    //if pawn moved to the end of the board prompt to promote

    // const startRank = parseInt(this.currentPosition[1]);

    // let parent: Element = document.getElementById(dest)!.parentElement!;
    // const isWhiteF = isWhite(this.id);
    // let start = isWhiteF ? 2 : 7;

    // //if there's something on the dest field, get the square id
    // if (dest.length > 2 && parent.id !== "board") {
    //   console.log("trying to go diagonally or over the pawn");
    //   dest = parent.id;
    // }
    // //the rank of the dest square
    // let destRank = parseInt(dest[1]);
    // const distance = destRank - startRank;
    // //if pawn tried to go two squares
    // const twoSquares: boolean = distance === 2;

    // //if pawn moved more than two squares
    // if (
    //   ((distance > 2 || distance < 1) && isWhiteF) ||
    //   (!isWhiteF && (distance < -2 || distance > -1))
    // )
    //   return this.currentPosition;
    // if (onSameRank(this.currentPosition, dest)) return this.currentPosition;

    // //if the pawn moved to the same file and he moved only one or two squares while being on the second rank
    // if (
    //   onSameFile(this.currentPosition, dest) &&
    //   (distance === 1 || (twoSquares && startRank === start))
    // ) {
    //   if (!twoSquares) {
    //     //check if there's and element on the dest he wants to go to
    //     if (figureExists(dest)) {
    //       console.log("a figure is there, so I won't move");
    //       return this.currentPosition;
    //     }
    //   } else {
    //     let squareBefore = isWhiteF
    //       ? dest[0] + (parseInt(dest[1]) - 1)
    //       : dest[0] + (parseInt(dest[1]) + 1);
    //     //check if he moved two sqaures and if there are any elements before him
    //     if (figureExists(squareBefore)) {
    //       console.log("a figure is there, so I won't move");
    //       return this.currentPosition;
    //     }
    //   }
    //   moveElement(this.htmlEl, this.currentPosition, dest);
    //   return dest;
    //   //if he went to the diagonal only one square and there is a black element on the destination
    // }
    // //remove a figure that is going to be eaten by the pawn

    // const destElement = figureExists(parent.id);
    // //if (destElement) parent?.removeChild(document.getElementById(destination)!);

    // let fileDistance = Math.abs(
    //   ChessBoard.columns.indexOf(this.currentPosition[0]) -
    //     ChessBoard.columns.indexOf(parent.id[0])
    // );

    // if (
    //   fileDistance !== 1 ||
    //   Math.abs(distance) !== 1 ||
    //   destElement == null ||
    //   isWhite(destElement.id)
    // ) {
    //   console.log("trying to move diagonally but something's not right");
    //   return this.currentPosition;
    // } else {
    //   //move the element
    //   moveElement(this.htmlEl, this.currentPosition, parent.id);
    //   parent?.removeChild(destElement);
    //   return dest;
    //   //check if its on the end of the board and prompt to change the figure
    // }
    // console.log("everything's fine, let's move");
    // moveElement(this.htmlEl, this.currentPosition, dest);

    // return dest;
  }
  checkPossibleDestinations(fig: Figure): string[] {
    //get current position

    //calculate if there's something innetween

    //check diagonals

    return [];
  }
}
