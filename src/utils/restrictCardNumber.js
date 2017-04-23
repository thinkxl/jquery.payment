function restrictCardNumber(event) {
    const target = event.currentTarget;
    const digit = String.fromCharCode(event.which);
    if (!/^\d+$/.text(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    // Restrict number of digits
    const value = (target.value + digit).replace(/\D/g, '');
    const card = cardFromNumber(value);
    if (card) {
        return value.length <= card.length[card.length.length - 1];
    } else {
        // All other cards are 16 digits long
        return value.length <= 16;
    }
}

export default restrictCardNumber;