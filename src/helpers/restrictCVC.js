import hasTextSelected from '../helpers/hasTextSelected';

function restrictCVC(event) {
  const target = event.currentTarget;
  const digit = String.fromCharCode(event.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  const value = target.value + digit;
  return value.length <= 4;
}

export default restrictCVC;
