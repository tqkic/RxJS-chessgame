import { Figure } from "./figures/Figure";
import { chessPieces, ChessBoard } from "./chessBoard";
export function moveElement(el: Element, source: string, dest: string) {
  const square: Element = document.getElementById(dest)!;
  document.getElementById(el.id)!.parentElement?.removeChild(el);
  square.appendChild(el);
}
export function isWhite(el: string) {
  return el[0] === "w";
}
export function figureExists(dest: string) {
  const el: Element | null | undefined =
    document.getElementById(dest)?.children[0];
  return typeof el != "undefined" ? el : null;
}
export function isKingInCheck(king: Element) {
  return false;
}
export function onSameFile(source: string, destination: string) {
  return source[0] === destination[0];
}
export function getByID(id: string) {
  return chessPieces.find((e) => e.id === id);
}
export function onSameRank(source: string, destination: string) {
  return source[1] === destination[1];
}
export function isChessPiece(id: string) {
  return !document.getElementById(id).classList.contains("square");
}

export function eatFigure(id: string) {
  const _: Figure = getByID(id);
  _.htmlEl.parentElement.removeChild(_.htmlEl);
}
export function isDiagonalMove(fig: Figure, dest: string): boolean {
  const destRankIndex: number = ChessBoard.columns.indexOf(dest[0]);
  const startRankIndex: number = ChessBoard.columns.indexOf(
    fig.currentPosition[0]
  );
  return (
    Math.abs(destRankIndex - startRankIndex) ===
    Math.abs(parseInt(dest[1]) - parseInt(fig.currentPosition[1]))
  );
}
export function isStraightMove(fig: Figure, dest: string): boolean {
  return (
    onSameFile(fig.currentPosition, dest) ||
    onSameRank(fig.currentPosition, dest)
  );
}
export function isLMove(fig: Figure, dest: string): boolean {
  const rank: number = parseInt(fig.currentPosition[1]);
  const file: number = ChessBoard.columns.indexOf(fig.currentPosition[0]);

  const destRank: number = parseInt(dest[1]);
  const destFile: number = ChessBoard.columns.indexOf(dest[0]);

  //upwards left and right
  if (Math.abs(destRank - rank) === 2 && Math.abs(destFile - file) === 1) {
    console.log("knight moved straight up or down");
    return true;
  }
  if (Math.abs(destRank - rank) === 1 && Math.abs(destFile - file) === 2) {
    console.log("knight moved left or right");
    return true;
  }
  return false;
}
export function areSameColor(fig1: Figure, fig2: Figure) {
  if (!fig2) return false;
  return fig1.isWhite === fig2.isWhite;
}
export function kingMoved(fig: Figure, dest: string) {
  let oneSquare: boolean =
    Math.abs(
      ChessBoard.columns.indexOf(fig.currentPosition[0]) -
        ChessBoard.columns.indexOf(dest[0])
    ) === 1 ||
    Math.abs(parseInt(dest[1]) - parseInt(fig.currentPosition[1])) === 1;

  return (isDiagonalMove(fig, dest) || isStraightMove(fig, dest)) && oneSquare;
}
export function pawnMoved(fig: Figure, dest: string): string {
  let oneSquare: boolean = false;
  let rankDistance = parseInt(dest[1]) - parseInt(fig.currentPosition[1]);
  if (onSameFile(fig.currentPosition, dest)) {
    if (
      (rankDistance === 1 && isWhite(fig.id)) ||
      (rankDistance === -1 && !isWhite(fig.id))
    ) {
      return "straight";
    }
    if (
      (rankDistance === 2 &&
        isWhite(fig.id) &&
        fig.currentPosition[1] === "2") ||
      (rankDistance === -2 &&
        !isWhite(fig.id) &&
        fig.currentPosition[1] === "7")
    )
      return "straight";
  }
  let fileDistance =
    ChessBoard.columns.indexOf(dest[0]) -
    ChessBoard.columns.indexOf(fig.currentPosition[0]);
  if (
    (Math.abs(fileDistance) === 1 && isWhite(fig.id) && rankDistance === 1) ||
    (Math.abs(fileDistance) === 1 && !isWhite(fig.id) && rankDistance === -1)
  )
    return "diagonal";
  else return "";
}
