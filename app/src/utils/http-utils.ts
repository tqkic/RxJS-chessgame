import { User } from "../models/User";
import { Game } from "../models/Game";

import { from, Observable } from "rxjs";
import axios from "axios";
const URL = "http://localhost:3000/";

export function getUser(id: number): Observable<User> {
  const url = `${URL}users/${id}`;
  const promise = fetch(url)
    .then((res) => {
      if (!res.ok)
        throw new Error(
          "neka greska tokom pristupanja korisniku " + res.status
        );
      return res.json();
    })
    .catch((err) => console.error(err));

  return from(promise);
}
export async function getMyFriends(id: number): Promise<object[]> {
  const url = `${URL}friends/`;
  return await fetch(url)
    .then((res) => {
      if (!res.ok)
        throw new Error(
          "neka greska tokom pristupanja korisniku " + res.status
        );
      return res.json();
    })
    .then((res) => {
      return res.filter((fr: any) => fr.userId1 === id || fr.userId2 === id);
    })
    .catch((err) => console.error(err));
}
export function getGameByID(id: number): Observable<Game> {
  const url = `${URL}games/${id}`;
  const promise = fetch(url)
    .then((res) => {
      if (!res.ok)
        throw new Error(
          "neka greska tokom pristupanja korisniku " + res.status
        );
      return res.json();
    })
    .catch((err) => console.error(err));
  return from(promise);
}
export function saveUser(user: User) {
  const url = `${URL}users/`;
  axios.post(url, user).then((res) => console.log(res));
}
export function saveGame(game: Game) {
  const url = `${URL}games/`;
  const promise = axios.post(url, game).catch((err) => console.error(err));
  return from(promise);
}
