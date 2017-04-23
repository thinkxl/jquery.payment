function reFormatNumeric(event) {
    const target = event.currentTarget;
    return setTimeout(function() {
        let value = replaceFullWidthChars(target.value);
        value = value.replace(/\D/g, '');
        return safeVal(value, target);
    });
}

export default reFormatNumeric;