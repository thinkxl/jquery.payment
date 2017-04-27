import hasTextSelected from '../helpers/hasTextSelected';
import cardFromNumber from './cardFromNumber';

function restrictCardNumber(event) {
  const target = event.target;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  // Restrict number of digits
  const value = (target.value + digit).replace(/\D/g, '');
  console.log('value: ', value);
  const card = cardFromNumber(value);
  console.log('card:', card);
  if (card) {
    console.log('card');
    console.log(value.length <= card.length[card.length.length - 1]);
    return value.length <= card.length[card.length.length - 1];
  }
  // All other cards are 16 digits long
  console.log('no card');
  console.log(value.length <= 16);
  return value.length <= 16;
}

export default restrictCardNumber;
