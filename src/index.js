import cardExpiryVal from './validators/cardExpiryVal';
import cardType from './validators/cardType';
import formatCardNumber from './validators/formatCardNumber';
import formatExpiry from './validators/formatExpiry';
import validateCardCVC from './validators/validateCardCVC';
import validateCardNumber from './validators/validateCardNumber';
import validateCardExpiry from './validators/validateCardExpiry';
import Payment from './payment';

function formatCardCVC(elem) {
  elem.addEventListener('keypress', restrictNumeric);
  elem.addEventListener('keypress', restrictCVC);
  elem.addEventListener('paste', reFormatCVC);
  elem.addEventListener('change', reFormatCVC);
  elem.addEventListener('input', reFormatCVC);
}

function formatCardExpiry(elem) {
  elem.addEventListener('keypress', restrictNumeric);
  elem.addEventListener('keypress', restrictExpiry);
  elem.addEventListener('keypress', formatExpiry);
  elem.addEventListener('keypress', formatForwardSlashAndSpace);
  elem.addEventListener('keypress', formatForwardExpiry);
  elem.addEventListener('keydown', formatBackExpiry);
  elem.addEventListener('change', reFormatExpiry);
  elem.addEventListener('input', reFormatExpiry);
}

function formatCardNumber(elem) {
  elem.addEventListener('keypress', restrictNumeric);
  elem.addEventListener('keypress', restrictCardNumber);
  elem.addEventListener('keypress', formatCardField);
  elem.addEventListener('keydown', formatBackCardNumber);
  elem.addEventListener('keyup', setCardType);
  elem.addEventListener('paste', reFormatCardNumber);
  elem.addEventListener('change', reFormatCardNumber);
  elem.addEventListener('input', reFormatCardNumber);
  elem.addEventListener('input', setCardType);
}

function restrictNumeric(elem) {
  elem.addEventListener('keypress', restrictNumeric);
  elem.addEventListener('paste', reFormatNumeric);
  elem.addEventListener('change', reFormatNumeric);
  elem.addEventListener('input', reFormatNumeric);
}

function cardExpiryVal(elem) {
  return cardExpiryVal(elem.value);
}

export {
  // Top level API
  formatCardCVC,
  formatCardExpiry,
  formatCardNumber,
  restrictNumeric,
  cardExpiryVal,
  // Public API
  cardExpiryVal,
  cardType,
  formatCardNumber,
  formatExpiry,
  validateCardCVC,
  validateCardExpiry,
  validateCardNumber,
  cards,
};
