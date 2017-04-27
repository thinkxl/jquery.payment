import trigger from '../utils/trigger';
import removeClass from '../utils/removeClass';
import addClass from '../utils/addClass';
import cardType from '../validators/cardType';
import cards from '../cards';

function setCardType(event) {
  const target = event.currentTarget;
  const value = target.value;
  const cardTypeValue = cardType(value) || 'unknown';

  if (!target.classList.contains(cardTypeValue)) {
    const allTypes = cards.map(card => card.type);
    removeClass(target, 'unknown');

    // removeClass(target, allTypes.join(' '));
    // TODO: Improve removeClass implementation to allow
    // arrays as arguments
    allTypes.forEach((cls) => {
      removeClass(target, cls);
    });

    addClass(target, cardTypeValue);
    if (cardTypeValue !== 'unknown') {
      addClass(target, 'identified');
    } else {
      removeClass(target, 'identified');
    }
    return trigger(target, 'payment.cardType', cardTypeValue);
  }
  return false;
}

export default setCardType;
