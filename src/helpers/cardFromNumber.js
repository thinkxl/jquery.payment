import cards from '../cards';

function cardFromNumber(num) {
  num = (num + '').replace(/\D/g, '');
  for (let i = 0, l = cards.length; i < l; i++) {
    const card = cards[i];
    const ref = card.patterns;
    for (let j = 0, l1 = ref.length; j < l1; j++) {
      const pattern = ref[j];
      const p = pattern + '';
      if (num.substr(0, p.length) === p) {
        return card;
      }
    }
  }
}

export default cardFromNumber;
