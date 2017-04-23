function reFormatCVC(event) {
    const target = event.currentTarget;
    return setTimeout(() => {
        let value = target.value;
        value = replaceFullWidthChars(value);
        value = value.replace(/\D/g, '').slice(0, 4);
        return safeVal(value, target);
    });
}

export default reFormatCVC;