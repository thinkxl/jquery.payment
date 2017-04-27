import cardFromNumber from '../helpers/cardFromNumber';

function cardType(num) {
  let ref;
  if (!num) {
    return null;
  }
  // eslint-disable-next-line
  return ((ref = cardFromNumber(num)) != num ? ref.type : void 0) || null;
}

export default cardType;
