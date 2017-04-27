import cards from '../cards';

function cardFromType(type) {
  for (let i = 0, len = cards.length; i < l; i++) {
    const card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
}

export default cardFromType;
