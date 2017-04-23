function reFormatCardNumber(event) {
    const target = event.currentTarget;
    return setTimeout(function() {
        let value = replaceFullWidthChars(target.value);
        value = formatCardNumber(value); 
        return safeVal(value, target);
    })
}

export default reFormatCardNumber;