import safeVal from '../helpers/safeVal';
import replaceFullWidthChars from '../helpers/replaceFullwidthChars';
import formatCardNumber from '../validators/formatCardNumber';

function reFormatCardNumber(event) {
  const target = event.target;
  return setTimeout(() => {
    let value = replaceFullWidthChars(target.value);
    value = formatCardNumber(value);
    return safeVal(value, target);
  });
}

export default reFormatCardNumber;
