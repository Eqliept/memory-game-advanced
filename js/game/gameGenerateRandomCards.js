export function gameGenerateRandomCards(numberOfCards) {
    const cards = [];

    for (let i = 1; i <= numberOfCards; i++) {
        cards.push(i, i);
    }

    for (let i = 0; i < cards.length; i++) {
        let randomCard = Math.floor(Math.random() * 8);
        let temp = cards[i];
        cards[i] = cards[randomCard];
        cards[randomCard] = temp;
    }
    return cards;
}