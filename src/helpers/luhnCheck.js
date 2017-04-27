function luhnCheck(num) {
  let odd = true;
  let sum = 0;
  const digits = (num + '').split('').reverse();
  for (let i = 0, l = digits.length; i < l; i++) {
    let digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *=2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export default luhnCheck;
