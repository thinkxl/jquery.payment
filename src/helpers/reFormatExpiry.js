import replaceFullWidthChars from '../helpers/replaceFullwidthChars';
import formatExpiry from '../helpers/formatExpiry';
import safeVal from '../helpers/safeVal';

function reFormatExpiry(event) {
  const target = event.currentTarget;
  return setTimeout(() => {
    let value = target.value;
    value = replaceFullWidthChars(value);
    value = formatExpiry(value);
    return safeVal(value, target);
  });
}

export default reFormatExpiry;
