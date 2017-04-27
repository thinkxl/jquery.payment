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

export default formatForwardExpiry;
