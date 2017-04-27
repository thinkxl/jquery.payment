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

export default restrictNumeric;
