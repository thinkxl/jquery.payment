import replaceFullWidthChars from '../helpers/replaceFullwidthChars';
import safeVal from '../helpers/safeVal';

function reFormatNumeric(event) {
  const target = event.currentTarget;
  return setTimeout(() => {
    let value = replaceFullWidthChars(target.value);
    value = value.replace(/\D/g, '');
    return safeVal(value, target);
  });
}

export default reFormatNumeric;
