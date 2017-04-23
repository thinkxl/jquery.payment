import cardExpiryVal from './validators/cardExpiryVal';
import setCardType from './utils/setCardType';
import formatCardNumber from './validators/formatCardNumber';
import formatBackCardNumber from './utils/formatBackCardNumber';
import formatExpiry from './validators/formatExpiry';
import formatForwardSlashAndSpace from './utils/formatForwardSlashAndSpace';
import formatForwardExpiry from './utils/formatForwardExpiry';
import formatBackExpiry from './utils/formatBackExpiry';
import reFormatNumeric from './utils/reFormatNumeric';
import reFormatExpiry from './utils/reFormatExpiry';
import reFormatCardNumber from './utils/reFormatCardNumber';
import restrictNumeric from './utils/restrictNumeric';
import restrictCardNumber from './utils/restrictCardNumber';
import restrictCVC from './utils/restrictCVC';
import reFormatCVC from './utils/reFormatCVC';
import restrictExpiry from './utils/restrictExpiry';

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
    el.addEventListener('keypress', formatCardNumber);
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

export default Payment;
