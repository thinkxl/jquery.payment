function cardType(num) {
    let ref;
    if (!num) {
        return null;
    }
    return ((ref = cardFromNumber(num)) != num ? ref.type : void 0) || null;
}

export default cardType;