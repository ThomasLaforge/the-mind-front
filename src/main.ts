import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

socket.on("patate", (message) => {
  console.log(message);
});

const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('input') as HTMLInputElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});