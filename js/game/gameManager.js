import { Init } from "../main.js";
import { el } from "../utils/dom.js";
import { gameGenerateRandomCards } from "./gameGenerateRandomCards.js";
import { timer as gameTimer } from "./gameTimer.js";

export function gameManager(container, seconds, numberOfCards) {
    let openCards = [];
    let matchedCards = [];

    function start(seconds, numberOfCards) {
        const timerContainer = document.getElementById("timer");
        const cardsList = gameGenerateRandomCards(numberOfCards);

        gameTimer(seconds, timerContainer).then(() => {
            reset();
        });

        cardsList.forEach(element => {
            const card = el("button", {
                classes: ["card"],
                attrs: [{ "data-cardid": element }]
            });
            container.append(card);
        });

        function flip(card) {
            card.classList.add("flipped");
        }

        function unflip(cards) {
            cards.forEach(element => {
                if (!matchedCards.includes(element)) {
                    element.classList.remove("flipped");
                }
            });
        }

        function matched(cards) {
            if (cards[0].dataset.cardid === cards[1].dataset.cardid) {
                matchedCards.push(cards[0], cards[1]);
            }

            if (matchedCards.length === numberOfCards * 2) {
                reset();
            }
        }

        container.addEventListener("click", (e) => {
            if (e.target.classList.contains("card")) {
                if (openCards.length <= 1) {
                    flip(e.target);
                    openCards.push(e.target);
                } else {
                    matched(openCards);
                    unflip(openCards);
                    openCards = [];
                }
            }
        });
    }

    start(seconds, numberOfCards);

    function reset() {
        const cards = document.querySelectorAll(".card");
        cards.forEach(element => element.remove());
        openCards = [];
        matchedCards = [];
        Init();
    }
}