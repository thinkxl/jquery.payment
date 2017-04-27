/**
 * Format the HTML node's value from given event
 * @param {object} event - HTML Node's event
 */
function formatExpiryField(event) {
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
      // that into (m1)(m2) => 0(m1) / (m2)
      const m1 = parseInt(value[0], 10);
      const m2 = parseInt(value[1], 10);
      if (m2 > 2 && m1 !== 0) {
        return target.value = `0${m1}/${m2}`;
      }
      return target.value = `${value}/`;
    });
  }
}

export default formatExpiryField;
