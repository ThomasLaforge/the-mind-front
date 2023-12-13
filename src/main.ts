import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("message", (message) => {
  console.log(message);
});

const gamePreparation = document.createElement("div");
gamePreparation.classList.add("game-preparation");

const GP_Title = document.createElement("h1");
GP_Title.innerText = "Game preparation";
gamePreparation.appendChild(GP_Title);

const GP_Status = document.createElement("p");
GP_Status.innerText = "Waiting for players...";
gamePreparation.appendChild(GP_Status)

document.body.appendChild(gamePreparation);

socket.on("partieprete", () => {
  GP_Status.innerText = "Game is ready !";
});