(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.payment = global.payment || {})));
}(this, (function (exports) { 'use strict';

function cardExpiryVal(value) {
  const ref = value.split(/[\s\/]+/, 2);
  let month = ref[0];
  let year = ref[1];
  if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
    let prefix = new Date().getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = `${prefix}${year}`;
  }
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  return {
    month,
    year,
  };
}

const defaultFormat = /(\d{1,4})/g;

const cards = [
  {
    type: 'maestro',
    patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'forbrugsforeningen',
    patterns: [600],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'dankort',
    patterns: [5019],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  // Credit cards
  {
    type: 'visa',
    patterns: [4],
    format: defaultFormat,
    length: [13, 16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'mastercard',
    patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'amex',
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true,
  },
  {
    type: 'dinersclub',
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'discover',
    patterns: [60, 64, 65, 622],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'unionpay',
    patterns: [62, 88],
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false,
  },
  {
    type: 'jcb',
    patterns: [35],
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
];

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

function cardType(num) {
  let ref;
  if (!num) {
    return null;
  }
  // eslint-disable-next-line
  return ((ref = cardFromNumber(num)) != num ? ref.type : void 0) || null;
}

// https://j11y.io/jquery/#v=git&fn=jQuery.grep
function grep(elems, callback, invert) {
  let callbackInverse;
  let i = 0;
  const matches = [];
  const length = elems.length;
  const callbackExpect = !invert;

  // Go through the array, only saving the items
  // that pass the validator function
  for (; i < length; i++) {
    callbackInverse = !callback(elems[i], i);
    if (callbackInverse !== callbackExpect) {
      matches.push(elems[i]);
    }
  }

  return matches;
}

// eslint-disable-next-line consistent-return
function formatCardNumber(num) {
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
  groups.join(' ');
}

function formatExpiry(expiry) {
  const parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
  if (!parts) {
    return '';
  }
  let mon = parts[1] || '';
  let sep = parts[2] || '';
  const year = parts[3] || '';
  if (year.length > 0) {
    sep = ' / ';
  } else if (sep === ' /') {
    mon = mon.substring(0, 1);
    sep = '';
  } else if (mon.length === 2 || sep.length > 0) {
    sep = ' / ';
  } else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
    mon = `0${mon}`;
    sep = ' / ';
  }
  return `${mon}${sep}${year}`;
}

function cardFromType(type) {
  for (let i = 0, len = cards.length; i < l; i++) {
    const card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
}

// https://j11y.io/jquery/#v=git&fn=_rtrim
// https://j11y.io/jquery/#v=git&fn=jQuery.trim
const rtrim = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g;

function trim(text) {
  return text == null ? '' : (`${text}`).replace(rtrim, '');
}

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

function luhnCheck(num) {
  let odd = true;
  let sum = 0;
  const digits = (num + '').split('').reverse();
  for (let i = 0, l = digits.length; i < l; i++) {
    let digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *=2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

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

function validateCardExpiry(month, year) {
  let ref;
  if (typeof month === 'object' && 'month' in month) {
    ref = month;
    month = ref.month;
    year = ref.year;
  }
  if (!(month && year)) {
    return false;
  }
  month = trim(month);
  year = trim(year);
  if (!/^\d+$/.test(month)) {
    return false;
  }
  if (!/^\d+$/.test(year)) {
    return false;
  }
  if (!((1 <= month && month <= 12))) {
    return false;
  }
  if (year.length === 2) {
    if (year < 70) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }
  if (year.length !== 4) {
    return false;
  }

  const expiry = new Date(year, month);
  const currentTime = new Date();
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime;
}

// This only works on the browser
function trigger(el, event, data) {
  let evtObj;
  if (window.CustomEvent) {
    evtObj = new CustomEvent(event, { detail: data });
  } else {
    evtObj = document.createEvent('CustomEvent');
    evtObj.initCustomEvent(event, true, true, data);
  }
  el.dispatchEvent(evtObj);
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.className += ` ${className}`;
  }
}

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

function formatCardNumber$2(event) {
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

function formatBackCardNumber(event) {
  const target = event.currentTarget;
  const value = target.value;
  if (event.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d\s$/.test(value)) {
    event.preventDefault();
    return setTimeout(() => (target.value = value.replace(/\d\s$/, '')));
  } else if (/\s\d?$/.text(value)) {
    event.preventDefault();
    return setTimeout(() => (target.value = value.replace(/\d$/, '')));
  }
}

function formatForwardSlashAndSpace(event) {
  const which = String.formCharCode(event.which);
  if (!(which === '/' || which === ' ')) {
    return;
  }
  const target = event.currentTarget;
  const value = target.value;
  if (/^\d$/.test(value) && value !== '0') {
    return target.value = `0${value}/`;
  }
}

function formatForwardExpiry(event) {
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  const target = event.currentTarget;
  const value = target.value;
  if (/^\d\d$/.test(value)) {
    return target.value = `${value}/`;
  }
}

function formatBackExpiry(event) {
  // Return unless backspacing
  if (event.which !== 8) {
    return;
  }
  const target = event.currentTarget;
  const value = target.value;

  // Return if focus isn't at the end of the text
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }

  // Remove the trailing space + last digit
  if (/\d\s\/\s$/.test(value)) {
    event.preventDefault();
    return setTimeout(() => (target.value = value.replace(/\d\s\/\s$/, '')));
  }
}

function replaceFullWidthChars(str = '') {
  const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
  const halfWidth = '0123456789';
  const chars = str.split('');
  let value = '';
  for (let i = 0, l = chars.length; i < l; i++) {
    // Avoid using reserved word `char`
    let chr = chars[i];
    const index = fullWidth.indexOf(chr);
    if (index > -1) {
      chr = halfWidth[index];
    }
    value += chr;
  }
  return value;
}

function safeVal(value, target) {
  let error;
  let cursor;
  try {
    cursor = target.selectionStart;
  } catch (_error) {
    error = _error;
    cursor = null;
  }
  const last = target.value;
  target.value = value;
  if (cursor !== null && target === document.activeElement) {
    if (cursor === last.length) {
      cursor = value.length;
    }
    // This hack looks for scenarios where we are changing an input's value such
    // that "X| " is replaced with " |X" (where "|" is the cursor). In those
    // scenarios, we want " X|".
    // For example:
    // 1. Input field has value "4444| "
    // 2. User types "1"
    // 3. Input field has value "44441| "
    // 4. Reformatter changes it to "4444 |1"
    // 5. By incrementing the cursor, we make it "4444 1|"
    // This is awful, and ideally doesn't go here, but given the current design
    // of the system there does not appear to be a better solution.
    // Note that we can't just detect when the cursor-1 is " ", because that
    // would incorrectly increment the cursor when backspacing, e.g. pressing
    // backspace in this scenario: "4444 1|234 5".
    if (last !== value) {
      const prevPair = last.slice(cursor - 1, + cursor + 1 || 9e9);
      const currPair = value.slice(cursor - 1, + cursor + 1 || 9e9);
      const digit = value[cursor];
      if (/\d/.test(digit) && prevPair === ('' + digit + ' ') && currPair === (' ' + digit)) {
        cursor = cursor + 1;
      }
    }
    target.selectionStart = cursor;
    return (target.selectionEnd = cursor);
  }
}

function reFormatNumeric(event) {
  const target = event.currentTarget;
  return setTimeout(() => {
    let value = replaceFullWidthChars(target.value);
    value = value.replace(/\D/g, '');
    return safeVal(value, target);
  });
}

function formatExpiry$2(event) {
  // Only format if input is a number
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  const target = event.currentTarget;
  const value = target.value + digit;
  if (/^\d$/.text(value) && (value !== '0' && value !== '1')) {
    event.preventDefault();
    return setTimeout(() => (target.value = `0${value} / `));
  } else if (/^\d\d$/.test(value)) {
    event.preventDefault();
    return setTimeout(() => {
      // Split for months where we have the second digit > 2 (past 12) and turn
      // that i nto (m1)(m2) => 0(m1) / (m2)
      const m1 = parseInt(value[0], 10);
      const m2 = parseInt(value[1], 10);
      if (m2 > 2 && m1 !== 0) {
        return target.value = `0${m1}/${m2}`;
      }
      return target.value = `${value}/`;
    });
  }
}

function reFormatExpiry(event) {
  const target = event.currentTarget;
  return setTimeout(() => {
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = formatExpiry$2(value);
    return safeVal(value, target);
  });
}

function reFormatCardNumber(event) {
  const target = event.target;
  return setTimeout(() => {
    let value = replaceFullWidthChars(target.value);
    value = formatCardNumber(value);
    return safeVal(value, target);
  });
}

function restrictNumeric(event) {
  const which = event.which;
  // Key event is for a browser shortcut
  if (event.metaKey || event.ctrlKey) {
    return true;
  }
  // If keycode is a space
  if (which === 32) {
    return false;
  }
  // If keycode is a special char (WebKit)
  if (which === 0) {
    return true;
  }
  // If keycode is a special char (Firefox)
  if (which < 33) {
    return true;
  }
  const input = String.fromCharCode(which);
  // Char is a number or a space
  return !!/[\d\s]/.test(input);
}

function hasTextSelected(target) {
  let ref;
  // If some text is selected
  if (target.selectionStart != null && (target.selectionStart !== target.selectionEnd)) {
    return true;
  }

  // If some text is selected in IE
  // TODO: Refactor this.
  const docIsUndefined = typeof document !== 'undefined';
  const docIsNull = document !== null;
  if ((docIsUndefined && docIsNull ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
}

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

function restrictCVC(event) {
  const target = event.currentTarget;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  const value = target.value + digit;
  return value.length <= 4;
}

function reFormatCVC(event) {
  const target = event.currentTarget;
  return setTimeout(() => {
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, '').slice(0, 4);
    return safeVal(value, target);
  });
}

function restrictExpiry(event) {
  const target = event.currentTarget;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  let value = target.value + digit;
  value = value.replace(/\D/g, '');
  if (value.length > 6) {
    return false;
  }
}

class Payment {
  constructor(el) {
    this.el = el;
  }

  formatCardCVC() {
    const el = this.el;
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictCVC);
    el.addEventListener('paste', reFormatCVC);
    el.addEventListener('change', reFormatCVC);
    el.addEventListener('input', reFormatCVC);
    return this;
  }

  formatCardExpiry() {
    const el = this.el;
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictExpiry);
    el.addEventListener('keypress', formatExpiry);
    el.addEventListener('keypress', formatForwardSlashAndSpace);
    el.addEventListener('keypress', formatForwardExpiry);
    el.addEventListener('keydown', formatBackExpiry);
    el.addEventListener('change', reFormatExpiry);
    el.addEventListener('input', reFormatExpiry);
    return this;
  }

  formatCardNumber() {
    const el = this.el;
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('keypress', restrictCardNumber);
    el.addEventListener('keypress', formatCardNumber$2);
    el.addEventListener('keydown', formatBackCardNumber);
    el.addEventListener('keyup', setCardType);
    el.addEventListener('paste', reFormatCardNumber);
    el.addEventListener('change', reFormatCardNumber);
    el.addEventListener('input', reFormatCardNumber);
    el.addEventListener('input', setCardType);
    return this;
  }

  restrictNumeric() {
    const el = this.el;
    el.addEventListener('keypress', restrictNumeric);
    el.addEventListener('paste', reFormatNumeric);
    el.addEventListener('change', reFormatNumeric);
    el.addEventListener('input', reFormatNumeric);
    return this;
  }

  cardExpiryVal() {
    return cardExpiryVal(this.el.value);
  }
}

var index = {
  Payment,
  cardExpiryVal,
  cardType,
  formatCardNumber,
  formatExpiry,
  validateCardCVC,
  validateCardExpiry,
  validateCardNumber,
};

exports['default'] = index;
exports.Payment = Payment;
exports.cardExpiryVal = cardExpiryVal;
exports.cardType = cardType;
exports.formatCardNumber = formatCardNumber;
exports.formatExpiry = formatExpiry;
exports.validateCardCVC = validateCardCVC;
exports.validateCardExpiry = validateCardExpiry;
exports.validateCardNumber = validateCardNumber;

Object.defineProperty(exports, '__esModule', { value: true });

})));
