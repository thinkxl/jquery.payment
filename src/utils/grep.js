// https://j11y.io/jquery/#v=git&fn=jQuery.grep
function grep(elems, callback, invert) {
  let callbackInverse;
  let i = 0;
  const matches = [];
  const length = elems.length;
  const callbackExpect = !invert;

  // Go through the array, only saving the items
  // that pass the validator function
  for (; i < length; i++) {
    callbackInverse = !callback(elems[i], i);
    if (callbackInverse !== callbackExpect) {
      matches.push(elems[i]);
    }
  }

  return matches;
}

export default grep;
