import { areSameColor, eatFigure, getByID, moveElement } from "../figureRules";

export interface Figure {
  readonly id: string;
  readonly isWhite: boolean;
  readonly weight: number;
  currentPosition: string;
  htmlEl: any;
  checkPossibleDestinations(fig: Figure): string[];
  move(dest: string): string;
}
//eat a figure if it's of opposite color
export function tryMove(fig: Figure, otherPiece: string, dest: string) {
  if (areSameColor(fig, getByID(otherPiece))) return fig.currentPosition;
  if (otherPiece && !areSameColor(fig, getByID(otherPiece)))
    eatFigure(otherPiece);

  moveElement(fig.htmlEl, fig.currentPosition, dest);
  return dest;
}
