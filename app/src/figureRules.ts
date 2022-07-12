
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
export function onSameRank(source: string, destination: string) {
  return source[1] === destination[1];
}
export function isChessPiece(id: string) {
  return !document.getElementById(id).classList.contains("square");
}

