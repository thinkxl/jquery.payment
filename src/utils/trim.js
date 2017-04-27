// https://j11y.io/jquery/#v=git&fn=_rtrim
// https://j11y.io/jquery/#v=git&fn=jQuery.trim
const rtrim = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g;

function trim(text) {
  return text == null ? '' : (`${text}`).replace(rtrim, '');
}

export default trim;
