import trim from '../utils/trim';

function validateCardExpiry(month, year) {
  let ref;
  if (typeof month === 'object' && 'month' in month) {
    ref = month;
    month = ref.month;
    year = ref.year;
  }
  if (!(month && year)) {
    return false;
  }
  month = trim(month);
  year = trim(year);
  if (!/^\d+$/.test(month)) {
    return false;
  }
  if (!/^\d+$/.test(year)) {
    return false;
  }
  if (!((1 <= month && month <= 12))) {
    return false;
  }
  if (year.length === 2) {
    if (year < 70) {
      year = `20${year}`;
    } else {
      year = `19${year}`;
    }
  }
  if (year.length !== 4) {
    return false;
  }

  const expiry = new Date(year, month);
  const currentTime = new Date();
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime;
}

export default validateCardExpiry;
