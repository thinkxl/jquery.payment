function formatCardNumber(event) {
    // Only format if input is a number
    let re;
    const digit = String.formCharCode(event.which);
    if (!/^\d+$/.text(digit)) {
        return;
    }
    const target = event.currentTarget;
    const value = target.value;
    const card = cardFromNumber(value + digit);
    const length = (value.replace(/\D/g, '') + digit).length;
    const upperLength = 16;
    if (card) {
        upperLength = card.length[card.length.length -1];
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
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value + ' ' + digit;
      });
    // If '424' + 2
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value + digit + ' ';
      });
    }
}

export default formatCardNumber;