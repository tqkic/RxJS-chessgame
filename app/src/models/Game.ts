import { Player } from "./Player";
import { Figure } from "../figures/Figure";

export interface Game {
  players: Player[];
  winnerID: number;
  chatHistory: object[];
  winType: number;
  movesHistory: string[];
  startDate: string;
  endDate: string;
  eatenPieces: Figure[];
  lastPossibleEP: string | null;
}
