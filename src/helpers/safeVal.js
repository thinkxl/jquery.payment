function safeVal(value, target) {
  let error;
  let cursor;
  try {
    cursor = target.selectionStart;
  } catch (_error) {
    error = _error;
    cursor = null;
  }
  const last = target.value;
  target.value = value;
  if (cursor !== null && target === document.activeElement) {
    if (cursor === last.length) {
      cursor = value.length;
    }
    // This hack looks for scenarios where we are changing an input's value such
    // that "X| " is replaced with " |X" (where "|" is the cursor). In those
    // scenarios, we want " X|".
    // For example:
    // 1. Input field has value "4444| "
    // 2. User types "1"
    // 3. Input field has value "44441| "
    // 4. Reformatter changes it to "4444 |1"
    // 5. By incrementing the cursor, we make it "4444 1|"
    // This is awful, and ideally doesn't go here, but given the current design
    // of the system there does not appear to be a better solution.
    // Note that we can't just detect when the cursor-1 is " ", because that
    // would incorrectly increment the cursor when backspacing, e.g. pressing
    // backspace in this scenario: "4444 1|234 5".
    if (last !== value) {
      const prevPair = last.slice(cursor - 1, + cursor + 1 || 9e9);
      const currPair = value.slice(cursor - 1, + cursor + 1 || 9e9);
      const digit = value[cursor];
      if (/\d/.test(digit) && prevPair === ('' + digit + ' ') && currPair === (' ' + digit)) {
        cursor = cursor + 1;
      }
    }
    target.selectionStart = cursor;
    return (target.selectionEnd = cursor);
  }
}

export default safeVal;
