import { ChessBoard, playsWhite } from "./chessBoard";
import { setBlack, setWhite, setRandomPiece } from "./chessBoard";
export * from "./chessBoard";
import { Game } from "./models/Game";
import { io, Socket } from "socket.io-client";
import { generateCode } from "./utils/helper";
let game: Game = {
  players: [
    {
      id: "",
      playsWhite: true,
      myTurn: true,
      points: 0,
    },
    {
      id: "",
      playsWhite: false,
      myTurn: false,
      points: 0,
    },
  ],
  lastPossibleEP: null,
  winnerID: 0,
  chatHistory: [],
  winType: 0,
  movesHistory: [],
  startDate: new Date().toDateString(),
  endDate: null,
  eatenPieces: null,
};
const board = ChessBoard.getInstance();

const socket: Socket = io("http://localhost:8000/");

socket.on("connect", () => {
  console.log("You connected with the id " + socket.id);
});

//this is where the game begins, the user that started the game gets the feedback of the other user joining, so the game can start
socket.on("send-id", (id: string) => {
  game.players[1].id = id;
  console.log(game);
  socket.emit("send-id", socket.id);
  //set the timer for the white player also, actually start the game with board.startGame() and there you can start the timer
  board.startGame(game);
});
socket.on("send-id2", (id: string) => {
  game.players[0].id = id;
  console.log(game);
});
//event listeners ------------------------------------------------------------------------
document.getElementById("blackBtn").addEventListener("click", () => setBlack());
document.getElementById("whiteBtn").addEventListener("click", () => setWhite());
document
  .getElementById("randomBtn")
  .addEventListener("click", () => setRandomPiece());

document.getElementById("startPractice").addEventListener("click", () => {
  console.log("starting the game");
  board.startGame(game);
});

document.getElementById("startOnline").addEventListener("click", () => {
  //find another user that is also waiting and match them here to start the game

  game.players[0].id = socket.id;
  const code = generateCode();

  //display the code
  document.getElementById("codeInput").innerHTML =
    "Send this code to a friend " + code;

  socket.emit("join-room", code, (msg: string, id: string) => {
    console.log(msg);
    game.players[0].id = id;
  });
  //display the code to the user so the other user can type it in and write it
});

document.getElementById("onlineGame").addEventListener("submit", joinGame);
//---------------------------------------------------------------------------------------
function joinGame(e: any) {
  e.preventDefault();
  const code = e.target.room.value;
  if (code) {
    socket.emit("join-room-p2", code, (msg: string, id: string) => {
      console.log(msg);
      game.players[1].id = id;
    });
    console.log("hello");

    // socket.emit("send-id", socket.id);
  }
}
