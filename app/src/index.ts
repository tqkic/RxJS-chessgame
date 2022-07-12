import { ChessBoard, playsWhite } from "./chessBoard";
import { setBlack, setWhite, setRandomPiece } from "./chessBoard";
export * from "./chessBoard";
import { Game } from "./models/Game";

document.getElementById("blackBtn").addEventListener("click", () => setBlack());
document.getElementById("whiteBtn").addEventListener("click", () => setWhite());
document
  .getElementById("randomBtn")
  .addEventListener("click", () => setRandomPiece());
document.getElementById("startPractice").addEventListener("click", () => {
  console.log("starting the game");
});
const board = ChessBoard.getInstance();

const game: Game = {
  players: [
    {
      id: new Date().getTime() + 1,
      playsWhite: playsWhite,
      myTurn: playsWhite ? true : false,
      points: 0,
    },
    {
      id: new Date().getTime() + 2,
      playsWhite: !playsWhite,
      myTurn: playsWhite ? true : false,
      points: 0,
    },
  ],
  lastPossibleEP: null,
  winnerID: 0,
  chatHistory: [],
  winType: 0,
  movesHistory: [],
  startDate: new Date().toDateString(),
  endDate: new Date().toDateString(),
  eatenPieces: null,
};
console.log("starting the game");

board.startGame(game);
document.getElementById("startOnline").addEventListener("click", () => {
  //find another user that is also waiting and match them here to start the game
  //board.startGame();
});
// board.startGame();
