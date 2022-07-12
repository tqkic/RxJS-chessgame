import {  playsWhite } from "./chessBoard";
import { setBlack, setWhite, setRandomPiece } from "./chessBoard";
export * from "./chessBoard";

document.getElementById("blackBtn").addEventListener("click", () => setBlack());
document.getElementById("whiteBtn").addEventListener("click", () => setWhite());
document
  .getElementById("randomBtn")
  .addEventListener("click", () => setRandomPiece());
document.getElementById("startPractice").addEventListener("click", () => {
  
  console.log("starting the game");

});
document.getElementById("startOnline").addEventListener("click", () => {
  //find another user that is also waiting and match them here to start the game
  //board.startGame();
});
// board.startGame();
