import hasTextSelected from '../helpers/hasTextSelected';

function restrictExpiry(event) {
  const target = event.currentTarget;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  let value = target.value + digit;
  value = value.replace(/\D/g, '');
  if (value.length > 6) {
    return false;
  }
}

export default restrictExpiry;
