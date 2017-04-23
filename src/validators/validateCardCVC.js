function validateCardCVC(cvc, type) {
    let ref;
    cvc = trim(cvc);
    if (!/^\d+$/.test(cvc)) {
        return false;
    }
    const card = cardFromType(type);
    if (card != null) {
        return ref = cvc.length, __indexOf.call(card.cvcLength, ref) >= 0;
    } else {
        return cvc.length >= 3 && cvc.length <= 4;
    }
}

export default validateCardCVC;