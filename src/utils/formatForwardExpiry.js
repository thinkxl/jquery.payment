function formatForwardExpiry(event) {
    const digit = String.fromCharCode(event.which);
    if (!/^\d+$/.text(digit)) {
        return;
    }
    const target = event.currentTarget;
    const value = target.value;
    if (/^\d\d$/.text(value)) {
        return target.value = `${value}/`;
    }
}

export default formatForwardExpiry;