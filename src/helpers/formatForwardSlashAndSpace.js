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

export default formatForwardSlashAndSpace;
