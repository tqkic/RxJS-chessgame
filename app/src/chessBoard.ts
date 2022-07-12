import { getByID, isWhite } from "./figureRules";
import { Figure } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Bishop } from "./figures/Bishop";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";

//for colors
let odd: boolean = false;
let whitePlayerTurn: boolean = true;

export let playsWhite: boolean = false;
//fixed size of pieces
const figureSize: number = 67.5;

const board = document.getElementById("board");
export const columns=["a","b","c","d","e","f","g","h"];
export let chessPieces: Figure[] = [];

//gets the current figure that is being dragged
let draggedFigure: Figure | null = null;

//get the sprites image
const img: HTMLImageElement = document.createElement("img");
const imgSource: string = "assets/pieces.png";
img.src = imgSource;
 
//-------------------------------------------------------------------------
playsWhite = true;

for (let i = 8; i > 0; i--) {
  //first set it to the opposite so that after
  //it finishes in the j loop it can start with
  //the opposite color than the previous row
  odd = !odd;

  for (let j = 1; j < 9; j++) {
    const div: Element = document.createElement("div");
    div.classList.add("square");
    div.id = `${columns[j - 1]}${i}`;

    if (odd) div.classList.add("white");
    else div.classList.add("black");
    odd = !odd;
    board!.appendChild(div);
  }
}
setPieces();
disablePieces(false);

function setSize(
  element: any,
  row: number,
  column: number,
  pos: string,
  left: string,
  top: string
) {
  //get sprites by image resolution
  element.style.width = `${figureSize}px`;
  element.style.height = `${figureSize}px`;
  element.style.backgroundImage = `url(${imgSource})`;
  element.style.backgroundPosition = `-${figureSize * column}px -${
    figureSize * row
  }px`;

  //add dragging of figures
  element.setAttribute("draggable", true);
  element.style.cursor = "pointer";

  //position sprites to respective squares
  element.style.position = "absolute";
  element.left = left;
  element.top = top;
  addEvents(element);

  const div: HTMLElement | null = document.getElementById(pos);
  div!.appendChild(element);
}
function createSpan(name: string) {
  const temp = document.createElement("span");
  temp.classList.add("figure");
  temp.id = name;
  return temp;
}
function handleDragStart(e: any) {
  draggedFigure = getByID(e.target.id)!;
  e.target.classList.add("dragging");
}
function handleDragging(e: any) {
  e.preventDefault();
  //  board!.style.cursor = "pointer";
}
function handleDragEnd(e: any) {
  e.preventDefault();
  draggedFigure!.htmlEl.classList.remove("dragging");
  const square: Element | null = document.elementFromPoint(
    e.clientX,
    e.clientY
  );
  if (
    (whitePlayerTurn && !isWhite(draggedFigure!.id)) ||
    (!whitePlayerTurn && isWhite(draggedFigure!.id))
  ) {
    return;
  }
  if (square == null || square!.classList.contains("root")) {
    return;
  }
  // ChessBoard.game.players[0].myTurn = !ChessBoard.game.players[0].myTurn;
  // ChessBoard.game.players[1].myTurn = !ChessBoard.game.players[1].myTurn;
  // square.appendChild(draggedFigure);
  
  console.log(
    (whitePlayerTurn ? "white " : "black ") +
      "player cannot play now, it's the other player turn"
  );
  console.log("moving figure " + draggedFigure!.id + " to " + square!.id);

  const tempPos = draggedFigure!.move(square!.id);

  if (draggedFigure!.currentPosition === tempPos) return;
  else draggedFigure!.currentPosition = tempPos;

  whitePlayerTurn = !whitePlayerTurn;
  return;

  //ChessBoard.player.myTurn = !ChessBoard.player.myTurn;
}
function addEvents(element: any) {
  element.addEventListener("dragstart", handleDragStart);
  element.addEventListener("dragover", handleDragging);
  element.addEventListener("dragend", handleDragEnd);
}
function removeEvents(el: HTMLElement) {
  el.removeEventListener("dragstart", handleDragStart);
  el.removeEventListener("dragover", handleDragging);
  el.removeEventListener("dragend", handleDragEnd);
}
function disablePieces(isWhite: boolean) {
  chessPieces
    .filter((p) => p.isWhite === !isWhite)
    .forEach((piece) => {
      piece.htmlEl.setAttribute("draggable", true);
      piece.htmlEl.style.cursor = "pointer";
    });
  chessPieces
    .filter((p) => p.isWhite === isWhite)
    .forEach((piece) => {
      piece.htmlEl.setAttribute("draggable", false);
      piece.htmlEl.style.cursor = "initial";
    });
}
//set all sprites
function setPieces() {
  resetFigures();

  //get the existing squares
  const divs: HTMLCollection = document.getElementsByClassName("square");
  let br = 0;

  for (let i = 8; i > 0; i--) {
    if (playsWhite) {
      for (let j = 1; j < 9; j++) {
        //reverse ids if playsWhite changed
        divs[br].id = `${columns[j - 1]}${i}`;
        br++;
      }
    } else {
      for (let j = 8; j > 0; j--) {
        divs[br].id = `${columns[j - 1]}${i}`;
        br++;
      }
    }
  }

  getQueens();
  getRooks();
  getPawns();
  getKnights();
  getBishops();
  getKings();
  console.log(chessPieces);

}
//--------------------------------------------
//getting different sprites
function getQueens() {
  const whiteQueen: Element = createSpan("wQueen");
  const blackQueen: Element = createSpan("bQueen");

  if (playsWhite) {
    setSize(whiteQueen, 0, 1, "d1", "150px", "350px");
    setSize(blackQueen, 1, 1, "d8", "150px", "0px");
  } else {
    setSize(whiteQueen, 0, 1, "d8", "150px", "350px");
    setSize(blackQueen, 1, 1, "d1", "150px", "350px");
  }
  chessPieces.push(
    new Queen(whiteQueen, whiteQueen.id, true, whiteQueen.parentElement!.id)
  );
  chessPieces.push(
    new Queen(blackQueen, blackQueen.id, false, blackQueen.parentElement!.id)
  );
}
function getPawns() {
  const size = 50;
  for (let i = 1; i < 9; i++) {
    const whitePawn: Element = createSpan(`wPawn${i}`);
    const blackPawn: Element = createSpan(`bPawn${i}`);
    if (playsWhite) {
      setSize(
        whitePawn,
        0,
        5,
        "" + columns[i - 1] + 2,
        size * i + "px",
        "300px"
      );
      setSize(
        blackPawn,
        1,
        5,
        "" + columns[i - 1] + 7,
        size * i + "px",
        "50px"
      );
    } else {
      setSize(
        whitePawn,
        0,
        5,
        "" + columns[i - 1] + 7,
        size * i + "px",
        "50px"
      );
      setSize(
        blackPawn,
        1,
        5,
        "" + columns[i - 1] + 2,
        size * i + "px",
        "300px"
      );
    }
    chessPieces.push(
      new Pawn(whitePawn, whitePawn.id, true, whitePawn.parentElement!.id)
    );
    chessPieces.push(
      new Pawn(blackPawn, blackPawn.id, false, blackPawn.parentElement!.id)
    );
   
  }
}
function getKings() {
  const whiteKing: Element = createSpan("wKing");
  const blackKing: Element = createSpan("bKing");
  if (playsWhite) {
    setSize(whiteKing, 0, 0, "e1", "200px", "350px");
    setSize(blackKing, 1, 0, "e8", "200px", "0px");
  } else {
    setSize(whiteKing, 0, 0, "e8", "150px", "0px");
    setSize(blackKing, 1, 0, "e1", "150px", "350px");
  }
  chessPieces.push(
    new King(whiteKing, whiteKing.id, true, whiteKing.parentElement!.id)
  );
  chessPieces.push(
    new King(blackKing, blackKing.id, false, blackKing.parentElement!.id)
  );
}
function getRooks() {
  const whiteRook1: Element = createSpan("wRook1");
  const whiteRook2: Element = createSpan("wRook2");
  const blackRook1: Element = createSpan("bRook1");
  const blackRook2: Element = createSpan("bRook2");

  if (playsWhite) {
    setSize(whiteRook1, 0, 4, "a1", "0px", "350px");
    setSize(whiteRook2, 0, 4, "h1", "350px", "350px");
    setSize(blackRook1, 1, 4, "a8", "0px", "0px");
    setSize(blackRook2, 1, 4, "h8", "350px", "0px");
  } else {
    setSize(whiteRook1, 0, 4, "a8", "0px", "0px");
    setSize(whiteRook2, 0, 4, "h8", "350px", "0px");
    setSize(blackRook1, 1, 4, "a1", "350px", "350px");
    setSize(blackRook2, 1, 4, "h1", "0px", "350px");
  }
  chessPieces.push(
    new Rook(whiteRook1, whiteRook1.id, true, whiteRook1.parentElement!.id)
  );
  chessPieces.push(
    new Rook(blackRook1, blackRook1.id, false, blackRook1.parentElement!.id)
  );
  chessPieces.push(
    new Rook(whiteRook2, whiteRook2.id, true, whiteRook2.parentElement!.id)
  );
  chessPieces.push(
    new Rook(blackRook2, blackRook2.id, false, blackRook2.parentElement!.id)
  );
}
function getKnights() {
  const whiteKnight1: Element = createSpan("wKnight1");
  const whiteKnight2: Element = createSpan("wKnight2");
  const blackKnight1: Element = createSpan("bKnight1");
  const blackKnight2: Element = createSpan("bKnight2");

  if (playsWhite) {
    setSize(whiteKnight1, 0, 3, "b1", "50px", "300px");
    setSize(whiteKnight2, 0, 3, "g1", "300px", "0px");
    setSize(blackKnight1, 1, 3, "b8", "50px", "0px");
    setSize(blackKnight2, 1, 3, "g8", "300px", "0px");
  } else {
    setSize(blackKnight2, 1, 3, "g1", "50px", "300px");
    setSize(blackKnight1, 1, 3, "b1", "300px", "0px");
    setSize(whiteKnight1, 0, 3, "b8", "50px", "0px");
    setSize(whiteKnight2, 0, 3, "g8", "300px", "0px");
  }
  chessPieces.push(
    new Knight(
      whiteKnight1,
      whiteKnight1.id,
      true,
      whiteKnight1.parentElement!.id
    )
  );
  chessPieces.push(
    new Knight(
      blackKnight1,
      blackKnight1.id,
      false,
      blackKnight1.parentElement!.id
    )
  );
  chessPieces.push(
    new Knight(
      whiteKnight2,
      whiteKnight2.id,
      true,
      whiteKnight2.parentElement!.id
    )
  );
  chessPieces.push(
    new Knight(
      blackKnight2,
      blackKnight2.id,
      false,
      blackKnight2.parentElement!.id
    )
  );
}
function getBishops() {
  const whiteBishop1: Element = createSpan("wBishop1");
  const whiteBishop2: Element = createSpan("wBishop2");
  const blackBishop1: Element = createSpan("bBishop1");
  const blackBishop2: Element = createSpan("bBishop2");

  if (playsWhite) {
    setSize(whiteBishop1, 0, 2, "c1", "100px", "350px");
    setSize(whiteBishop2, 0, 2, "f1", "250px", "350px");
    setSize(blackBishop1, 1, 2, "c8", "100px", "0px");
    setSize(blackBishop2, 1, 2, "f8", "250px", "0px");
  } else {
    setSize(blackBishop2, 1, 2, "f1", "100px", "350px");
    setSize(blackBishop1, 1, 2, "c1", "250px", "350px");
    setSize(whiteBishop1, 0, 2, "c8", "100px", "0px");
    setSize(whiteBishop2, 0, 2, "f8", "250px", "0px");
  }
  chessPieces.push(
    new Bishop(
      whiteBishop1,
      whiteBishop1.id,
      true,
      whiteBishop1.parentElement!.id
    )
  );
  chessPieces.push(
    new Bishop(
      blackBishop1,
      blackBishop1.id,
      false,
      blackBishop1.parentElement!.id
    )
  );
  chessPieces.push(
    new Bishop(
      whiteBishop2,
      whiteBishop2.id,
      true,
      whiteBishop2.parentElement!.id
    )
  );
  chessPieces.push(
    new Bishop(
      blackBishop2,
      blackBishop2.id,
      false,
      blackBishop2.parentElement!.id
    )
  );
}
//---------------------------------------------
//sets the board depending on what the user chose to play as
export function setBlack() {
  if (playsWhite) {
    playsWhite = false;
    setPieces();
    console.log("black is set");
  }
}
export function setWhite() {
  if (!playsWhite) {
    playsWhite = true;
    setPieces();
    console.log("white is set");
  }
}
export function setRandomPiece() {
  const num: number = Math.random();

  //this is to avoid unneccessary looping and changing of elements if nothing changed
  if ((num <= 0.5 && playsWhite) || (num > 0.5 && !playsWhite)) return;
  else playsWhite = !playsWhite;

  console.log(playsWhite ? "white is set" : "black is set");
  setPieces();
}
//reset all moved figures
function resetFigures() {
  document.querySelectorAll("div.square > span").forEach((el) => el.remove());
}
