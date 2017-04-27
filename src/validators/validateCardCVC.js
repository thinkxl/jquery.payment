import cardFromType from '../helpers/cardFromType';
import trim from '../utils/trim';

function validateCardCVC(cvc, type) {
  let ref;
  cvc = trim(cvc);
  if (!/^\d+$/.test(cvc)) {
    return false;
  }
  const card = cardFromType(type);
  if (card != null) {
    return ref = cvc.length, card.cvcLength.indexOf(ref) >= 0;
  } 
  return cvc.length >= 3 && cvc.length <= 4;
}

export default validateCardCVC;
