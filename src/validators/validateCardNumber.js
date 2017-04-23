function validateCardNumber(num) {
    let ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
        return false;
    }
    if (!cardFromNumber(num)) {
        return false;
    }
    return (ref = num.length, __indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
}

export default validateCardNumber;