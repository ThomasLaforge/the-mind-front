import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
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

//////////
// Game //
//////////
const game = document.createElement("div");
game.classList.add("game");

const G_Title = document.createElement("h1");
G_Title.innerText = "Votre ";
game.appendChild(G_Title);

const G_playedCards = document.createElement("div");
G_playedCards.classList.add("played-cards");
game.appendChild(G_playedCards);

const G_Cards = document.createElement("div");
G_Cards.classList.add("player-cards");
game.appendChild(G_Cards);


socket.on("partieprete", (cards: number[]) => {
  gamePreparation.remove();
  document.body.appendChild(game);
  cards.forEach((card) => {
    const G_Card = document.createElement("div");
    G_Card.classList.add("card");
    G_Card.setAttribute('id', 'card-' + card.toString())
    G_Card.innerText = card.toString();
    G_Card.addEventListener("click", () => {
      socket.emit("cartejouee", card);
    });
    
    G_Cards.appendChild(G_Card);
  });
});

function addActions(){
  const actions = document.createElement("div");
  actions.classList.add("actions");
  
  const TestPartiePrete = document.createElement("button");
  TestPartiePrete.innerText = "Test partie prête";
  TestPartiePrete.addEventListener("click", () => {
    socket.emit("test_partieprete");
  });

  actions.appendChild(TestPartiePrete);
  
  document.body.appendChild(actions);
}

// addActions();