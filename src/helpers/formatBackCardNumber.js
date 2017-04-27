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

export default formatBackCardNumber;
