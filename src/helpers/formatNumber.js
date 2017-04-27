import cardFromNumber from '../helpers/cardFromNumber';
import grep from '../utils/grep';

/**
 * If the given string is a valid credit card number, it'll return the number formatted
 * in four groups of four digits separated by one space. Otherwise it'll return the given
 * string unformatted.
 * @param {string} num - Credit card number
 * @example
 * // returns 4141 4141 4141 4141
 * formatNumber('4141414141414141');
 * @example
 * // returns 11111111
 * formatNumber('11111111');
 */
function formatNumber(num) {
  let ref;
  let groups;
  // eslint-disable-next-line no-param-reassign
  num = num.replace(/\D/g, '');
  const card = cardFromNumber(num);
  if (!card) {
    return num;
  }
  const upperLength = card.length[card.length.length - 1];
  // eslint-disable-next-line no-param-reassign
  num = num.slice(0, upperLength);
  if (card.format.global) {
    return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
  }
  groups = card.format.exec(num);
  if (groups == null) {
    return;
  }
  groups.shift();
  groups = grep(groups, n => n);
  return groups.join(' ');
}

export default formatNumber;
