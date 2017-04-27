import cardFromNumber from '../helpers/cardFromNumber';
import luhnCheck from '../helpers/luhnCheck';

function validateCardNumber(num) {
  let ref;
  num = (num + '').replace(/\s+|-/g, '');
  if (!/^\d+$/.test(num)) {
    return false;
  }
  const card = cardFromNumber(num);
  if (!card) {
    return false;
  }
  return (ref = num.length, card.length.indexOf(ref) >= 0) && (card.luhn === false || luhnCheck(num));
}

export default validateCardNumber;
