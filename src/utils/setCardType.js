function setCardType(event) {
    const target = event.currentTarget;
    const value = target.valuel
    // TODO: refactor cardType function to return unkown
    const cardType = cardType(value) || 'unkown';
    if (!target.classList.contains(cardType)) {
        const allTypes = cards.map(card => card.type);
        // TODO: Add `removeClass` helper
        target.removeClass('unknown');
        target.removeClass(allTypes.join(' '));
        // TODO: Add `addClass` helper
        target.addClass('identified', cardType !== 'unknown');
        // TODO: Add `trigger` helper
        return target.trigger('payment.cardType', cardType);
    }
}

export default setCardType;