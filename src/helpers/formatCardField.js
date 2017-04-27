import cardFromNumber from '../helpers/cardFromNumber';

/**
 * Format the HTML node's value from given event
 * @param {object} event - HTML Node's event
 */
function formatCardField(event) {
  // Only format if input is a number
  let re;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  const target = event.target;
  const value = target.value;
  const card = cardFromNumber(value + digit);
  const length = (value.replace(/\D/g, '') + digit).length;
  let upperLength = 16;
  if (card) {
    upperLength = card.length[card.length.length - 1];
  }
  if (length >= upperLength) {
    return;
  }
  // Return if focus isn't at the end of the text
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (card && card.type === 'amex') {
      // AMEX cards are formatted differently
    re = /^(\d{4}|\d{4}\s\d{6})$/;
  } else {
    re = /(?:^|\s)(\d{4})$/;
  }
  // If '4242' + 4
  if (re.test(value)) {
    event.preventDefault();
    return setTimeout(() => (target.value = `${value} ${digit}`));
  // If '424' + 2
  } else if (re.test(value + digit)) {
    event.preventDefault();
    return setTimeout(() => (target.value = `${value}${digit} `));
  }
}

export default formatCardField;
