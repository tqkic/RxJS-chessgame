import { Figure } from "../figures/Figure";
import { Pawn } from "../figures/Pawn";
import { ChessBoard } from "../chessBoard";

export function generateCode(): string {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let res: string = "";
  for (let index = 0; index < 6; index++) {
    res += characters.charAt(Math.random() * characters.length);
  }
  return res;
}

export function generateMoveString(
  fig: Figure,
  dest: string,
  otherPiece: Figure | null,
  specialMove: SpecialMove,
  checkType: CheckType
): string {
  if (specialMove === "castle") {
    //queen side castling, if king is dragged to the b file
    if (dest[0] === "b") {
      ChessBoard.game.movesHistory.push("0-0-0");
      return "0-0-0";
    }
    //king side castling, if king is dragged to the g file
    if (dest[0] === "g") {
      ChessBoard.game.movesHistory.push("0-0");
      return "0-0";
    }
  }

  //get the alias for the piece
  let move: string = fig.alias + fig.currentPosition;

  //if no piece was eaten, just add the destination to the move string
  if (!otherPiece) {
    if (fig instanceof Pawn) move = "";

    move += dest;
  } else {
    if (fig instanceof Pawn) move = fig.currentPosition[0];
    //add x + destination where the piece ate
    move += `x${dest}`;
  }
  //promotions to queen or knight, since queen can move like bishop and rook, but cannot move like a knight
  if (specialMove === "promotionQ") move += "=Q";
  if (specialMove === "promotionN") move += "=N";
  //en passant
  if (specialMove === "en passant") move += "(ep)";

  //check position
  if (checkType === "check") move += "+";
  //check-mate position
  if (checkType === "check-mate") move += "#";

  ChessBoard.game.movesHistory.push(move);
  return move;
}
//FEN notation for starting or continuing the game given the certain moment
export function getFENPositions(fen: string) {}

export type SpecialMove =
  | "castle"
  | "en passant"
  | "promotionQ"
  | "promotionN"
  | null;

export type CheckType = "check" | "check-mate" | null;
