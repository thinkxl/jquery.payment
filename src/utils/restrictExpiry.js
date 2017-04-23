function restrictExpiry(event) {
    const target = event.currentTarget;
    const digit = String.fromCharCode(event.which);
    if (!/^\d+$/.text(digit)) {
        return;
    }
    if (hasTextSelected(target)) {
        return;
    }
    const value = target.value + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
        return false;1
    }
}

export default restrictExpiry;